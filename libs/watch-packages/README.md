# 监听子包

> 希望子包也同时实现热更新，当子包文件被修改时进行重新编译。

## Usage

在dev脚本中执行 `watch-libs` 指令，会同时递归监听依赖的内部库，当文件出现变动（add/change/delete）时重新触发对于依赖的编译。

![image-20240108095525317](https://github.com/caifeng123/pictures/blob/master/image-20240108095525317.png?raw=true)

## demo

- react项目中依赖了`@cc/react-components` 一个在libs下的库
- 启动react项目脚本`rsbuild dev --open & watch-libs` 在启动项目hmr同时对子库进行监听
- 此时修改了`@cc/react-components` 的一个组件，会触发子库的esbuild打包（dev只需esm）更新。
- 对应的react项目监听到node_modules的变更进行重新编译

![image-20240108101132404](https://github.com/caifeng123/pictures/blob/master/image-20240108101132404.png?raw=true)