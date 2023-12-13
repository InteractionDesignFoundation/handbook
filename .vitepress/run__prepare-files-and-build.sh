#!/bin/bash

# ⚠️ For using on staging server only!
#
# Run this script from /home/forge/docs.information-architecture.org
# Script will generate HTML under "public" subdir, so webserver should be properly setup

set -e

TIME=$(date +"%Y-%m-%d %H:%m")
COPY_DOCS_FROM_PATH=/home/forge/develop.information-architecture.org/current
COPY_VITEPRESS_CONFIG_FROM_PATH=${COPY_DOCS_FROM_PATH}/docs/.vitepress
DOCS_SITE_PATH=/home/forge/docs.information-architecture.org

echo "${TIME} ======================================"
echo "${TIME} Removing previous directories"
rm -rf $DOCS_SITE_PATH/src
rm -rf $DOCS_SITE_PATH/public
echo "${TIME} DONE! ================================"

echo "${TIME} ======================================"
echo "${TIME} Creating new folders"
mkdir $DOCS_SITE_PATH/src
mkdir $DOCS_SITE_PATH/src/.vitepress
mkdir $DOCS_SITE_PATH/public
echo "${TIME} DONE! ================================"

echo "${TIME} ======================================"
echo "${TIME} Copy config from develop site to local"
cp -f $COPY_VITEPRESS_CONFIG_FROM_PATH/config.js $DOCS_SITE_PATH/src/.vitepress/config.js
echo "${TIME} DONE! ================================"

echo "${TIME} ======================================"
echo "${TIME} Copying folders"
# Copy our .md file. It’s better to not copy all of them, because /vendor and /node_modules contain a lot of them
cp -R $COPY_DOCS_FROM_PATH/docs/           $DOCS_SITE_PATH/src/docs
cp -R $COPY_DOCS_FROM_PATH/README.md       $DOCS_SITE_PATH/src/README.md
cp -R $COPY_DOCS_FROM_PATH/CONTRIBUTING.md $DOCS_SITE_PATH/src/CONTRIBUTING.md
echo "${TIME} DONE! ================================"

echo "${TIME} ======================================"
echo "${TIME} Creating update message to index.html"
echo '<html><h1>Updating docs, it should take < 1min…</h1></html>' > $DOCS_SITE_PATH/public/index.html
echo "${TIME} DONE! ================================"

echo "${TIME} ======================================"
echo "${TIME} Running YARN build"
echo "${TIME} User: $USER"
echo "${TIME} Node: $(which node) -- version: $(node -v)"
echo "${TIME} Yarn: $(which yarn) -- version: $(yarn -v)"

cd $DOCS_SITE_PATH
echo "${TIME} BUILDING...==========================="
yarn run docs:build
echo "${TIME} DONE! ================================"

echo "${TIME} ======================================"
echo ""
