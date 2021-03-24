const config = require('./config.json');
const Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const EEAClient = require("web3-eea");

const besu1 = new EEAClient(new Web3(config.besu1.jsonrpc), config.network.id);
const besu2 = new EEAClient(new Web3(config.besu2.jsonrpc), config.network.id);
const besu3 = new EEAClient(new Web3(config.besu3.jsonrpc), config.network.id);

var args = process.argv.slice(2);

const contractAddress = args[0];
const readValue = "0x2e64cec1";

module.exports = async () => {
  participant1 = config.besu1.orion.publicKey;
  participant2 = config.besu2.orion.publicKey;
  participant3 = config.besu3.orion.publicKey;

  let options = {
    addresses: [participant1, participant2]
  }
  let privacyGroupIdResponse = await besu1.priv.findPrivacyGroup(options);
  let privacyGroupId = privacyGroupIdResponse[0].privacyGroupId;

  let readValueCall = {
    data: readValue,
    to: contractAddress,
    privacyGroupId: privacyGroupId
  };

  let result1 = await besu1.priv.call(readValueCall);
  printValueDetails('Besu 1', contractAddress, result1);

  let result2 = await besu2.priv.call(readValueCall);
  printValueDetails('Besu 2', contractAddress, result2);

  let result3 = await besu3.priv.call(readValueCall);
  printValueDetails('Besu 3', contractAddress, result3);
};

async function printValueDetails(name, address, value) {
  console.log(`\n--- ${name} Value read from contract ---`);

  console.log(
    `> Contract Address ${address}\n` + 
    `> Value ${value}\n`);
}

if (require.main === module) {
  module.exports();
}