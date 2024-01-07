import { esbuildBundle } from '@cc/esbuild-bundle';

const esmOption = {};

const esmBundle = esbuildBundle(esmOption);

const cjsBundle = esbuildBundle({
  outdir: 'cjs',
  format: 'cjs'
});

Promise.all([esmBundle, cjsBundle]).then(([esm, cjs]) => {
  console.log(`esmCost: ${esm.time}ms`);
  console.log(`esmCost: ${cjs.time}ms`);
});
