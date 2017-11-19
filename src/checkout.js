import path from 'path'
import fs from 'fs'

import isValid from 'is-valid-path'
import chalk from 'chalk'

import {getActiveConf, setActiveConf} from './active'
import {DEFAULT_DIR} from './util/_globals'
import preventOverwrite from './util/overwrite'


// tug checkout [-f] <name>
export default function (name, options) {
    let cwd = process.cwd()
    let dir = options.dir || DEFAULT_DIR

    // Make sure we have our file ending
    if (!name.endsWith('.yml')) {
        name += '.yml'
    }

    // Setup target and dest paths
    let target = path.join(cwd, dir, name)
    let dest = path.join(cwd, 'docker-compose.yml')

    // Validate target config exists
    if (!fs.existsSync(target) || !isValid(target)) {
        let msg = `Target config ${name} does not exist`
        console.log(chalk.red(msg))
        process.exit(1)
    }

    // Don't overwrite unless told
    preventOverwrite('docker-compose.yml', options);

    // Write back the config to storage
    if (options.writeBack) {
        let writeback = path.join(cwd, dir, getActiveConf(dir))
        let active = path.join(cwd, 'docker-compose.yml')
        fs.copyFileSync(active, writeback)
    }

    // Move new config
    fs.copyFile(target, dest, (err) => {
        if (err) throw err
        let msg = `Switched to ${name}`
        setActiveConf(dir, name)
        console.log(chalk.green(msg))
    })
}

