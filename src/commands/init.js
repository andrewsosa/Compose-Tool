import inquirer from 'inquirer';

import config from '../util/config';
import { mkdir, exists } from '../util/fs';
import { warn } from '../util/log';

const INIT_QUESTIONS = [
  {
    name: 'directory',
    type: 'input',
    message: 'Where would you like to keep your Compose configs?',
    default: '.docker',
  },
  {
    name: 'active',
    type: 'input',
    message: 'What should we call the active config?',
    default: 'master',
    when: exists('docker-compose.yml'),
  },
];

export default async function init(options) {
  // Don't double init
  if (exists('.tugrc.json')) {
    warn('.tugrc.json already exists.');
    return;
  }


  // Collect init config
  const conf = await inquirer.prompt(INIT_QUESTIONS);

  // Do the things
  mkdir(conf.directory);

  config().set('directory', conf.directory);
  config().set('active', conf.active);

  // Save the file
  // Object.keys(conf).forEach((key) => {
  //   console.log(key, conf[key]);
  //   config().set(key, conf[key]);
  // });
}
