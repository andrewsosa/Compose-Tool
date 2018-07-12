import path from 'path';
import nconf from 'nconf';

//
export default function (dir) {
  const confDir = dir || process.cwd();
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
  };
}
