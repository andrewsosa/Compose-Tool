import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import { DEFAULT_DIR } from '../util/_globals';
import preventOverwrite from '../util/overwrite';

import { getActiveConf, setActiveConf } from './active';
import checkout from './checkout';

export default function (name, options) {
  const cwd = process.cwd();
  const dir = options.dir || DEFAULT_DIR;

  let fileName = name;

  // Make sure dir exists
  if (!fs.existsSync(path.join(cwd, dir))) {
    fs.mkdirSync(path.join(cwd, dir));
  }

  // Make sure we have our file ending
  if (!fileName.endsWith('.yml')) {
    fileName += '.yml';
  }

  // Path of the file we'll create
  const target = path.join(cwd, dir, fileName);

  // Can't already exist
  if (fs.existsSync(target)) {
    const msg = `Config ${fileName} already exists.`;
    console.log(chalk.red(msg));
    process.exit(1);
  }

  // Don't create new if there's one active until -f or -w
  preventOverwrite('docker-compose.yml', options);

  // Create the file
  fs.closeSync(fs.openSync(target, 'w'));

  // Checkout the new file with our options
  checkout(fileName, options);
}
