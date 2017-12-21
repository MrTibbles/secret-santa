const path = require('path');
const Web3 = require('web3');
const contract = require(path.join(__dirname, '../dist/contract-interfaces.js'));

const { GETH_ENDPOINT } = process;
const targetDeploymentEnv = GETH_ENDPOINT || 'http://localhost:8545/';

const web3Provider = new Web3.providers.HttpProvider(targetDeploymentEnv);

const web3 = new Web3(web3Provider);

const hoHoHoe = contract.HoHoHoe;


