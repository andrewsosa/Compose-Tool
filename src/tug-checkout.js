#!/usr/bin/env node

import path from "path"
import fs from "fs"

import isValid from "is-valid-path"
import chalk from "chalk"


// tug checkout [-f] <name>
export default function (name, options) {
    let cwd = process.cwd()
    let dir = options.dir || '.docker'

    let target = path.join(cwd, dir, name + '.yml')
    let dest = path.join(cwd, 'docker-compose.yml')

    // Make sure we have our file ending
    if (!name.endsWith('.yml')) {
        name += '.yml'
    }

    // Validate target config exists
    if (!fs.existsSync(target)) {
        let msg = `Target config ${name} does not exist`
        console.log(chalk.red(msg))
        process.exit(1)
    }

    // Don't overwrite unless told
    if (fs.existsSync(dest) && !options.force) {
        let msg = `Can't overwrite existing docker-compose.yml (use -f to force!)`
        console.log(chalk.yellow(msg))
        process.exit(1)
    }

    // Move new config
    fs.copyFile(target, dest, (err) => {
        if (err) throw err
        let msg = `Switched to ${name}`
        console.log(chalk.green(msg))
    })
}

