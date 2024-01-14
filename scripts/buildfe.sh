#!/bin/bash

node -v
pnpm -v
echo "install..."
pnpm install

echo "building..."
pnpm build:react