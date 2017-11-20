import path from 'path'
import fs from 'fs'

import {DEFAULT_DIR} from './util/_globals'


// tug ls
export default function (options) {
    let dir = options.dir || DEFAULT_DIR
    let target = path.join(process.cwd(), dir)

    fs.readdir(target, function(err, items) {
        for (var i=0; i<items.length; i++) {
            let name = items[i]
            if (name.endsWith('.yml')) console.log(name)

        }
    })

}