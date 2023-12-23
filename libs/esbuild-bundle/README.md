# esbuild-bundle

## Overview

使用esbuild能力进行打包

# Usage

- 默认配置【esm、node、treeShaking】

```js
const esbuildDefaultGlob = {
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
}
```

- 引入bundle方法进行覆盖

```jsx
// esbuild.bundle.mjs
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
```

- 打包node
  - 打包单独cjs、设置产出平台等
- 打包browser（react）
  - 设置jsx、产出平台等

