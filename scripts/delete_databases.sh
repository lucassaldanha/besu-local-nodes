#!/bin/bash
echo 'Deleting Besu and Tessera databases'

rm -rf workdir/tessera1/tessera1*
rm -rf workdir/tessera2/tessera2*
rm -rf workdir/tessera3/tessera3*

rm -rf workdir/besu1/data
rm -rf workdir/besu2/data
rm -rf workdir/besu3/data
