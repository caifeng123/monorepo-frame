import { esbuildBundle } from '@cc/esbuild-bundle';

const esmBundle = esbuildBundle({
  platform: 'node'
});

const cjsBundle = esbuildBundle({
  outdir: 'cjs',
  format: 'cjs',
  platform: 'node'
});

Promise.all([esmBundle, cjsBundle]).then(([esmCost, cjsCost]) => {
  console.log('esmCost:', esmCost);
  console.log('cjsCost:', cjsCost);
});
