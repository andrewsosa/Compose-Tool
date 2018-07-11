import config from '../util/config';
import { DEFAULT_DIR } from '../util/_globals';

export function getActiveConf(dir) {
  const conf = config(dir);
  const active = conf.get('active');
  // let file = path.join(process.cwd(), dir, active)

  // if (!fs.existsSync(file)) {
  //     conf.unset(active)

  //     let msg = `Supposedly active config ${active} not found.`
  //     console.log(chalk.red(msg))

  //     active = undefined
  // }

  return active;
}

export function setActiveConf(dir, name) {
  const conf = config(dir);
  conf.set('active', name);
}

// tug active
export default function (options) {
  const dir = options.dir || DEFAULT_DIR;
  const active = getActiveConf(dir);

  if (options.unset !== undefined) {
    setActiveConf(dir, undefined);
    return;
  }

  if (active === undefined) {
    const msg = 'No active configuration found';
    console.log(msg);
  } else {
    console.log(active);
  }
}
