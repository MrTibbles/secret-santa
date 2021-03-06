/*jslint node: true */
'use strict'

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import contracts from './dist/contracts-autogen.json'
import Web3 from 'web3'

const contractObj = JSON.parse(JSON.stringify(contracts))

let initialSupply = 5000000
const gasLimit = 4712388

const { GETH_ENDPOINT } = process.env
const targetDeploymentEnv = GETH_ENDPOINT || 'http://localhost:8545/'

const web3Provider = new Web3.providers.HttpProvider(targetDeploymentEnv)

const web3 = new Web3(web3Provider)

export const deployHoHoHoe = contractOwner => {

  console.info(
    chalk.green(`🚀  Deploying Eternal Storage to: ${targetDeploymentEnv} 🌙`)
  )

  const hoHoHoeContract = new web3.eth.Contract(
    contractObj.HoHoHoe.abi,
    {
      data: `0x${contractObj.HoHoHoe.bytecode}`,
    }
  )

  return hoHoHoeContract
    .deploy({ arguments: [
      'Ho Ho Hoe',
      'HOE',
      18,
      initialSupply
    ]})
    .send({ from: contractOwner, gasLimit: gasLimit })
}

export const contractOwnership = async (
  contractOwner,
  EternalStorage,
) => {
  console.info(chalk.green('👨‍⚖️  Changing ownership of deployed contracts'))

  try {
    // Change ownership to owner
    const strgOwnTx = await EternalStorage.methods
      .transferOwnership(JaakClasses.options.address)
      .send({ from: contractOwner, gas: 200000 })

  } catch (err) {
    console.error(err)
  }
}

export const exportInterfaceFiles = async HoHoHoe => {
  console.info(chalk.green('Creating JS interface files'))

  try {
    let contractInterface = `
      /* This file is automatically generated every time you deploy the contracts */\n
      var Web3 = require('web3');
      var GETH_ENDPOINT = process.env.GETH_ENDPOINT;
      var targetDeploymentEnv = GETH_ENDPOINT || 'http://localhost:8545/';
      var web3Provider = new Web3.providers.HttpProvider(targetDeploymentEnv)
      var web3 = new Web3(web3Provider)
      \n
      exports.HoHoHoe = new web3.eth.Contract(${JSON.stringify(
        contractObj.HoHoHoe.abi
      )}, '${HoHoHoe.options.address}', { data: '0x${contractObj.HoHoHoe.bytecode}' })
      \n
    `

    const write = await fs.writeFile(
      path.join(__dirname, `./dist/contract-interfaces.js`),
      contractInterface,
      err => {
        if (err) console.info(chalk.red(err));

        return console.info(
          chalk.green(
            `🌜  Contracts deployed and contract accessor files created 🌛`
          )
        )
      }
    )
  } catch (err) {
    console.error(err)
  }
}

export const setupContractEnv = async () => {
  // Get the deployment address
  const accounts = await web3.eth.getAccounts()
  const contractOwner = accounts[0]

  // deploy contracts
  const HoHoHoe = await deployHoHoHoe(contractOwner)
  console.info(HoHoHoe)
  console.info(chalk.green('Contracts deployed and ready for action.'))

  const interfaces = await exportInterfaceFiles(HoHoHoe)
  console.info(chalk.green('Contract accessors created.'))
}


setupContractEnv()