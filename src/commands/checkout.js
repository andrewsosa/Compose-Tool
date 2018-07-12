import * as _fs from '../util/fs';
import config, { keys } from '../util/config';
import { getActiveConf, setActiveConf } from './active';
import { success, error } from '../util/log';

import { load, save } from '../actions/files';

/**
 *               switch
 * -b <name>     branch new conf @name
 * -f <name>     force switch even if overwriting
 * -w <name>     switch to conf @name with writeback
 */
export default function (name, options) {
  let fileName = name;

  // Make sure we have our file ending
  if (!name.endsWith('.yml')) {
    fileName += '.yml';
  }

  // Validate target config exists
  if (!_fs.exists(target)) {
    error(`Target config ${fileName} does not exist`);
    process.exit(1);
  }

  // Write back the config to storage
  if (options.writeBack) {
    save(getActiveConf(), { overwrite: true });
  }

  // Copy in new config
  load('fileName');
  setActiveConf(fileName);
  success(`Switched to ${fileName}`);

}
