# 框架介绍

个人搭建的企业级 monorepo 框架

-   使用 pnpm 进行 monorepo 管理
    -   设定 `pnpm-workspace.yaml` 工作区
-   ts 编写，tsconfig 进行总管全体配置
    -   各个项目中的 `tsconfig` 需要进行 extends 根目录配置，因为对于各个库的打包需求是不同的，因此需要进行配置
    -   需要根目录安装 `typescript`
-   使用 eslint 进行代码校验统一，配合上 `*.code-workspace` 设置进行保存自动格式化
    -   理论上 `*.code-workspace` 不应该提交上 git，但为后续可以直接搬，因此本项目提交
        -   关闭 vscode 自带设置的保存编辑 `editor.formatOnSave`
        -   开启 `editor.codeActionsOnSave:{source.fixAll.eslint}` 按照 eslint 规则进行自动格式化
    -   使用业内 `airbnb` 的 eslint 配置，可按要求替换为自己厂内/组内配置需求
    -   需要配置指向 根目录配置的 `tsconfig.json` 用于解析项目级 ts 规则
    -   需要根目录安装 ：
        -   `eslint` eslint 库
        -   `@typescript-eslint/parser @typescript-eslint/eslint-plugin` 解析 ts 语法库
        -   `eslint-config-airbnb-typescript` airbnb 配置
        -   `eslint-plugin-import` 检查 ES6 的 import/export 语法，并防止在项目中发生文件路径和导入名字的错误的 ESLint 插件
-   使用`simple-git-hooks + lint-staged` 进行 `pre-commit` 处理
    -   在 『postinstall』时执行 `pre-commit` 钩子注入
    -   `lint-staged` 设定处理对暂存区的什么类型文件按 `eslint --fix` 进行修复
    -   为什么不用 `husky` 而用 `simple-git-hooks` ?
        -   功能类似都是写入 git hook
        -   对于 `husky` 需要生成 `.husky` 文件，内部存储各种钩子脚本，但这个文件不会被提交
            -   对于 husky5 后的版本需要手动调用脚本添加 hook
            -   例如：`npx husky add .husky/pre-commit "npm test"`
        -   对于 `simple-git-hooks` 可以将钩子配置在 `package.json` 中
            -   由于接手项目的人的技术高低不定，因此将所有配置设定在 package.json 中自动化处理最优。
            -   在项目 install 安装依赖后自动注入钩子，提升开发体验
