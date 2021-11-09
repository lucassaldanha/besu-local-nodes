#!/bin/bash

echo "Starting EthSigner"

ethsigner \
--chain-id=2018 \
--http-cors-origins=all \
--http-listen-host=0.0.0.0 \
--http-listen-port=9545 \
--downstream-http-port=8545 \
file-based-signer \
--key-file=config/ethsigner/keyFile \
--password-file=config/ethsigner/passwordFile