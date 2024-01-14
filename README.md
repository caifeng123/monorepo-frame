# 框架介绍

> 个人搭建的企业级 monorepo 框架
>
> 1. 可直接食用，大幅减少自己搭建项目框架的时间。针对node、react前端项目、子包打包等做了模版预设
> 2. 也可用作学习用，各种配置一应俱全详细请看下面小点介绍

- `packages/`：主项目目录
  - `node`：node项目模版
  - `node-vitest`：node项目+vitest测试模版
  - `react`：react项目模版（rsbuild生成）
  - `react-vitest`：react项目（rsbuild生成）+vitest测试模版
- `libs/`：子包目录
  - `esbuild-bundle`：使用esbuild进行快捷编译
    - 不用tsc：tsc太慢
    - 不用swc：目前不需要降级编译js，若需要则需要替换
  - `react-components`: react组件库
    - 不打包react、react-dom，按需打包antd、lodash-es
    - 使用esbuild打包，cjs、esm版本
    - 使用vitest进行单测
  - `watch-packages` : 主项目开发时需要对子包进行热更新
    - 使用chokidar对子包进行文件监听
    - 实现WatchScheduler进行批量文件聚合调度
    - 对外暴露watch-libs方法 会自动递归当前项目依赖的子包进行监听



*tips: 其中配置文件都为cjs结尾，定为commonJS模块区别于esm，项目都使用 `type: module` 默认为esm模块*

## pnpm

> 多包管理工具

-   使用 pnpm 进行 monorepo 管理，作为当今主流趋势，且不用像lerna单独下包
-   设定 `pnpm-workspace.yaml` 工作区进行多包管理

## typescript

> js超集，对项目类型进行规范化约束

- 在更目录中 tsconfig 进行总管全体配置，各个项目中的 `tsconfig` 需要进行 extends 根目录配置，因为对于各个库的打包需求是不同的，因此需要进行配置

-   需要根目录安装 `typescript`

## eslint

> 使用 eslint 进行代码校验统一，与提交前统一代码风格

-   配合上 `*.code-workspace` 设置进行保存自动格式化
    -   理论上 `*.code-workspace` 不应该提交上 git，但为后续可以直接搬，因此本项目提交
        -   关闭 vscode 自带设置的保存编辑 `editor.formatOnSave`
        -   开启 `editor.codeActionsOnSave:{source.fixAll.eslint}` 按照 eslint 规则进行自动格式化
-   使用业内 `airbnb` 的 eslint 配置，可按要求替换为自己厂内/组内配置需求
    -   `eslint` eslint 库
    -   airbnb 基础配置
        -   [`eslint-config-airbnb`](https://www.npmjs.com/package/eslint-config-airbnb) airbnb react 配置
        -   [`eslint-config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base) airbnb 基础配置（不带react配置）
    -   airbnb ts 配置（基于基础配置）
        -   `eslint-config-airbnb-typescript` airbnb ts 配置
        -   `@typescript-eslint/parser @typescript-eslint/eslint-plugin` 解析 ts 语法库
    -   `eslint-plugin-import` 检查 ES6 的 import/export 语法，并防止在项目中发生文件路径和导入名字的错误的 ESLint 插件
-   每个`packages/*` 下的项目可以使用一份eslint配置 会向上合并到根目录下的root配置
    -   其中需要指向当前目录的 `tsconfig.json` 因为各项目import范围不同，会影响到eslint的校验范围
    -   对于不同项目 需要配置对于添加对应配置，详细看`packages/*` 子包情况

## prettier

-   `prettier` 进行代码风格统一化
    -   每个人开发习惯不同，但对于整体项目风格需要统一，因此需要 `prettier` 处理
    -   对于ts、json、yaml都有不同解析器进行处理
    -   需要根目录安装 ：`prettier`
-   ***为什么有了`eslint` 还要 `prettier` ?***
    -   ESLint主要关注的是代码质量和代码错误。它有大量的规则来检测和报告常见的JS错误，例如未使用的变量，未定义的函数，等等。而且，ESLint可以自定义规则，以适应特定项目的要求。ESLint还支持插件，可以扩展其功能。
    -   Prettier主要关注的是代码的格式和风格。它可以自动格式化您的代码，使其格式一致，并消除不必要的或混淆的构造。Prettier没有插件系统，也没有许多配置选项。它只关心如何美化格式化你的代码。

## husky

> 使用 `husky` 对git hook添加特殊执行逻辑

- 在 『prepare』时执行 `husky install` 安装所有husky钩子

- `.husky` 文件夹

  -   pre-commit：提交前使用lint-staged按文件执行 脚本处理

  ```js
  // package.json
  {
    ...
    "lint-staged": {
      "*.{json,yaml}": [
        "prettier --write"
      ],
      "*.{t,j}s?(x)": [
        "eslint --fix"
      ],
      "*.yaml": [
        "prettier --parser=yaml --write"
      ]
    },
  }
  ```
  
  - commit-msg：校验commit信息，

    > 使用 [commitlint](https://commitlint.js.org/#/) 对提交信息进行校验。

    `type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]`

    ```js
    // commitlint.config.js
    module.exports = {
      extends: ['@commitlint/config-conventional']
    }
    ```


## turbo

> Turbo Repo 对多包仓库（monorepo）特别友好，它能提供更快、更精准的构建，这是通过并行执行，精确的任务缓存以及目标优化等特性实现的。

- 按流水线式执行，可以设定前置依赖。
- 并行执行无关联任务
- Turbo 可以缓存任务的输出，以便在输入未改变的情况下重用，减少了不必要的构建提高效率。

- 项目对lint、test、build进行缓存产物使得构建加速



## workflows

> 接入github action工作流

- compile.yml 对所有分支push进行监听
  - 执行build
  - 并发执行test和lint
- deploy.yml 对master进行监听
  - 执行build: react项目
  - 执行 github page 部署
