import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { start, init } from './commands';

yargs(hideBin(process.argv))
  .scriptName('react-tray-cli')
  .demandCommand()
  .strict()
  .command(
    'init [projectName]',
    'initialize new project',
    (yargs) => {
      return yargs
        .positional('projectName', {
          describe: 'project name',
          type: 'string',
        })
        .demandOption('projectName');
    },
    (argv) => {
      init(argv.projectName);
    }
  )
  .command(
    'start [distPath]',
    'start current project',
    (yargs) => {
      return yargs.positional('distPath', {
        describe: 'path to dist folder',
        default: 'dist/index.js',
        type: 'string',
      });
    },
    (argv) => {
      start(argv.distPath);
    }
  )
  .parse();
