import path from 'path';

import config, { keys, COMPOSE_FILENAME } from '../util/config';
import { copy, exists } from '../util/fs';

export function yaml(name) {
  return name.endsWith('.yml') ? name : `${name}.yml`;
}

export function inStorage(name) {
  const cwd = process.cwd();
  const dir = config().get(keys.dir);

  const targetPath = path.join(cwd, dir, yaml(name));
  return exists(targetPath);
}

export function save(dest, options) {
  const cwd = process.cwd();
  const dir = config().get(keys.dir);

  const sourcePath = path.join(cwd, COMPOSE_FILENAME);
  const destPath = path.join(cwd, dir, yaml(dest));

  copy(sourcePath, destPath, options);
}

export function load(source, options) {
  const cwd = process.cwd();
  const dir = config().get(keys.dir);

  const sourcePath = path.join(cwd, dir, yaml(source));
  const destPath = path.join(cwd, COMPOSE_FILENAME);

  copy(sourcePath, destPath, options);
}


export default { save, load, inStorage };
