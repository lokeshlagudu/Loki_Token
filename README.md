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

### Step 4: Create a Minimal ERC-20 Token

Define your token's basic properties—name, symbol, and total supply (see [LokiToken.sol](contracts/LokiToken.sol#L19) for the constructor initialization).

**Checklist:**
- [ ] Write the token contract inheriting from ERC20 and Ownable
- [ ] Define the token name, symbol, and initial supply in the constructor
- [ ] Set a maximum supply cap if desired

### Step 5: Connect to MetaMask

Connect your development environment to MetaMask to deploy your token.

**Checklist:**
- [ ] Create a `.env` file in your project root (use `.env.example` as a template)
- [ ] Add your MetaMask private key to `.env` (export from MetaMask settings)
- [ ] Add your RPC URL (e.g., Sepolia testnet URL from Infura or Alchemy. I used Infura)
- [ ] Never share or commit your `.env` file!

**Note:** Another issue is that sometimes MetaMask removes '0x' at the beginning of the private key, so make sure to include it if it's not there.

### Step 6: Deploy Your Token to the Blockchain

Run the deployment script to create your token on the Sepolia testnet.

**Checklist:**
- [ ] Ensure you have test ETH in your MetaMask wallet (from Step 2)
- [ ] Run the deployment command: `npx hardhat run scripts/deploy.js --network sepolia`
- [ ] Wait for the transaction to be confirmed on the blockchain
- [ ] Save the contract address from the deployment output
- [ ] View your token on Etherscan using the contract address

### Step 7: Import Your Token to MetaMask

Add your newly created token to MetaMask so you can see your balance.

**Checklist:**
- [ ] Open MetaMask and go to the Tokens tab
- [ ] Click "Import Token" at the bottom
- [ ] Paste your contract address (from Step 6)
- [ ] Confirm the token symbol (LOKI) and decimals (18) auto-populate
- [ ] Click "Add Token"
- [ ] You should now see 1,000,000 LOKI tokens in your wallet


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

## Disclaimer

This smart contract is provided as-is. Always audit your contracts before deploying to mainnet and handling real funds.
