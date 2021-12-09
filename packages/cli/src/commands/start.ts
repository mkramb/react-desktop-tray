import { spawnSync } from 'child_process';
import { resolve, join, delimiter } from 'path';

// Taken from: https://github.com/sindresorhus/npm-run-path
// As the module is only available as ESM which doesn't work with Electron
function getNpmRunPathEnv() {
  const cwd = process.cwd();
  const path = process.env.PATH;

  let currentPath = resolve(cwd);
  let previousPath: string;

  const result = [];

  while (previousPath !== currentPath) {
    result.push(join(currentPath, 'node_modules/.bin'));
    previousPath = currentPath;
    currentPath = resolve(currentPath, '..');
  }

  // ensure the running `node` binary is used.
  result.push(resolve(cwd, process.execPath, '..'));

  return [...result, path].join(delimiter);
}

function start(distPath: string) {
  spawnSync(`electron`, [distPath], {
    env: {
      ...process.env,
      PATH: getNpmRunPathEnv(),
    },
    cwd: process.cwd(),
    encoding: 'utf-8',
    stdio: 'inherit',
    shell: true,
  });
}

export { start };
