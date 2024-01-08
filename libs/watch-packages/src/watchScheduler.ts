import { execCommand } from './utils.js';

/** 获取monorepo根路径 */
let rootPath = await execCommand('pnpm -w exec pwd', { quiet: true });
rootPath = rootPath.endsWith('\n') ? rootPath.slice(0, -1) : rootPath;

/**
 * 批量处理文件变化调度器
 */
export class WatchScheduler {
  /** 文件变动列表 */
  fileList: Array<{ packageName: string, filePath: string }>;

  /** 文件变动列表 */
  packageSet: Set<string>;

  /** 当前热更新文件变动数量 */
  count: number;

  /** 延时定时器 */
  timeoutId?: NodeJS.Timeout;

  /** 任务锁, 确保上次批处理结束后执行下次任务 */
  lock: boolean;

  constructor() {
    this.fileList = [];
    this.packageSet = new Set();
    this.count = 0;
    this.timeoutId = undefined;
    this.lock = false;
  }

  /**
   * 监听文件变化
   */
  watchFile(file, type) {
    console.log(`\n[WATCH] [${type.toUpperCase()}] ${file}`);

    const matchSrc = file.match(/(libs\/[^/]*)\/src\/(.*)/);
    const matchConfig = file.match(
      /(libs\/[^/]*)\/((esbuild.bundle.mjs)|(tsconfig.json)|(tsconfig.build.json)|(package.json))/
    );
    if (!matchSrc && !matchConfig) return;

    if (matchSrc) {
      const [, packageName, filePath] = matchSrc;
      switch (type) {
        case 'unlink':
          WatchScheduler.cleanFile({ packageName, filePath });
          break;
        case 'add':
        case 'change':
          this.#add(packageName, filePath);
          break;
        default:
          break;
      }
    } else {
      const [, packageName] = matchConfig;
      this.#add(packageName);
    }
  }

  /**
   * 新增/更新文件
   */
  #add(packageName: string, filePath?: string) {
    this.count += 1;
    // 对于配置变动, 整包重新编译
    if (!filePath) {
      this.packageSet.add(packageName);
    } else {
      this.fileList.push({ packageName, filePath });
    }

    // 保证执行任务列表清空后再进行循环检测
    if (!this.lock) {
      this.#taskCheck();
    }
  }

  /**
   * 清除无用文件
   */
  private static cleanFile({ packageName, filePath }) {
    return execCommand(
      `cd "${rootPath}" && rm -f ${packageName}/es/${filePath.replace(
        /\.tsx?/,
        '.*'
      )}`
    );
  }

  /**
   * 更新任务检查
   * - 防抖处理, 1s内无文件变化时处理当批次任务
   * - 【reBuildPackages】当前任务数量超过20认定为 切分支/pull操作, 对变化包进行整体重编译
   * - 【reBuildFiles】少于时直接更新文件
   */
  #taskCheck() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      // 开始任务上锁
      this.lock = true;

      // 所有变化的子包名集合
      const changePackages = [
        ...new Set([
          ...this.fileList.map(({ packageName }) => packageName),
          ...this.packageSet
        ])
      ];
      // 大量文件操作时, 不进行单个处理
      if (this.fileList.length > 20) {
        this.#reBuildPackages(changePackages);
        return;
      }
      this.#reBuildFiles(changePackages);
    }, 1000);
  }

  /**
   * 大批文件(> 20个)变化，可能是切分支/pull操作, 对变化包进行整体重编译
   */
  #reBuildPackages(changePackages) {
    const tasks = [
      // 整包打包任务
      ...changePackages.map((packageName) => WatchScheduler.execBuild({ packageName })),
      // 类型更新任务
      ...changePackages.map((packageName) => WatchScheduler.execType({ packageName }))
    ];

    Promise.allSettled(tasks).then(() => this.#afterTask());
    this.#clean();
  }

  /**
   * 小批文件(<= 20个)变化，单独更新
   */
  #reBuildFiles(changePackages) {
    const fileTasks = this.fileList.reduce((all, { packageName, filePath }) => {
      if (!this.packageSet.has(packageName)) {
        all.push(WatchScheduler.execBuild({ packageName, filePath }));
      }
      return all;
    }, [] as Promise<string>[]);

    const packageTasks = [...this.packageSet]
      .map((packageName) => WatchScheduler.execBuild({ packageName }));

    const tasks = [
      // 文件打包任务
      ...fileTasks,
      // 整包打包任务
      ...packageTasks,
      // 类型更新任务
      ...changePackages.map((packageName) => WatchScheduler.execType({ packageName }))
    ];

    Promise.allSettled(tasks).then(() => this.#afterTask());
    this.#clean();
  }

  /**
   * 结束当前批处理
   */
  #clean() {
    this.packageSet.clear();
    this.fileList = [];
    this.count = 0;
  }

  /**
   * 任务结束解锁
   * 若加锁处理任务期间 有新任务堆积则开启新的批处理
   */
  #afterTask() {
    this.lock = false;
    if (this.fileList.length || this.packageSet.size) {
      this.#taskCheck();
    }
  }

  /**
   * 执行打包任务
   */
  private static execBuild({ packageName, filePath = '' }) {
    return execCommand(
      `cd "${rootPath}" && pnpm --filter="./${packageName}" exec build-es src/${
        filePath || '*'
      }`
    );
  }

  /**
   * 执行类型生成
   */
  private static execType({ packageName }) {
    return execCommand(
      `cd "${rootPath}" && pnpm --filter="./${packageName}" run build:types | echo '\`${packageName} build: types\` done.'`
    );
  }
}
