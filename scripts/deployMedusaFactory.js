async function main() {
    const factory = await ethers.deployContract("MedusaTokenFactory");

    await factory.waitForDeployment();

    console.log(`Factory contract deployed at ${factory.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

/**
npx hardhat run scripts/deployMedusaFactory.js --network baseSepolia
 */