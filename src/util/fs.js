import chalk from 'chalk';
import path from 'path';
import sh from 'shelljs';

export function exists(target) {
  return sh.test('-e', path.join(process.cwd(), target));
}

export function mkdir(target) {
  return sh.mkdir('-p', path.join(process.cwd(), target));
}

export function write(target, json, options) {
  const overwrite = options.overwrite || false;

  // Guard against unintentional overwrite
  if (!overwrite && exists(target)) {
    const msg = `Can't overwrite existing ${target} (use -f to force)`;
    console.log(chalk.yellow(msg));
  }
}
