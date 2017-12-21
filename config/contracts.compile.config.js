const path = require('path')

module.exports = {
  contracts: [
    'SafeMath',
    'ERC20',
    'StandardToken',
    'HoHoHoe'
  ],
  inputPath: path.join(__dirname, '../contracts/'),
  outputFilename: 'contracts-autogen',
  outputPath: path.join(__dirname, '../dist/'),
}
