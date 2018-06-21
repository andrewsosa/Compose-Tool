import path from 'path';
import fs from 'fs';

import isValid from 'is-valid-path';
import chalk from 'chalk';

import { getActiveConf, setActiveConf } from './active';
import { DEFAULT_DIR } from './util/_globals';
import preventOverwrite from './util/overwrite';


// tug checkout [-f] <name>
export default function (name, options) {
  const cwd = process.cwd();
  const dir = options.dir || DEFAULT_DIR;

  // Make sure we have our file ending
  if (!name.endsWith('.yml')) {
    name += '.yml';
  }

  // Setup target and dest paths
  const target = path.join(cwd, dir, name);
  const dest = path.join(cwd, 'docker-compose.yml');

  // Validate target config exists
  if (!fs.existsSync(target) || !isValid(target)) {
    const msg = `Target config ${name} does not exist`;
    console.log(chalk.red(msg));
    process.exit(1);
  }

  // Don't overwrite unless told
  preventOverwrite('docker-compose.yml', options);

  // Write back the config to storage
  if (options.writeBack) {
    const writeback = path.join(cwd, dir, getActiveConf(dir));
    const active = path.join(cwd, 'docker-compose.yml');
    fs.copyFileSync(active, writeback);
  }

  // Move new config
  fs.copyFile(target, dest, (err) => {
    if (err) throw err;
    const msg = `Switched to ${name}`;
    setActiveConf(dir, name);
    console.log(chalk.green(msg));
  });
}

