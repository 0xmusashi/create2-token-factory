
const { ethers } = require('ethers');
require('dotenv').config();

const abi = require("../artifacts/contracts/MedusaTokenFactory.sol/MedusaTokenFactory.json");

const provider = new ethers.JsonRpcProvider(process.env.TESTNET_RPC_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

const FACTORY_ADDRESS = '0xfCBE3Eb9b182d18aF308938F5fdf9Fd4EcCb1cfA';
const deployerAddress = signer.address;
const deployerBytes = ethers.getBytes(deployerAddress).slice(0, 20);
const randomString = "medusa"; // This value must change on every MedusaToken deployment
const randomBytes = ethers.toUtf8Bytes(randomString);
const concatenatedBytes = ethers.concat([deployerBytes, randomBytes]);

// Generating the salt by hashing the concatenated bytes
const salt = ethers.keccak256(concatenatedBytes);
const tokenID = 1;  // Example ID for the artwork

async function deployMedusaToken() {
    try {
        const MedusaFactoryContract = new ethers.Contract(FACTORY_ADDRESS, abi.abi, signer);
        // Compute expected address before deployment
        const expectedAddress = await MedusaFactoryContract.computeTokenAddress(salt, tokenID);
        console.log('Expected MedusaToken address:', expectedAddress);

        // Deploying MedusaToken using MedusaFactoryContract
        const txn = await MedusaFactoryContract.deployToken(salt, tokenID);
        await txn.wait()
        const tokenAddress = await MedusaFactoryContract.latestTokenAddress()
        console.log('Deployed MedusaToken address:', tokenAddress);
        if (expectedAddress == tokenAddress) {
            console.log("Expected and deployed address match, CREATE2 functionality verified!");
        } else {
            console.error("Mismatch in expected and deployed addresses!");
        }

    } catch (err) {
        console.error('Error in deployMedusaToken:', err);
    }
}

deployMedusaToken().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});