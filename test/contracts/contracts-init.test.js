/*jslint node: true */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict'

import Web3 from 'web3'
import contracts from '../../scripts/contracts-autogen.json'
import {
  deployEternalStorage,
  deployMetaToken,
  deployJaakClasses,
  deployJaakLicensing,
  contractOwnership,
} from '../../scripts/contract-setup-utils.js'

const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545/')

const web3 = new Web3(web3Provider)

const contractObj = JSON.parse(JSON.stringify(contracts))

const initialSupply = 1000 // In Ethers

let EternalStorage, MetaToken, JaakClasses, JaakLicensing, contractOwner

test(
  'Should deploy the contracts',
  async () => {
    // Get the deployment address
    const accounts = await web3.eth.getAccounts()
    contractOwner = accounts[0]

    // deploy contracts
    EternalStorage = await deployEternalStorage(contractOwner)
    expect(EternalStorage.options.address).toBeDefined()

    MetaToken = await deployMetaToken(contractOwner, initialSupply)
    expect(MetaToken.options.address).toBeDefined()

    JaakClasses = await deployJaakClasses(
      contractOwner,
      EternalStorage.options.address
    )
    expect(JaakClasses.options.address).toBeDefined()

    JaakLicensing = await deployJaakLicensing(
      contractOwner,
      JaakClasses.options.address,
      MetaToken.options.address
    )

    expect(JaakLicensing.options.address).toBeDefined()
  },
  15000
)

test(
  'Should change the ownership of the contracts',
  async () => {
    const ownership = await contractOwnership(
      contractOwner,
      EternalStorage,
      MetaToken,
      JaakClasses,
      JaakLicensing
    )

    const stgOwner = await EternalStorage.methods.owner().call()
    expect(stgOwner).toEqual(JaakClasses.options.address)

    const jaakClassOwner = await JaakClasses.methods.owner().call()
    expect(jaakClassOwner).toEqual(JaakLicensing.options.address)

    const metaOwner = await MetaToken.methods.owner().call()
    expect(metaOwner).toEqual(JaakLicensing.options.address)
  },
  15000
)
