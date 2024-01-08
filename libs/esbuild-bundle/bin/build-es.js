import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { esbuildBundle } from '@cc/esbuild-bundle';

const path = process.argv[2];
if (!path) {
  console.log('bundle path is not exist! please check the shell command');
  process.exit(1);
}

const esbuildConfPath = resolve(process.cwd(), 'esbuild.bundle.mjs');
if (!existsSync(esbuildConfPath)) {
  console.error(esbuildConfPath, 'not exist! Please check');
  process.exit(1);
}

const { default: esmOption = {} } = await import(esbuildConfPath);
if (typeof esmOption !== 'object') {
  console.error(esbuildConfPath, 'export default not a object! Please check');
  process.exit(1);
}

const entryPoints = Array.isArray(path) ? path : [path];

esbuildBundle({ ...esmOption, entryPoints });
