import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { start, build, generate } from './commands';

yargs(hideBin(process.argv))
  .scriptName('react-tray-cli')
  .demandCommand()
  .strict()
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
  .command(
    'generate [projectName]',
    'generate new project',
    (yargs) => {
      return yargs
        .positional('projectName', {
          describe: 'project name',
          type: 'string',
        })
        .demandOption('projectName');
    },
    (argv) => {
      generate(argv.projectName);
    }
  )
  .command('build', 'build for distribution', () => {
    build();
  })
  .parse();
