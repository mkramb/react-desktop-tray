import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { build, generate } from './commands';

yargs(hideBin(process.argv))
  .scriptName('react-tray-cli')
  .demandCommand()
  .strict()
  .command(
    'generate [name]',
    'generate new project',
    (yargs) => {
      return yargs
        .positional('name', {
          describe: 'project name',
          type: 'string',
        })
        .demandOption('name');
    },
    (argv) => {
      generate(argv.name);
    }
  )
  .command('build', 'build for distribution', () => {
    build();
  })
  .parse();
