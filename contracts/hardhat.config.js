require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// A private key must be exactly 32 bytes = 64 hex chars (plus optional 0x prefix)
function getAccounts() {
  const raw = process.env.PRIVATE_KEY || "";
  const stripped = raw.startsWith("0x") ? raw.slice(2) : raw;
  if (stripped.length === 64) {
    return [raw.startsWith("0x") ? raw : `0x${raw}`];
  }
  return []; // no valid key — deploy commands will fail, but compile/test still work
}

module.exports = {
  solidity: "0.8.24",
  networks: {
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: getAccounts(),
    },
  },
};
