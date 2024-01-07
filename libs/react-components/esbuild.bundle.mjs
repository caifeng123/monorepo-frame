import { esbuildBundle } from '@cc/esbuild-bundle';

const esmOption = {
  jsx: 'automatic',
  platform: 'browser',
  // 若需要将一些依赖打包入库，需要开启bundle同时在package.json中放在devDependence即可
  bundle: true,
  external: ['react', 'react-dom'],
  minify: true
};

const esmBundle = esbuildBundle(esmOption);

const cjsBundle = esbuildBundle({
  jsx: 'automatic',
  outdir: 'cjs',
  format: 'cjs',
  platform: 'browser',
  // 若需要将一些依赖打包入库，需要开启bundle同时在package.json中放在devDependence即可
  bundle: true,
  external: ['react', 'react-dom'],
  minify: true
});

Promise.all([esmBundle, cjsBundle]).then(([esm, cjs]) => {
  console.log(`esmCost: ${esm.time}ms`);
  console.log(`esmCost: ${cjs.time}ms`);
});

// 默认导出esm用作 watchfile
export default esmOption;
