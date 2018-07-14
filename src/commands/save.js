import { save } from '../actions/files';
import { success } from '../util/log';

// tug save [-f] <name>
export default function (name) {
  save(name);
  success(`Saved ${name}`);
}
