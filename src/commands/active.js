import config from '../util/config';
import { warn } from '../util/log';

export function getActive() {
  const conf = config();
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

export function setActive(name) {
  const conf = config();
  conf.set('active', name);
}

// tug active
export default function (options) {
  const active = getActive();

  if (options.unset !== undefined) {
    setActive(undefined);
    return;
  }

  if (active === undefined) {
    warn('No active configuration found');
  } else {
    console.log(active);
  }
}
