const hre = require("hardhat");

async function main() {
  console.log("Deploying Loki Token...");

  const initialSupply = hre.ethers.parseEther("100000000"); // 100 million tokens
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
