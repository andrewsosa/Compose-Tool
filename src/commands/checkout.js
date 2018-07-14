import { setActive, getActive } from './active';
import { success, error } from '../util/log';

import { load, save, inStorage } from '../actions/files';

/**
 *               switch
 * -b <name>     branch new conf @name
 * -f <name>     force switch even if overwriting
 * -w <name>     switch to conf @name with writeback
 */
export default function (name, options) {
  // Branching checkout
  if (options.branch) {
    // Make sure our branch name doesn't exist
    if (inStorage(name)) {
      error(`Config ${name} already exists.`);
      return;
    }
    // Save the current as old name
    save(getActive(), { overwrite: true });

    // Change active name & save it
    save(name, { overwrite: true });
    setActive(name);
  }

  // Non-branch checkout
  else {
    // Validate target config exists
    if (!inStorage(name)) {
      error(`Target config ${name} does not exist`);
      process.exit(1);
    }

    // Write back the config to storage
    if (options.writeBack) {
      save(getActive(), { overwrite: true });
    }

    // Copy in new config
    load(name, { overwrite: options.writeBack || options.force });
    setActive(name);
  }

  success(`Switched to ${name}`);
}
