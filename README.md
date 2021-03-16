# Local Besu Network

This project has all configuration that you need to start a network with 3 nodes using privacy and permissioning.

Application versions tested:
- Besu 21.1.2
- Orion 20.10.1
- EthSigner 21.3.0

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
```

Replace the config file name for each of the other config files (`besu1.conf`, `besu2.conf`, `besu3.conf`).

Here is the information about the 3 Besu nodes in the network:

**Besu 1**
- Enode URL
  - `enode://fcbe9f83218487b3c0b50878193880e6c25cfd86708c0a0bf0ca91f0ce633746a892fe240afa5b9a880b8bca48e8a22704ef937fdda2d7cc63e4d41ed1b417ae@127.0.0.1:30303`
- JSON-RPC Endpoint
  - `http://localhost:8545`
- WebSocket Endpoint
  - `http://localhost:8546`

**Besu 2**
- Enode URL
  - `enode://3548c87b9920ff16aa4bdcf01c85f25117a29ae1574d759bad48cc9463d8e9f7c3c1d1e9fb0d28e73898951f90e02714abb770fd6d22e90371882a45658800e9@127.0.0.1:40404`
- JSON-RPC Endpoint
  - `http://localhost:8555`
- WebSocket Endpoint
  - `http://localhost:8556`

**Besu 3**
- Enode URL
  - `enode://7da6d67d29a120a19f1d46566a03b3a59b2c55ab83fc4672ea233b4af8ce9545a27ffb968718c56052f389b84b95ae0535b1b66484652e8369169a2d903e32ba@127.0.0.1:50505`
- JSON-RPC Endpoint
  - `http://localhost:8565`
- WebSocket Endpoint
  - `http://localhost:8566`

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

## Orion Nodes

To start an Orion node, execute the following command:
```
orion config/orion/orion1.conf
```

Replace the config file name for each of the other config files (`orion1.conf`, `orion2.conf`, `orion3.conf`).

To send private transactions, you should use the Orion node public key to indentify the participants of a transaction (privateFor field).

Here is the information about the 3 Orion nodes in the network


**Orion 1**
- Public Key
  - `GGilEkXLaQ9yhhtbpBT03Me9iYa7U/mWXxrJhnbl1XY=`

**Orion 2**
- Public Key
  - `KkOjNLmCI6r+mICrC6l+XuEDjFEzQllaMQMpWLl4y1s=`

**Orion 3**
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

There is a helper script to delete all the data from Besu and Orion nodes. Just run:
```
./scripts/delete_databases.sh
```
## References

- [Besu GitHub project](https://github.com/hyperledger/besu/)
- [Besu 1.5.0 Docs](https://besu.hyperledger.org/en/1.5.0/)
- [Orion GitHub project](https://github.com/PegaSysEng/orion)
- [Orion 1.6.0 Docs](https://docs.orion.pegasys.tech/en/1.6.0/)
- [EthSigner GitHub project](https://github.com/PegaSysEng/ethsigner)
- [EthSigner 0.6.0 Docs](https://docs.ethsigner.pegasys.tech/en/0.6.0/)
- [web3js-eea GitHub project](https://github.com/PegaSysEng/web3js-eea)
- [Permissioning Smart Contracts](https://github.com/PegaSysEng/permissioning-smart-contracts)

## Disclaimer

I work for ConsenSys and I am directly involved on the development of Besu. However, this is a personal project and you should use it at your own discretion. This isn't a ConsenSys backed project and there should be no expectations of receiving support using it.

I made this project to help people that want to quickly start a network and use Besu's privacy and permissioning features.

## Contributing

If you find a problem or have an idea on how to improve this project, feel free to raise a ticket or open a PR!
