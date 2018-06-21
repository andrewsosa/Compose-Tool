import path from 'path';
import nconf from 'nconf';

const config = {};

// Use default nconf version
config.get = function (key) {
  return nconf.get(key);
};

// Also save after setting
config.set = function (key, value) {
  nconf.set(key, value);
  nconf.save(((err) => {
    if (err) console.log(err);
  }));
};

config.unset = function (key) {
  config.set(key, undefined);
};

//
export default function (dir) {
  const cwd = process.cwd();
  const confPath = path.join(cwd, dir, '.tugrc');

  nconf.file({ file: confPath });

  return config;
}
