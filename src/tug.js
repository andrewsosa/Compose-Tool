#!/usr/bin/env node

import app from 'commander';

import active from './commands/active';
import checkout from './commands/checkout';
import init from './commands/init';
import list from './commands/list';
import save from './commands/save';

app.version('0.1.0')
  .description('Docker Compose configuration management tool');

app.command('init')
  .description('Initialize Tug')
  .option('-f, --force', 'Force reinitialization')
  .action(init);

app.command('active')
  .description('Print the active Compose configuration')
  .option('-u, --unset', 'Unset the active Compose configuration')
  .action(active);

app.command('checkout <name>')
  .description('Switch to a different Compose configuration')
  .option('-b, --branch', 'Start a new config based on the active config')
  .option('-f, --force', 'Force overwrite of current docker-compose.yml')
  .option('-w, --write-back', 'Write active configuration back to config storage')
  .action(checkout);

app.command('list', { isDefault: true })
  .alias('ls')
  .description('List available Compose configurations')
  .action(list);

app.command('save -f <name>')
  .description('Save the current configuration as <name>')
  .option('-f, --force', 'Force overwrite if name already exists.')
  .action(save);

app.on('command:*', () => {
    app.outputHelp();
  });

app.parse(process.argv);
