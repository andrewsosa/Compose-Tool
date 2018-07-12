import path from 'path';
import fs from 'fs';

import isValid from 'is-valid-path';
import chalk from 'chalk';

import { DEFAULT_DIR } from '../util/_globals';
import preventOverwrite from '../util/overwrite';


// tug save [-f] <name>
export default function (name, options) {
  const cwd = process.cwd();
  const dir = options.dir || DEFAULT_DIR;

  // Make sure we have our file ending
  if (!name.endsWith('.yml')) {
    name += '.yml';
  }

  // Setup target and dest paths
  const target = path.join(cwd, dir, name);
  const src = path.join(cwd, 'docker-compose.yml');

  // Don't overwrite unless told
  options.msg = `Can't overwrite existing ${name} (use -f to force)`;

  preventOverwrite(path.join(dir, name), options);

  // Move new config
  fs.copyFile(src, target, (err) => {
    if (err) throw err;
    const msg = `Saved ${name}`;
    console.log(chalk.green(msg));
  });
}
