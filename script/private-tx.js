const Web3 = require("web3");
const EEAClient = require("web3-eea");
const web3 = new EEAClient(new Web3("http://127.0.0.1:8545"), 2018);
const Tx = require("ethereumjs-tx");

const orionPublicKey = 'GGilEkXLaQ9yhhtbpBT03Me9iYa7U/mWXxrJhnbl1XY=';
const sender = '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73';
const privateKey = '8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63';

const deployContractData = "0x608060405234801561001057600080fd5b5060405161018e38038061018e8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055507f85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410816040518082815260200191505060405180910390a15060fd806100916000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806360fe47b11460375780636d4ce63c146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b606860bf565b6040518082815260200191505060405180910390f35b806000819055507f85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410816040518082815260200191505060405180910390a150565b6000805490509056fea265627a7a723158207735a32daa767059dd230ee7718eb7f09ff35ca8ba54249b53ea1c2e12b98f8564736f6c634300051100320000000000000000000000000000000000000000000000000000000000000001";
const setValueData = "0x60fe47b10000000000000000000000000000000000000000000000000000000000000003";
const getValue = "0x6d4ce63c"

// options used to create a privacy group with only one member
const privacyOptions = {
  privateFrom: orionPublicKey,
  privateFor: [orionPublicKey],
  privateKey: privateKey
};

// get nonce of account in the privacy group
async function getPrivateNonce(account) {
  return await web3.priv.getTransactionCount({...privacyOptions, from: account});
}

// get public nonce of account
async function getPublicNonce(account) {
  return await web3.eth.getTransactionCount(account, "pending");
}

// distribute payload to participants
async function distributePayload(payload, nonce) {
  return await web3.priv.distributeRawTransaction({...privacyOptions, data: payload, nonce: nonce});
}

// create and sign PMT
async function sendPMT(enclaveKey, nonce) {
    let rawTx = {
      nonce: web3.utils.numberToHex(nonce), // PMT nonce
      from: sender,
      to: "0x000000000000000000000000000000000000007e", // privacy precompile address
      data: enclaveKey,
      gasLimit: "0x5a88"
    };
      
    const tx = new Tx(rawTx);
    tx.sign(Buffer.from(privateKey, "hex"));

    const hexTx = `0x${tx.serialize().toString("hex")}`;
    
    return new Promise((resolve, reject) => {
      web3.eth.sendSignedTransaction(hexTx)
        .once('receipt', (hash) => {
          resolve(hash)
        })
        .on('error', (error) => { 
          reject(error);
        })
    });
  };

  async function printTxDetails(pmt) {
    const privTx = await web3.priv.getTransactionReceipt(pmt.transactionHash, orionPublicKey);
    console.log(
      `--- Private TX ${privTx.transactionHash} ---\n` + 
      `  > Status ${privTx.status}\n` + 
      `  > Block #${pmt.blockNumber}\n` + 
      `  > PMT Index #${pmt.transactionIndex}\n` + 
      `  > PMT Hash ${pmt.transactionHash}\n`);
  }

  module.exports = async () => {
    // find current public and private nonces
    const privateNonce = await getPrivateNonce(sender);
    const publicNonce = await getPublicNonce(sender);

    let PMTs = [];
    for(i = 0; i < 5; i++) {
      const enclaveKey = await distributePayload(deployContractData, privateNonce + i);
      const pmt = sendPMT(enclaveKey, publicNonce + i);
      PMTs.push(pmt);
    }

    Promise.all(PMTs)
      .then((receipts) => {
        receipts.forEach(printTxDetails);
      });
  };
  
  if (require.main === module) {
    module.exports();
  }