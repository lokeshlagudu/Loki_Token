const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LokiToken", function () {
  let lokiToken;
  let owner;
  let addr1;
  let addr2;
  const initialSupply = ethers.parseEther("100000000"); // 100 million tokens

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const LokiToken = await ethers.getContractFactory("LokiToken");
    lokiToken = await LokiToken.deploy(initialSupply);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await lokiToken.owner()).to.equal(owner.address);
    });

    it("Should assign the initial supply to the owner", async function () {
      const ownerBalance = await lokiToken.balanceOf(owner.address);
      expect(ownerBalance).to.equal(initialSupply);
    });

    it("Should have correct name and symbol", async function () {
      expect(await lokiToken.name()).to.equal("Loki Token");
      expect(await lokiToken.symbol()).to.equal("LOKI");
    });

    it("Should have 18 decimals", async function () {
      expect(await lokiToken.decimals()).to.equal(18);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("50");
      await lokiToken.transfer(addr1.address, transferAmount);

      const addr1Balance = await lokiToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const transferAmount = ethers.parseEther("50");
      const addr1Contract = lokiToken.connect(addr1);

      await expect(
        addr1Contract.transfer(addr2.address, transferAmount)
      ).to.be.revertedWithCustomError(lokiToken, "ERC20InsufficientBalance");
    });

    it("Should update balances after transfers", async function () {
      const transferAmount = ethers.parseEther("50");

      await lokiToken.transfer(addr1.address, transferAmount);
      await lokiToken.transfer(addr2.address, transferAmount);

      const finalOwnerBalance = await lokiToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialSupply - (transferAmount * 2n));

      expect(await lokiToken.balanceOf(addr1.address)).to.equal(transferAmount);
      expect(await lokiToken.balanceOf(addr2.address)).to.equal(transferAmount);
    });
  });

  describe("Approvals and TransferFrom", function () {
    it("Should approve tokens for transfer", async function () {
      const approvalAmount = ethers.parseEther("100");
      await lokiToken.approve(addr1.address, approvalAmount);

      expect(await lokiToken.allowance(owner.address, addr1.address)).to.equal(approvalAmount);
    });

    it("Should transfer approved tokens from another account", async function () {
      const approvalAmount = ethers.parseEther("100");
      const transferAmount = ethers.parseEther("50");

      await lokiToken.approve(addr1.address, approvalAmount);
      const addr1Contract = lokiToken.connect(addr1);

      await addr1Contract.transferFrom(owner.address, addr2.address, transferAmount);

      expect(await lokiToken.balanceOf(addr2.address)).to.equal(transferAmount);
      expect(await lokiToken.allowance(owner.address, addr1.address)).to.equal(
        approvalAmount - transferAmount
      );
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000000");
      await lokiToken.mint(addr1.address, mintAmount);

      expect(await lokiToken.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Should not allow non-owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000000");
      const addr1Contract = lokiToken.connect(addr1);

      await expect(
        addr1Contract.mint(addr1.address, mintAmount)
      ).to.be.revertedWithCustomError(lokiToken, "OwnableUnauthorizedAccount");
    });

    it("Should not exceed max supply", async function () {
      const maxSupply = await lokiToken.MAX_SUPPLY();
      const currentSupply = await lokiToken.totalSupply();
      const excessAmount = maxSupply - currentSupply + ethers.parseEther("1");

      await expect(lokiToken.mint(addr1.address, excessAmount)).to.be.revertedWith(
        "Minting would exceed max supply"
      );
    });
  });

  describe("Burning", function () {
    it("Should allow anyone to burn their own tokens", async function () {
      const burnAmount = ethers.parseEther("100");
      const initialBalance = await lokiToken.balanceOf(owner.address);

      await lokiToken.burn(burnAmount);

      expect(await lokiToken.balanceOf(owner.address)).to.equal(initialBalance - burnAmount);
      expect(await lokiToken.totalSupply()).to.equal(initialSupply - burnAmount);
    });

    it("Should allow owner to burn tokens from any account", async function () {
      const transferAmount = ethers.parseEther("500");
      const burnAmount = ethers.parseEther("100");

      await lokiToken.transfer(addr1.address, transferAmount);
      await lokiToken.burnFrom(addr1.address, burnAmount);

      expect(await lokiToken.balanceOf(addr1.address)).to.equal(transferAmount - burnAmount);
    });

    it("Should not allow non-owner to burn other accounts' tokens", async function () {
      const transferAmount = ethers.parseEther("500");
      await lokiToken.transfer(addr1.address, transferAmount);

      const addr1Contract = lokiToken.connect(addr1);
      await expect(
        addr1Contract.burnFrom(owner.address, ethers.parseEther("100"))
      ).to.be.revertedWithCustomError(lokiToken, "OwnableUnauthorizedAccount");
    });
  });

  describe("Total Supply", function () {
    it("Should return correct total supply after operations", async function () {
      const mintAmount = ethers.parseEther("50000000");
      const burnAmount = ethers.parseEther("10000000");

      await lokiToken.mint(addr1.address, mintAmount);
      const supplyAfterMint = await lokiToken.totalSupply();
      expect(supplyAfterMint).to.equal(initialSupply + mintAmount);

      await lokiToken.burn(burnAmount);
      const supplyAfterBurn = await lokiToken.totalSupply();
      expect(supplyAfterBurn).to.equal(initialSupply + mintAmount - burnAmount);
    });
  });
});
