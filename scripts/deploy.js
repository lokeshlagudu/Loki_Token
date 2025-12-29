const hre = require("hardhat");

async function main() {
  // Get the signer (connected MetaMask account)
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Connecting to MetaMask...");
  console.log("Deploying with account:", deployer.address);
  
  // Check account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");
  
  // Get network information
  const network = await hre.ethers.provider.getNetwork();
  console.log("Network:", network.name, "(Chain ID:", network.chainId.toString() + ")");
  
  console.log("\nDeploying Loki Token...");

  const initialSupply = hre.ethers.parseEther("1000000"); // 1 million tokens (max supply)
  const LokiToken = await hre.ethers.getContractFactory("LokiToken");
  const token = await LokiToken.deploy(initialSupply);

  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  console.log("Loki Token deployed to:", tokenAddress);

  // Display deployment details
  const owner = await token.owner();
  const totalSupply = await token.totalSupply();
  const name = await token.name();
  const symbol = await token.symbol();

  console.log("\nToken Details:");
  console.log("- Name:", name);
  console.log("- Symbol:", symbol);
  console.log("- Owner:", owner);
  console.log("- Initial Supply:", hre.ethers.formatEther(totalSupply), "LOKI");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
