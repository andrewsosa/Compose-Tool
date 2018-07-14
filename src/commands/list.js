import path from 'path';
import fs from 'fs';

import { defaults } from '../util/config';

// tug ls
export default function (options) {
  const dir = options.dir || defaults.DEFAULT_DIR;
  const target = path.join(process.cwd(), dir);

  fs.readdir(target, (err, items) => {
    for (let i = 0; i < items.length; i += 1) {
      const name = items[i];
      // if (name.endsWith('.yml')) console.log(name);
      console.log(name);
    }
  });
}
