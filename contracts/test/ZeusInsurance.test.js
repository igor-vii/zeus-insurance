const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("ZeusInsurance", function () {
  // 1 000 000 USDC with 6 decimals (standard USDC)
  const USDC_DECIMALS = 6;
  const toUSDC = (n) => ethers.parseUnits(String(n), USDC_DECIMALS);

  const AMOUNT = toUSDC(1000);          // $1,000 insured
  const TIMEOUT = 60 * 60 * 24;        // 1 day per retry
  const MAX_RETRIES = 1;
  // premium = 7% base for 1 retry → 700 bps
  const PREMIUM_1 = (AMOUNT * 700n) / 10000n;
  // premium for 3 retries → 700 + 2*200 = 1100 bps
  const PREMIUM_3 = (AMOUNT * 1100n) / 10000n;

  async function deployFixture() {
    const [owner, buyer, seller, other] = await ethers.getSigners();

    // Deploy a minimal mock ERC20 (MockUSDC)
    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    const usdc = await MockUSDC.deploy();

    // Mint USDC to buyer and owner (for reserve deposits)
    await usdc.mint(buyer.address, toUSDC(100_000));
    await usdc.mint(owner.address, toUSDC(100_000));

    // Deploy ZeusInsurance
    const Zeus = await ethers.getContractFactory("ZeusInsurance");
    const zeus = await Zeus.deploy(await usdc.getAddress());

    // Pre-approve for convenience
    await usdc.connect(buyer).approve(await zeus.getAddress(), ethers.MaxUint256);
    await usdc.connect(owner).approve(await zeus.getAddress(), ethers.MaxUint256);

    return { zeus, usdc, owner, buyer, seller, other };
  }

  // ── buyInsurance ────────────────────────────────────────────────────────────

  describe("buyInsurance", function () {
    it("creates a policy and transfers the correct premium", async function () {
      const { zeus, usdc, buyer, seller } = await loadFixture(deployFixture);
      const balBefore = await usdc.balanceOf(buyer.address);

      await zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, TIMEOUT, MAX_RETRIES);

      const balAfter = await usdc.balanceOf(buyer.address);
      expect(balBefore - balAfter).to.equal(PREMIUM_1);
      expect(await zeus.reserveBalance()).to.equal(PREMIUM_1);
    });

    it("stores correct policy fields", async function () {
      const { zeus, buyer, seller } = await loadFixture(deployFixture);
      const tx = await zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, TIMEOUT, MAX_RETRIES);
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt.blockNumber);

      const p = await zeus.getPolicy(0);
      expect(p.buyer).to.equal(buyer.address);
      expect(p.seller).to.equal(seller.address);
      expect(p.amount).to.equal(AMOUNT);
      expect(p.premium).to.equal(PREMIUM_1);
      expect(p.maxRetries).to.equal(MAX_RETRIES);
      expect(p.retryDeadline).to.equal(BigInt(block.timestamp) + BigInt(TIMEOUT) * BigInt(MAX_RETRIES));
      expect(p.isActive).to.be.true;
      expect(p.isPaidOut).to.be.false;
      expect(p.isExpired).to.be.false;
    });

    it("emits PolicyCreated event", async function () {
      const { zeus, buyer, seller } = await loadFixture(deployFixture);
      await expect(
        zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, TIMEOUT, MAX_RETRIES)
      ).to.emit(zeus, "PolicyCreated").withArgs(
        0,
        buyer.address,
        seller.address,
        AMOUNT,
        PREMIUM_1,
        // retryDeadline checked separately — just verify event fires
        (v) => v > 0n
      );
    });

    it("increments nextPolicyId", async function () {
      const { zeus, buyer, seller } = await loadFixture(deployFixture);
      await zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, TIMEOUT, MAX_RETRIES);
      await zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, TIMEOUT, MAX_RETRIES);
      expect(await zeus.nextPolicyId()).to.equal(2);
    });

    it("calculates higher premium for more retries", async function () {
      const { zeus, usdc, buyer, seller } = await loadFixture(deployFixture);
      const before = await usdc.balanceOf(buyer.address);
      await zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, TIMEOUT, 3);
      const after = await usdc.balanceOf(buyer.address);
      expect(before - after).to.equal(PREMIUM_3);
    });

    it("reverts with zero amount", async function () {
      const { zeus, buyer, seller } = await loadFixture(deployFixture);
      await expect(
        zeus.connect(buyer).buyInsurance(seller.address, 0, TIMEOUT, MAX_RETRIES)
      ).to.be.revertedWith("Amount must be > 0");
    });

    it("reverts with zero address seller", async function () {
      const { zeus, buyer } = await loadFixture(deployFixture);
      await expect(
        zeus.connect(buyer).buyInsurance(ethers.ZeroAddress, AMOUNT, TIMEOUT, MAX_RETRIES)
      ).to.be.revertedWith("Invalid seller");
    });

    it("reverts with 0 retries", async function () {
      const { zeus, buyer, seller } = await loadFixture(deployFixture);
      await expect(
        zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, TIMEOUT, 0)
      ).to.be.revertedWith("Invalid retries");
    });

    it("reverts with >10 retries", async function () {
      const { zeus, buyer, seller } = await loadFixture(deployFixture);
      await expect(
        zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, TIMEOUT, 11)
      ).to.be.revertedWith("Invalid retries");
    });

    it("reverts with zero timeoutSeconds", async function () {
      const { zeus, buyer, seller } = await loadFixture(deployFixture);
      await expect(
        zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, 0, MAX_RETRIES)
      ).to.be.revertedWith("Timeout must be > 0");
    });
  });

  // ── claimPayout ─────────────────────────────────────────────────────────────

  describe("claimPayout", function () {
    async function buyAndFundFixture() {
      const ctx = await loadFixture(deployFixture);
      const { zeus, buyer, seller, owner } = ctx;

      // Buy a policy
      await zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, TIMEOUT, MAX_RETRIES);

      // Fund the reserve so it can cover the payout (insured amount > premium)
      const needed = AMOUNT - PREMIUM_1;
      await zeus.connect(owner).depositReserve(needed);

      return { ...ctx, policyId: 0 };
    }

    it("pays out insured amount after deadline passes", async function () {
      const { zeus, usdc, buyer, policyId } = await loadFixture(buyAndFundFixture);
      const p = await zeus.getPolicy(policyId);
      await time.increaseTo(p.retryDeadline);

      const before = await usdc.balanceOf(buyer.address);
      await zeus.connect(buyer).claimPayout(policyId);
      const after = await usdc.balanceOf(buyer.address);

      expect(after - before).to.equal(AMOUNT);
    });

    it("marks policy as paid out and inactive", async function () {
      const { zeus, buyer, policyId } = await loadFixture(buyAndFundFixture);
      const p = await zeus.getPolicy(policyId);
      await time.increaseTo(p.retryDeadline);
      await zeus.connect(buyer).claimPayout(policyId);

      const updated = await zeus.getPolicy(policyId);
      expect(updated.isPaidOut).to.be.true;
      expect(updated.isActive).to.be.false;
    });

    it("emits PayoutExecuted event", async function () {
      const { zeus, buyer, policyId } = await loadFixture(buyAndFundFixture);
      const p = await zeus.getPolicy(policyId);
      await time.increaseTo(p.retryDeadline);
      await expect(zeus.connect(buyer).claimPayout(policyId))
        .to.emit(zeus, "PayoutExecuted")
        .withArgs(policyId, AMOUNT);
    });

    it("reduces reserveBalance by the insured amount", async function () {
      const { zeus, buyer, policyId } = await loadFixture(buyAndFundFixture);
      const p = await zeus.getPolicy(policyId);
      const reserveBefore = await zeus.reserveBalance();
      await time.increaseTo(p.retryDeadline);
      await zeus.connect(buyer).claimPayout(policyId);
      expect(await zeus.reserveBalance()).to.equal(reserveBefore - AMOUNT);
    });

    it("reverts before deadline", async function () {
      const { zeus, buyer, policyId } = await loadFixture(buyAndFundFixture);
      await expect(
        zeus.connect(buyer).claimPayout(policyId)
      ).to.be.revertedWith("Timeout not yet reached");
    });

    it("reverts when called by non-buyer", async function () {
      const { zeus, other, policyId } = await loadFixture(buyAndFundFixture);
      const p = await zeus.getPolicy(policyId);
      await time.increaseTo(p.retryDeadline);
      await expect(
        zeus.connect(other).claimPayout(policyId)
      ).to.be.revertedWith("Only buyer can claim");
    });

    it("reverts on double claim", async function () {
      const { zeus, buyer, policyId } = await loadFixture(buyAndFundFixture);
      const p = await zeus.getPolicy(policyId);
      await time.increaseTo(p.retryDeadline);
      await zeus.connect(buyer).claimPayout(policyId);
      // isActive is set false on first payout, so the second call hits that guard first
      await expect(
        zeus.connect(buyer).claimPayout(policyId)
      ).to.be.revertedWith("Policy not active");
    });

    it("reverts when reserve is insufficient", async function () {
      const { zeus, usdc, buyer, seller } = await loadFixture(deployFixture);
      // Buy policy — premium goes into reserve but amount > premium
      await zeus.connect(buyer).buyInsurance(seller.address, AMOUNT, TIMEOUT, MAX_RETRIES);
      const p = await zeus.getPolicy(0);
      await time.increaseTo(p.retryDeadline);
      // Do NOT top up reserve — reserve only holds the premium, not the full insured amount
      await expect(
        zeus.connect(buyer).claimPayout(0)
      ).to.be.revertedWith("Insufficient reserve");
    });
  });

  // ── depositReserve / withdrawReserve ────────────────────────────────────────

  describe("reserve management", function () {
    it("owner can deposit into reserve", async function () {
      const { zeus, owner } = await loadFixture(deployFixture);
      await zeus.connect(owner).depositReserve(toUSDC(500));
      expect(await zeus.reserveBalance()).to.equal(toUSDC(500));
      expect(await zeus.getReserveBalance()).to.equal(toUSDC(500));
    });

    it("owner can withdraw from reserve", async function () {
      const { zeus, usdc, owner } = await loadFixture(deployFixture);
      await zeus.connect(owner).depositReserve(toUSDC(500));
      const before = await usdc.balanceOf(owner.address);
      await zeus.connect(owner).withdrawReserve(toUSDC(200));
      const after = await usdc.balanceOf(owner.address);
      expect(after - before).to.equal(toUSDC(200));
      expect(await zeus.reserveBalance()).to.equal(toUSDC(300));
    });

    it("reverts deposit from non-owner", async function () {
      const { zeus, buyer } = await loadFixture(deployFixture);
      await expect(
        zeus.connect(buyer).depositReserve(toUSDC(500))
      ).to.be.revertedWithCustomError(zeus, "OwnableUnauthorizedAccount");
    });

    it("reverts withdraw from non-owner", async function () {
      const { zeus, buyer } = await loadFixture(deployFixture);
      await expect(
        zeus.connect(buyer).withdrawReserve(toUSDC(1))
      ).to.be.revertedWithCustomError(zeus, "OwnableUnauthorizedAccount");
    });

    it("reverts withdrawal exceeding reserve", async function () {
      const { zeus, owner } = await loadFixture(deployFixture);
      await zeus.connect(owner).depositReserve(toUSDC(100));
      await expect(
        zeus.connect(owner).withdrawReserve(toUSDC(101))
      ).to.be.revertedWith("Insufficient reserve");
    });
  });
});
