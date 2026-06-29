# Smart Contracts

Hardhat-based Ethereum smart contract project using OpenZeppelin and ethers v6.

## Contracts

| Contract | Description |
|---|---|
| `MyToken` | ERC20 token with minting (owner-only) and burning. 1M max supply. |
| `Lock` | Time-locked ETH vault — funds released only after an unlock timestamp. |

## Quick Start

```bash
# From the contracts/ directory:

# Compile contracts
pnpm compile

# Run tests
pnpm test

# Run tests with gas report
REPORT_GAS=true pnpm test

# Check test coverage
pnpm coverage

# Start a local Hardhat node
pnpm node

# Deploy to local node (run `pnpm node` first in another terminal)
pnpm deploy:local
```

## Deploying to Sepolia Testnet

1. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
2. Fund your wallet with Sepolia ETH from a faucet (e.g. https://sepoliafaucet.com).
3. Deploy:
   ```bash
   pnpm deploy:sepolia
   ```

## Verifying on Etherscan

After deploying, verify your contract:

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARG1> <CONSTRUCTOR_ARG2>
```

## Project Structure

```
contracts/
├── contracts/        # Solidity source files
│   ├── MyToken.sol   # ERC20 token
│   └── Lock.sol      # Time-locked vault
├── scripts/
│   └── deploy.js     # Deployment script
├── test/
│   ├── MyToken.test.js
│   └── Lock.test.js
├── hardhat.config.js
└── .env.example
```
