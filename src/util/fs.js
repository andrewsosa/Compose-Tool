import chalk from 'chalk';
import path from 'path';
import sh from 'shelljs';

export function exists(target) {
  return sh.test('-e', target);
}

export function guard(target, overwrite) {
  // Guard against unintentional overwrite
  if (!overwrite && exists(target)) {
    const msg = `Can't overwrite existing ${target} (use -f to force)`;
    console.log(chalk.yellow(msg));
    process.exit(1);
  }
  return true;
}

export function mkdir(target) {
  return sh.mkdir('-p', path.join(process.cwd(), target));
}

export function copy(target, dest, options = {}) {
  guard(dest, options.overwrite);
  sh.cp(target, dest);
}

export function move(target, dest, options = {}) {
  guard(dest, options.overwrite);
  sh.mv(target, dest);
}
