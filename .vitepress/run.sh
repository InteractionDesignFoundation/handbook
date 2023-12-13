#!/bin/bash

# ⚠️ For using on staging server only!
#
# Copies required files from develop site and build/generate docs from them

set -e

FRESH_BUILD_SCRIPT_DIR=/home/forge/develop.information-architecture.org/current/docs/.vitepress

cp -f $FRESH_BUILD_SCRIPT_DIR/run__prepare-files-and-build.sh /home/forge/docs.information-architecture.org/run__prepare-files-and-build.sh

cd /home/forge/docs.information-architecture.org/
yarn install
source ./run__prepare-files-and-build.sh

#2>&1 | tee -a /home/forge/develop.information-architecture.org/current/storage/logs/docs.cron.log
