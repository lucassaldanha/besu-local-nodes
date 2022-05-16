# Local Besu Network

This project has all configuration that you need to start a network with 3 nodes using privacy and permissioning.

Application versions tested:
- Besu 22.4.0
- Tessera 22.1.1
- EthSigner 22.1.3

Integration libraries versions tested:
- Web3js-eea 0.10.0

## Ethereum Accounts

The network has 3 accounts with pre-loaded ether that you can use to send transanctions.

You can use the private key of these accounts to load them on Metamask.

Account Address | Private Key
------------ | -------------
0xfe3b557e8fb62b89f4916b721be55ceb828dbd73 | 8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63
0x627306090abaB3A6e1400e9345bC60c78a8BEf57 | c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
0xf17f52151EbEF6C7334FAD080c5704D77216b732 | ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f

## Besu Nodes

To start a Besu node, execute the following command:
```
besu --config-file config/besu/besu1.conf
besu --config-file config/besu/besu2.conf
besu --config-file config/besu/besu3.conf
```

Here is the information about the 3 Besu nodes in the network:

**Besu 1**
- Enode URL
  - `enode://fcbe9f83218487b3c0b50878193880e6c25cfd86708c0a0bf0ca91f0ce633746a892fe240afa5b9a880b8bca48e8a22704ef937fdda2d7cc63e4d41ed1b417ae@127.0.0.1:30303`
- JSON-RPC Endpoint
  - `http://localhost:8545`
- WebSocket Endpoint
  - `http://localhost:8546`
- Node Key
  - Associated Account: 0x96A0495677e7227DB792FFeE7978557300c017EF

**Besu 2**
- Enode URL
  - `enode://3548c87b9920ff16aa4bdcf01c85f25117a29ae1574d759bad48cc9463d8e9f7c3c1d1e9fb0d28e73898951f90e02714abb770fd6d22e90371882a45658800e9@127.0.0.1:40404`
- JSON-RPC Endpoint
  - `http://localhost:8555`
- WebSocket Endpoint
  - `http://localhost:8556`
- Node Key
  - Associated Account: 0x866b0df7138dAF807300Ed9204DE733c1eB6d600

**Besu 3**
- Enode URL
  - `enode://261bc642fb9f8aab639a8d5d2dc4192a02288859f7e10f23f2bb7b60d96b1c2d875d866074072f7bf01d0de5bfe4ccdb65a32a72668403b37eb6f3eb6b576ab1@127.0.0.1:50505`
- JSON-RPC Endpoint
  - `http://localhost:8565`
- WebSocket Endpoint
  - `http://localhost:8566`
- Node Key
  - Associated Account: 0xA46F0935DE4176FfeCCDEeCAf3c6E3ca03e31B22

### Useful Properties
Property Name | Description | Default Value
------------ | ------------- | -------------
`miner-enabled` | Turns on mining | `true` for Besu 1, `false` for Besu 2 and 3
`privacy-enabled` | Turns on privacy | `true` for all 3 nodes
`privacy-onchain-groups-enabled` | Enable flexible privacy groups | `false` for all 3 nodes
`permissions-accounts-contract-enabled` | Enable onchain account permissioning | `false` for all 3 nodes
`permissions-nodes-contract-enabled` | Enable onchain node permissioning | `false` for all 3 nodes
`permissions-accounts-config-file-enabled` | Enable local account permissioning | `false` for all 3 nodes
`permissions-nodes-config-file-enabled` | Enable local node permissioning | `false` for all 3 nodes

## Tessera Nodes

To start a Tessera node, execute the following command:
```
tessera -configfile config/tessera/tessera1.conf
tessera -configfile config/tessera/tessera2.conf
tessera -configfile config/tessera/tessera3.conf
```

Replace the config file name for each of the other config files (`tessera1.conf`, `tessera2.conf`, `tessera3.conf`).

To send private transactions, you should use the Tessera node public key to indentify the participants of a transaction (privateFor field).

Here is the information about the 3 Tessera (enclave) nodes in the network


**Tessera 1**
- Public Key
  - `GGilEkXLaQ9yhhtbpBT03Me9iYa7U/mWXxrJhnbl1XY=`

**Tessera 2**
- Public Key
  - `KkOjNLmCI6r+mICrC6l+XuEDjFEzQllaMQMpWLl4y1s=`

**Tessera 3**
- Public Key
  - `qaBVuA+nG7Yt+kru6CGI2VMxOBAK7b1KNmiJuInHtwc=`

## EthSigner

EthSigner can be used to sign transactions on behalf of the user. You don't need to use EthSigner when sending transactions with Metamask or Web3js-eea. However, you do need to use EthSigner if you are planning to send transactions using Postman (calling `eth_sendTransaction` or `eea_sendTransaction`).


To run EthSigner
```
ethsigner --chain-id=2018 --http-listen-port=9545 --downstream-http-port=8545 file-based-signer --key-file=config/ethsigner/keyFile --password-file=config/ethsigner/passwordFile
```

Using this config, EthSigner will start listening on port 9545 and communicating with Besu node 1. You can change the node that EthSigner sends transactions to by changing the `downstream-http-port` property.

## Usage

### Examples

There is a sample script in the `examples` folder. It is using web3js-eea to send a private transaction to the network.

To run the script:
```
node send-private-transaction.js
```

### Logging

If you need more control over logging, you can use the `log4j.xml` file in the `config` folder. To ensure Besu picks up the configuration, you can run:

```
LOG4J_CONFIGURATION_FILE=config/besu/log4j.xml besu --config-file config/besu/besu1.conf
```

### Deleting data

There is a helper script to delete all the data from Besu and Tessera nodes. Just run:
```
./scripts/delete_databases.sh
```
## References

- [Besu GitHub project](https://github.com/hyperledger/besu/)
- [Besu Docs](https://besu.hyperledger.org/)
- [Tessera GitHub project](https://github.com/ConsenSys/Tessera)
- [Tessera Docs](https://docs.tessera.consensys.net/)
- [EthSigner GitHub project](https://github.com/ConsenSys/ethsigner)
- [EthSigner Docs](https://docs.ethsigner.consensys.net/)
- [web3js-eea GitHub project](https://github.com/ConsenSys/web3js-eea)
- [Permissioning Smart Contracts](https://github.com/ConsenSys/permissioning-smart-contracts)

## Disclaimer

I work for ConsenSys and I am directly involved on the development of Besu. However, this is a personal project and you should use it at your own discretion. This isn't a ConsenSys backed project and there should be no expectations of receiving support using it.

I made this project to help people that want to quickly start a network and use Besu's privacy and permissioning features.

## Contributing

If you find a problem or have an idea on how to improve this project, feel free to raise a ticket or open a PR!
