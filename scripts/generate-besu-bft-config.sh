#!/bin/bash

echo "Delete qbftConfig directory"

rm -rf config/besu/qbftConfig

echo "Executing generate-blockchain-config"

besu operator generate-blockchain-config --config-file=config/besu/qbftConfigFile.json --to=config/besu/qbftConfig