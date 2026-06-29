const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("MyToken", function () {
  const TOKEN_NAME = "MyToken";
  const TOKEN_SYMBOL = "MTK";
  const INITIAL_SUPPLY = ethers.parseUnits("100000", 18);
  const MAX_SUPPLY = ethers.parseUnits("1000000", 18);

  async function deployTokenFixture() {
    const [owner, alice, bob] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(TOKEN_NAME, TOKEN_SYMBOL, INITIAL_SUPPLY);
    return { token, owner, alice, bob };
  }

  describe("Deployment", function () {
    it("sets the correct name and symbol", async function () {
      const { token } = await loadFixture(deployTokenFixture);
      expect(await token.name()).to.equal(TOKEN_NAME);
      expect(await token.symbol()).to.equal(TOKEN_SYMBOL);
    });

    it("mints the initial supply to the deployer", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);
      expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("sets totalSupply equal to initial supply", async function () {
      const { token } = await loadFixture(deployTokenFixture);
      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
    });

    it("sets the correct max supply constant", async function () {
      const { token } = await loadFixture(deployTokenFixture);
      expect(await token.MAX_SUPPLY()).to.equal(MAX_SUPPLY);
    });

    it("reverts when initial supply exceeds max supply", async function () {
      const MyToken = await ethers.getContractFactory("MyToken");
      await expect(
        MyToken.deploy(TOKEN_NAME, TOKEN_SYMBOL, MAX_SUPPLY + 1n)
      ).to.be.revertedWith("MyToken: initial supply exceeds max supply");
    });
  });

  describe("Minting", function () {
    it("allows owner to mint tokens", async function () {
      const { token, owner, alice } = await loadFixture(deployTokenFixture);
      const amount = ethers.parseUnits("500", 18);
      await token.connect(owner).mint(alice.address, amount);
      expect(await token.balanceOf(alice.address)).to.equal(amount);
    });

    it("emits TokensMinted event on mint", async function () {
      const { token, owner, alice } = await loadFixture(deployTokenFixture);
      const amount = ethers.parseUnits("500", 18);
      await expect(token.connect(owner).mint(alice.address, amount))
        .to.emit(token, "TokensMinted")
        .withArgs(alice.address, amount);
    });

    it("reverts when non-owner tries to mint", async function () {
      const { token, alice } = await loadFixture(deployTokenFixture);
      await expect(
        token.connect(alice).mint(alice.address, ethers.parseUnits("1", 18))
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });

    it("reverts when minting would exceed max supply", async function () {
      const { token, owner, alice } = await loadFixture(deployTokenFixture);
      const remaining = MAX_SUPPLY - INITIAL_SUPPLY;
      await expect(
        token.connect(owner).mint(alice.address, remaining + 1n)
      ).to.be.revertedWith("MyToken: exceeds max supply");
    });
  });

  describe("Transfers", function () {
    it("transfers tokens between accounts", async function () {
      const { token, owner, alice } = await loadFixture(deployTokenFixture);
      const amount = ethers.parseUnits("1000", 18);
      await token.connect(owner).transfer(alice.address, amount);
      expect(await token.balanceOf(alice.address)).to.equal(amount);
    });

    it("reverts transfer when balance is insufficient", async function () {
      const { token, alice, bob } = await loadFixture(deployTokenFixture);
      await expect(
        token.connect(alice).transfer(bob.address, ethers.parseUnits("1", 18))
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });
  });

  describe("Burning", function () {
    it("allows token holders to burn their tokens", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);
      const burnAmount = ethers.parseUnits("1000", 18);
      await token.connect(owner).burn(burnAmount);
      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY - burnAmount);
    });
  });
});
