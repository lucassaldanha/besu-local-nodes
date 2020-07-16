# besu-local-nodes
Config for a 3 node Besu network (with privacy and permissioning)

Versions tested:
Besu 1.5.0
Orion 1.6.0
EthSigner 0.6.0

Besu node keys and ports

Accounts

0xfe3b557e8fb62b89f4916b721be55ceb828dbd73
8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63

0x627306090abaB3A6e1400e9345bC60c78a8BEf57
c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3

0xf17f52151EbEF6C7334FAD080c5704D77216b732
ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f

Besu 1

EnodeURL: enode://fcbe9f83218487b3c0b50878193880e6c25cfd86708c0a0bf0ca91f0ce633746a892fe240afa5b9a880b8bca48e8a22704ef937fdda2d7cc63e4d41ed1b417ae@127.0.0.1:30303

JSON-RPC: http://localhost:8545
WebSocket: http://localhost:8546

Besu 2

EnodeURL: enode://3548c87b9920ff16aa4bdcf01c85f25117a29ae1574d759bad48cc9463d8e9f7c3c1d1e9fb0d28e73898951f90e02714abb770fd6d22e90371882a45658800e9@127.0.0.1:40404

JSON-RPC: http://localhost:8555
WebSocket: http://localhost:8556

Besu 3

EnodeURL: enode://7da6d67d29a120a19f1d46566a03b3a59b2c55ab83fc4672ea233b4af8ce9545a27ffb968718c56052f389b84b95ae0535b1b66484652e8369169a2d903e32ba@127.0.0.1:50505

JSON-RPC: http://localhost:8565
WebSocket: http://localhost:8566

Orion 1

pubkey: GGilEkXLaQ9yhhtbpBT03Me9iYa7U/mWXxrJhnbl1XY=

Orion 2

pubkey: KkOjNLmCI6r+mICrC6l+XuEDjFEzQllaMQMpWLl4y1s=

Orion 3

pubkey: qaBVuA+nG7Yt+kru6CGI2VMxOBAK7b1KNmiJuInHtwc=

To run Orion node:

```
orion config/orion1.conf
```

To run EthSigner
```
ethsigner --chain-id=2018 --http-listen-port=9545 --downstream-http-port=8545 file-based-signer --key-file=config/ethsigner/keyFile --password-file=config/ethsigner/passwordFile
```

To run besu
```
besu --config-file config/besu1.conf
```

TODO

To enable privacy
- wha properties to change

To enable permissioning
- wha properties to change