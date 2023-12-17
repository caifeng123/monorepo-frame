import { esbuildBundle } from '@cc/esbuild-bundle';

const esmBundle = esbuildBundle({
  jsx: 'automatic'
});

const cjsBundle = esbuildBundle({
  jsx: 'automatic',
  outdir: 'cjs',
  format: 'cjs',
  platform: 'browser'
});

Promise.all([esmBundle, cjsBundle]);
