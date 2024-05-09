const { ethers } = require('ethers');
require('dotenv').config();

const abi = require("../artifacts/contracts/MedusaTokenFactory.sol/MedusaTokenFactory.json");

const provider = new ethers.JsonRpcProvider(process.env.TESTNET_RPC_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

const FACTORY_ADDRESS = '0x3093a46B80E6289DC40231B7EBC002aa84D59EA0';
const deployerAddress = signer.address;
const deployerBytes = ethers.getBytes(deployerAddress).slice(0, 20);
const randomString = "medusa"; // This value must change on every MedusaToken deployment
const randomBytes = ethers.toUtf8Bytes(randomString);
const concatenatedBytes = ethers.concat([deployerBytes, randomBytes]);

const MedusaFactoryContract = new ethers.Contract(FACTORY_ADDRESS, abi.abi, signer);

// Generating the salt by hashing the concatenated bytes
const salt = ethers.keccak256(concatenatedBytes);

const PATTERN = '42069';
const ATTEMPS = 100000;

async function getContractAddress() {
    const address = await MedusaFactoryContract.computeTokenAddress(salt, i);
    return address;
}

module.exports = async (workerData) => {
    for (let i = 1; i <= ATTEMPS; i++) {
        // while (!workerData.foundAddress) {
        try {
            const address = await MedusaFactoryContract.computeTokenAddress(salt, i);
            if (address.slice(-5) == PATTERN || address.slice(2, 7) == PATTERN) {
                console.log()
                parentPort.postMessage('found');
                break;
            }
            i += 1;
        } catch (error) {
            console.error(`Worker ${threadId} error: ${error.message}`);
        }
    }
};