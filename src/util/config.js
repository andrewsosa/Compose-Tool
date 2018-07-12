import path from 'path';
import nconf from 'nconf';

//
export default function (dir) {
  const confPath = path.join(process.cwd(), '.tugrc.json');

  nconf.file({ file: confPath });

  return {
    get(key) {
      return nconf.get(key);
    },
    set(key, value) {
      nconf.set(key, value);
      nconf.save(((err) => {
        if (err) console.log(err);
      }));
    },
    unset(key) {
      this.set(key, undefined);
    },
  };
}
