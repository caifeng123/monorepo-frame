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

Promise.all([esmBundle, cjsBundle]).then(([esmCost, cjsCost]) => {
  console.log('esmCost:', esmCost);
  console.log('cjsCost:', cjsCost);
});
