import inquirer from 'inquirer';

import config, { keys, defaults, COMPOSE_FILENAME } from '../util/config';
import { mkdir, exists } from '../util/fs';
import { warn } from '../util/log';
import { save } from '../actions/files';

const INIT_QUESTIONS = [
  {
    name: 'directory',
    type: 'input',
    message: 'Where would you like to keep your Compose configs?',
    default: defaults.DEFAULT_DIR,
  },
  {
    name: 'active',
    type: 'input',
    message: 'What should we call the active config?',
    default: 'master',
    when: exists(COMPOSE_FILENAME),
  },
];

export default async function init(options) {
  // Don't double init
  if (!options.force && config().exists()) {
    warn('.tugrc.json already exists.');
    return;
  }

  // Collect init config
  const conf = await inquirer.prompt(INIT_QUESTIONS);

  config().set(keys.dir, conf.directory);
  config().set(keys.active, conf.active);

  // Create the directory and save init active
  mkdir(conf.directory);
  save(conf.active);
}
