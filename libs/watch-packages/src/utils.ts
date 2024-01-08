import { exec } from 'node:child_process';

type CommandOptions = {
  quiet?: boolean
};

export async function execCommand(command: string, options:CommandOptions = {}) {
  return new Promise<any>((resolve, reject) => {
    const { quiet } = options;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`[ERROR] exec: ${error}`);
        reject(error);
        return;
      }
      if (stdout && !quiet) console.log(`[STDOUT] ${stdout}`);
      if (stderr && !quiet) console.error(`[STDERR] ${stderr}`);
      try {
        resolve(JSON.parse(stdout));
      } catch (err) {
        resolve(stdout);
      }
    });
  });
}
