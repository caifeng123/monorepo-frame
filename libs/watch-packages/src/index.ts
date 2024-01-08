import fs from 'node:fs';
import { resolve } from 'node:path';

import chokidar from 'chokidar';

import { execCommand } from './utils.js';
import { WatchScheduler } from './watchScheduler.js';

const packageMap = {} as Record<string, string>;

const getPackages = async (packagePath: string) => {
  const packageJsonPath = resolve(packagePath, 'package.json');
  const { devDependencies = {}, dependencies = {} } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const dependency: Record<string, string> = { ...devDependencies, ...dependencies };
  const promises = Object.entries(dependency).map(async ([key, value]) => {
    if (value.startsWith('workspace:') && !packageMap[key]) {
      const path = await execCommand(`pnpm --filter "${key}" exec pwd`, { quiet: true });
      const modulePath = path.endsWith('\n') ? path.slice(0, -1) : path;
      packageMap[key] = modulePath;
      await getPackages(modulePath);
    }
  });
  await Promise.all(promises);
};

await getPackages(process.cwd());

const watchPaths = Object.values(packageMap);
const watcher = chokidar.watch(watchPaths, {
  persistent: true,
  ignored: /node_modules|\.git|\/es\/|\/lib\/|\/cjs\//,
  ignoreInitial: true
});

const schedular = new WatchScheduler();

watcher
  .on('error', (error) => console.error(`[ERROR] chokidar: ${error}`))
  .on('ready', () => console.log(`[WATCH] start listening [ ${watchPaths.join(', ')} ] ...`))
  .on('add', (file) => schedular.watchFile(file, 'add'))
  .on('change', (file) => schedular.watchFile(file, 'change'))
  .on('unlink', (file) => schedular.watchFile(file, 'unlink'));
