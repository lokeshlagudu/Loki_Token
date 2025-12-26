// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title LokiToken
 * @dev ERC-20 Token contract for Loki Token
 */
contract LokiToken is ERC20, Ownable {
    /// @notice Maximum supply cap
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18; // 1 million tokens

    /**
     * @dev Constructor that initializes the token with initial supply
     * @param initialSupply The initial number of tokens to mint (in wei)
     */
    constructor(uint256 initialSupply) ERC20("Loki Token", "LOKI") Ownable(msg.sender) {
        require(initialSupply <= MAX_SUPPLY, "Initial supply exceeds max supply");
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Mint new tokens (only owner can call)
     * @param to The address to receive the tokens
     * @param amount The number of tokens to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Minting would exceed max supply");
        _mint(to, amount);
    }

    /**
     * @dev Burn tokens from the caller's account
     * @param amount The number of tokens to burn
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    /**
     * @dev Burn tokens from a specific account (only owner can call)
     * @param account The account to burn tokens from
     * @param amount The number of tokens to burn
     */
    function burnFrom(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }
}
