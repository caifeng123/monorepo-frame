import { build, BuildOptions } from 'esbuild';
import glob from 'fast-glob';

const esbuildDefaultGlob = [
  'src/**/*.{ts,tsx,js}',
  '!**/mock/**/*.{ts,tsx}',
  '!**/*.{spec,test,mock}.{ts,tsx}',
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

export type { BuildOptions } from 'esbuild';
export * from 'esbuild';

export const esbuildBundle = async (options: BuildOptions = {}) => {
  const startTime = process.hrtime.bigint();
  const result = await build({
    ...DEFAULT_CONFIG,
    ...options
  });
  const time = Number(process.hrtime.bigint() - startTime) / 1e6;
  return { result, time };
};
