import config from '../util/config';
import { warn } from '../util/log';

export function getActive() {
  return config().get('active');
}

export function setActive(name) {
  config().set('active', name);
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
