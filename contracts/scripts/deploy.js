const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const usdcAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
  const ZeusInsurance = await hre.ethers.getContractFactory("ZeusInsurance");
  const contract = await ZeusInsurance.deploy(usdcAddress);
  await contract.waitForDeployment();
  console.log("ZeusInsurance deployed to:", await contract.getAddress());
}

main().catch(console.error);
