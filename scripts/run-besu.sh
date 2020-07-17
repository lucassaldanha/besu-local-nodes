#!/bin/bash

index=${1:-1}

echo "Starting Besu $index"

LOG4J_CONFIGURATION_FILE=config/besu/log4j.xml besu --config-file config/besu/besu$index.conf