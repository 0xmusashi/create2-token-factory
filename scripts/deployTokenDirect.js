async function main() {
    const token = await ethers.deployContract("MedusaToken", [1999]);

    await token.waitForDeployment();

    console.log(`Token contract deployed at ${token.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});