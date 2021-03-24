const config = require('./config.json');
const Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const EEAClient = require("web3-eea");

const besu1 = new EEAClient(new Web3(config.besu1.jsonrpc), config.network.id);
const besu2 = new EEAClient(new Web3(config.besu2.jsonrpc), config.network.id);
const besu3 = new EEAClient(new Web3(config.besu3.jsonrpc), config.network.id);

const deployContractData = "0x608060405234801561001057600080fd5b5060c78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632e64cec11460375780636057361d146053575b600080fd5b603d607e565b6040518082815260200191505060405180910390f35b607c60048036036020811015606757600080fd5b81019080803590602001909291905050506087565b005b60008054905090565b806000819055505056fea2646970667358221220c9881e39a8354c748f8a6a5ac025e69ecd01234d361f842269e058dbde9e36db64736f6c63430007040033";
const updateContractValue = "0x6057361d0000000000000000000000000000000000000000000000000000000000000005"

module.exports = async () => {
  participant1 = config.besu1.orion.publicKey;
  participant2 = config.besu2.orion.publicKey;
  participant3 = config.besu3.orion.publicKey;

  console.log('Deploying Storage smart contract\n');

  /*
    Prepare transaction deploying Storage contract (private between node1 and node2)
  */
  let transaction = {
    data: deployContractData,
    privateKey: config.accounts[0].privateKey,
    privateFrom: participant1,
    privateFor: [
      participant1,
      participant2
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

  console.log('Storage Smart Contract Address: ' + rcpt1.contractAddress + '\n');
  let contractAddress = rcpt1.contractAddress;

  console.log('Updating value stored in Storage smart contract\n')

  /*
    Prepare transaction updating Storage contract (private between node1 and node2)
  */
  let updateContractValueTx = {
    data: updateContractValue,
    to: contractAddress,
    privateKey: config.accounts[0].privateKey,
    privateFrom: participant2,
    privateFor: [
      participant1,
      participant2
    ]
  };

  let txHash2 = await besu2.eea.sendRawTransaction(updateContractValueTx);
  let rcpt4 = await besu2.priv.getTransactionReceipt(txHash2);
  printTxDetails('Besu 2', rcpt4);
};

async function printTxDetails(name, tx) {
  console.log(`\n--- ${name} Receipt ---`);

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