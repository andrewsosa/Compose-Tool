import path from 'path'
import fs from 'fs'

import chalk from 'chalk'

import {DEFAULT_DIR} from './util/_globals'
import {getActiveConf, setActiveConf} from './active'
import preventOverwrite from './util/overwrite'
import checkout from './checkout'

export default function (name, options) {
    let cwd = process.cwd()
    let dir = options.dir || DEFAULT_DIR

    // Make sure we have our file ending
    if (!name.endsWith('.yml')) {
        name += '.yml'
    }

    // Path of the file we'll create
    let target = path.join(cwd, dir, name)

    // Can't already exist
    if (fs.existsSync(target)) {
        let msg = `Config ${name} already exists.`
        console.log(chalk.red(msg))
        process.exit(1)
    }

    // Don't create new if there's one active until -f or -w
    preventOverwrite('docker-compose.yml', options)

    // Create the file
    fs.closeSync(fs.openSync(target, 'w'))

    // Checkout the new file with our options
    checkout(name, options)

}