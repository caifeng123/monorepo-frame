import { build, BuildOptions } from 'esbuild';
import glob from 'fast-glob';

const esbuildDefaultGlob = [
  'src/**/*.{ts,tsx,js}',
  '!**/mock/**/*.ts',
  '!**/*.{spec,test,mock}.ts',
  '!**/*.d.ts'
];

const entryPoints = await glob(esbuildDefaultGlob);

const DEFAULT_CONFIG: BuildOptions = {
  entryPoints,
  platform: 'node',
  outdir: 'es',
  format: 'esm',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'js',
    '.jsx': 'jsx'
  },
  resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
  treeShaking: true
};

export { BuildOptions } from 'esbuild';

export const esbuildBundle = async (options: BuildOptions = {}) => {
  console.time('esbuild bundle');
  build({
    ...DEFAULT_CONFIG,
    ...options
  });
  console.timeEnd('esbuild bundle');
};
