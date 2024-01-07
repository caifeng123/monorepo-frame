import { esbuildBundle } from '@cc/esbuild-bundle';

const esmOption = {};

const esmBundle = esbuildBundle(esmOption);

Promise.all([esmBundle]).then(([esm]) => {
  console.log(`esmCost: ${esm.time}ms`);
});

// 默认导出esm配置用作 watchfile
export default esmOption;
