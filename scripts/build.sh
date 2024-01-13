#!/bin/bash

# corepack enable
node -v
pnpm -v
echo "安装..."
pnpm install

echo "编译"
pnpm build:react