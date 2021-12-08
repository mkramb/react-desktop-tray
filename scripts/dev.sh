#!/usr/bin/env node

set -e

export ELECTRON_IS_DEV=1

yarn clean
yarn build

concurrently --names "core,playground" --prefix name \
  "cd packages/renderer && yarn dev" \
  "cd packages/playground && yarn dev"
