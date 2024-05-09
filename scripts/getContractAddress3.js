
const { ethers } = require('ethers');
require('dotenv').config();

const abi = require("../artifacts/contracts/MedusaTokenFactory.sol/MedusaTokenFactory.json");

const provider = new ethers.JsonRpcProvider(process.env.TESTNET_RPC_URL)

const FACTORY_ADDRESS = '0xfCBE3Eb9b182d18aF308938F5fdf9Fd4EcCb1cfA';
const deployerAddress = process.env.DEPLOYER_ADDRESS;
const deployerBytes = ethers.getBytes(deployerAddress).slice(0, 20);
const randomString = "0xmusashi"; // This value must change on every MedusaToken deployment
const randomBytes = ethers.toUtf8Bytes(randomString);
const concatenatedBytes = ethers.concat([deployerBytes, randomBytes]);

// Generating the salt by hashing the concatenated bytes
const salt = ethers.keccak256(concatenatedBytes);

const PATTERN = '42069';
const ATTEMPS = 150000;

async function getContractAddress3() {
    const MedusaFactoryContract = new ethers.Contract(FACTORY_ADDRESS, abi.abi, provider);

    for (let i = 100000; i < ATTEMPS; i++) {
        const address = await MedusaFactoryContract.computeTokenAddress(salt, i);
        console.log(`id #${i} - address: ${address}`);
        if (address.slice(-5) == PATTERN || address.slice(2, 7) == PATTERN) {
            console.log('Found tokenID = ', i);
            break;
        }
    }

}

getContractAddress3();