import path from 'path';

import * as _fs from '../util/fs';
import config, { keys } from '../util/config';
import { getActiveConf, setActiveConf } from './active';
import { success, error } from '../util/log';


/**
 *               switch
 * -b <name>     branch new conf @name
 * -f <name>     force switch even if overwriting
 * -w <name>     switch to conf @name with writeback
 */
export default function (name, options) {
  const cwd = process.cwd();
  const dir = config().get(keys.dir);

  let fileName = name;

  // Make sure we have our file ending
  if (!name.endsWith('.yml')) {
    fileName += '.yml';
  }

  // Setup target and dest paths
  const target = path.join(cwd, dir, fileName);
  const active = path.join(cwd, 'docker-compose.yml');

  // Validate target config exists
  if (!_fs.exists(target)) {
    error(`Target config ${fileName} does not exist`);
    process.exit(1);
  }

  // Write back the config to storage
  if (options.writeBack) {
    const writeback = path.join(cwd, dir, getActiveConf());
    _fs.move(active, writeback, { overwrite: true });
  }

  // Copy in new config
  _fs.copy(target, active);
  setActiveConf(fileName);
  success(`Switched to ${fileName}`);

  // // Move new config
  // fs.copyFile(target, dest, (err) => {
  //   if (err) throw err;
  //   const msg = ;
  //   setActiveConf(dir, fileName);
  //   console.log(chalk.green(msg));
  // });
}
