import path from 'path';
import nconf from 'nconf';

import { exists } from './fs';

// Config keys
export const keys = {
  active: 'active',
  dir: 'directory',
};

// Default values
export const defaults = {
  DEFAULT_DIR: '.docker',
  DEFAULT_CONF_DIR: process.cwd(),
  CONFIG_FILE_NAME: 'docker-compose.yml',
};

export const COMPOSE_FILENAME = defaults.CONFIG_FILE_NAME;

// Configuration API
export default function (dir) {
  const confDir = dir || defaults.DEFAULT_CONF_DIR;
  const confPath = path.join(confDir, '.tugrc.json');

  nconf.file({ file: confPath });

  return {
    get(key) {
      return nconf.get(key);
    },
    set(key, value) {
      nconf.set(key, value);
      nconf.save();
    },
    unset(key) {
      this.set(key, undefined);
    },
    exists() {
      return exists(confPath);
    },
  };
}
