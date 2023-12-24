# 前端组件库

## 特点

- 按需打包antd、lodash-es库
- 不打包`react` / `react-dom`

## Esbuild

| Name             | description            | npm              | esbuild            |
| ---------------- | ---------------------- | ---------------- | ------------------ |
| peerDependencies | 依赖方环境应该安装的包 | react、react-dom | 不需要打包external |

```js
import * as esbuild from '@cc/esbuild-bundle';
const esmBundle = esbuild.esbuildBundle({
  jsx: 'automatic',
  platform: 'browser',
  // 若需要将一些依赖打包入库，需要开启bundle同时在package.json中放在devDependence即可
  bundle: true,
  external: ['react', 'react-dom'],
  minify: true
});

const cjsBundle = esbuild.esbuildBundle({
  jsx: 'automatic',
  outdir: 'cjs',
  format: 'cjs',
  platform: 'browser',
  // 若需要将一些依赖打包入库，需要开启bundle同时在package.json中放在devDependence即可
  bundle: true,
  external: ['react', 'react-dom'],
  minify: true
});

Promise.all([esmBundle, cjsBundle]);
```

