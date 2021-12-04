#!/usr/bin/env node

set -e

export ELECTRON_IS_DEV=1

yarn clean
yarn build

concurrently --names "core,examples" --prefix name \
  "cd packages/renderer && yarn dev" \
  "cd packages/examples && yarn dev"
