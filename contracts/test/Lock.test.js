const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Lock", function () {
  const ONE_YEAR = 365 * 24 * 60 * 60;
  const LOCKED_AMOUNT = ethers.parseEther("1");

  async function deployLockFixture() {
    const unlockTime = (await time.latest()) + ONE_YEAR;
    const [owner, other] = await ethers.getSigners();
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: LOCKED_AMOUNT });
    return { lock, unlockTime, owner, other };
  }

  describe("Deployment", function () {
    it("sets the correct unlock time", async function () {
      const { lock, unlockTime } = await loadFixture(deployLockFixture);
      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("sets the correct owner", async function () {
      const { lock, owner } = await loadFixture(deployLockFixture);
      expect(await lock.owner()).to.equal(owner.address);
    });

    it("receives and stores the ETH", async function () {
      const { lock } = await loadFixture(deployLockFixture);
      expect(await ethers.provider.getBalance(await lock.getAddress())).to.equal(
        LOCKED_AMOUNT
      );
    });

    it("reverts when unlock time is not in the future", async function () {
      const pastTime = (await time.latest()) - 1;
      const Lock = await ethers.getContractFactory("Lock");
      await expect(
        Lock.deploy(pastTime, { value: LOCKED_AMOUNT })
      ).to.be.revertedWith("Unlock time should be in the future");
    });
  });

  describe("Withdrawals", function () {
    it("reverts when called too early", async function () {
      const { lock } = await loadFixture(deployLockFixture);
      await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
    });

    it("reverts when called by a non-owner", async function () {
      const { lock, unlockTime, other } = await loadFixture(deployLockFixture);
      await time.increaseTo(unlockTime);
      await expect(lock.connect(other).withdraw()).to.be.revertedWith(
        "You aren't the owner"
      );
    });

    it("transfers the ETH to the owner after unlock time", async function () {
      const { lock, unlockTime, owner } = await loadFixture(deployLockFixture);
      await time.increaseTo(unlockTime);

      const before = await ethers.provider.getBalance(owner.address);
      const tx = await lock.withdraw();
      const receipt = await tx.wait();
      const gasCost = receipt.gasUsed * receipt.gasPrice;
      const after = await ethers.provider.getBalance(owner.address);

      expect(after).to.equal(before + LOCKED_AMOUNT - gasCost);
    });

    it("emits a Withdrawal event", async function () {
      const { lock, unlockTime } = await loadFixture(deployLockFixture);
      await time.increaseTo(unlockTime);
      await expect(lock.withdraw()).to.emit(lock, "Withdrawal");
    });
  });
});
