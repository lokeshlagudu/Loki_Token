# Loki Token (LOKI)

An ERC-20 token smart contract built with OpenZeppelin and deployed using Hardhat.

## Overview

Loki Token is a standard ERC-20 token with the following features:

- **Token Name**: Loki Token
- **Symbol**: LOKI
- **Max Supply**: 1,000,000 tokens (1 million)
- **Decimals**: 18 (standard ERC-20)

## Getting Started: Create Your First Cryptocurrency Token

New to crypto tokens? Follow this step-by-step checklist to learn by creating your own token.

### Step 1: Create a Wallet

You need a wallet to deploy and interact with your token.

**Checklist:**
- [ ] Install MetaMask browser extension
- [ ] Create a new wallet
- [ ] Save the seed phrase securely (never share it!)
- [ ] Switch network to a testnet (Sepolia or similar)

### Step 2: Get Free Test ETH

Test networks use free tokens so you can experiment without spending real money.

**Checklist:**
- [ ] Copy your MetaMask wallet address
- [ ] Visit a Sepolia faucet (e.g., [Sepolia Faucet](https://sepoliafaucet.com/))
- [ ] Confirm test ETH appears in MetaMask

### Step 3: Set Up Your IDE

This is where you write and deploy your token (using VS Code in this project).

**Checklist:**
- [ ] Open VS Code or your preferred IDE
- [ ] Create a new file: `LokiToken.sol`
- [ ] Ensure Solidity version is `^0.8.x` (using 0.8.20 in this project)
- [ ] Install necessary dependencies (see Installation section below)


## Features

- ✅ Standard ERC-20 functionality (transfer, approve, transferFrom)
- ✅ Minting capability (owner only)
- ✅ Burning capability (any token holder)
- ✅ Supply cap enforcement (1 million tokens maximum)
- ✅ Ownable access control
- ✅ Built with OpenZeppelin contracts for security

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask or another Web3 wallet (for deployment)

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory:

```env
SEPOLIA_RPC_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_wallet_private_key
```

**⚠️ Never commit your `.env` file to version control!**

## Usage

### Compile Contracts

```bash
npm run compile
```

### Run Tests

```bash
npm test
```

### Deploy

**Local Hardhat Network:**
```bash
npm run deploy
```

**Sepolia Testnet:**
```bash
npm run deploy:sepolia
```

## Smart Contract Functions

### Public Functions

- `transfer(address to, uint256 amount)` - Transfer tokens to another address
- `approve(address spender, uint256 amount)` - Approve an address to spend tokens
- `transferFrom(address from, address to, uint256 amount)` - Transfer tokens on behalf of another address
- `burn(uint256 amount)` - Burn tokens from your balance

### Owner-Only Functions

- `mint(address to, uint256 amount)` - Mint new tokens (respects max supply)
- `burnFrom(address account, uint256 amount)` - Burn tokens from a specific account
- `transferOwnership(address newOwner)` - Transfer contract ownership
- `renounceOwnership()` - Renounce contract ownership

## Contract Details

The contract inherits from:
- `ERC20` - Standard ERC-20 implementation from OpenZeppelin
- `Ownable` - Access control for privileged functions

### Constructor Parameters

- `initialSupply` - The initial number of tokens to mint (in wei, must be ≤ max supply)

## Development

### Project Structure

```
├── contracts/
│   └── LokiToken.sol       # Main token contract
├── scripts/
│   └── deploy.js           # Deployment script
├── test/
│   └── LokiToken.test.js   # Contract tests
├── hardhat.config.js       # Hardhat configuration
└── package.json            # Project dependencies
```

### Testing

The test suite covers:
- Token deployment and initialization
- Minting functionality and supply cap enforcement
- Burning functionality
- Transfer operations
- Access control

## Security

- Uses OpenZeppelin's audited contract libraries
- Enforces maximum supply cap
- Owner-controlled minting
- Standard ERC-20 security practices

## License

This project is licensed under the MIT License.

## Disclaimer

This smart contract is provided as-is. Always audit your contracts before deploying to mainnet and handling real funds.
