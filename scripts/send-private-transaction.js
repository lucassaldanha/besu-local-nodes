const config = require('./config.json');
const Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const EEAClient = require("web3-eea");

const besu1 = new EEAClient(new Web3(config.besu1.jsonrpc), config.network.id);
const besu2 = new EEAClient(new Web3(config.besu2.jsonrpc), config.network.id);
const besu3 = new EEAClient(new Web3(config.besu3.jsonrpc), config.network.id);

const deployContractData = "0x608060405234801561001057600080fd5b5060405161018e38038061018e8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055507f85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410816040518082815260200191505060405180910390a15060fd806100916000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806360fe47b11460375780636d4ce63c146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b606860bf565b6040518082815260200191505060405180910390f35b806000819055507f85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410816040518082815260200191505060405180910390a150565b6000805490509056fea265627a7a723158207735a32daa767059dd230ee7718eb7f09ff35ca8ba54249b53ea1c2e12b98f8564736f6c634300051100320000000000000000000000000000000000000000000000000000000000000001";

module.exports = async () => {
  // Build transaction with list of participants (besu1 and besu2)
  let transaction = {
    data: deployContractData,
    privateKey: config.accounts[0].privateKey,
    privateFrom: config.besu1.orion.publicKey,
    privateFor: [
      config.besu1.orion.publicKey,
      config.besu2.orion.publicKey
    ]
  };

  // Send transaction
  let txHash = await besu1.eea.sendRawTransaction(transaction);
  
  // Besu1 is a participant, it should have a receipt for the private transaction
  let rcpt1 = await besu1.priv.getTransactionReceipt(txHash);
  printTxDetails('Besu 1', rcpt1);

  // Besu2 is also a participant, it should have a receipt for the private transaction
  let rcpt2 = await besu2.priv.getTransactionReceipt(txHash);
  printTxDetails('Besu 2', rcpt2);

  // Besu3 isn't a participant, it should NOT have a receipt for the private transaction
  let rcpt3 = await besu3.priv.getTransactionReceipt(txHash);
  printTxDetails('Besu 3', rcpt3);
};

async function printTxDetails(name, tx) {
  console.log(`--- ${name} Receipt ---`);

  if (tx) {
    console.log(
      `> Hash ${tx.commitmentHash}\n` + 
      `> Status ${tx.status}\n`);
  } else {
    console.log(tx + '\n');
  }
}

if (require.main === module) {
  module.exports();
}