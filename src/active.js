import path from 'path'
import fs from 'fs'

import chalk from 'chalk'

import config from './config'

export function getActiveConf (dir) {
    const conf = config(dir)
    let active = conf.get('active')
    // let file = path.join(process.cwd(), dir, active)

    // if (!fs.existsSync(file)) {
    //     conf.unset(active)

    //     let msg = `Supposedly active config ${active} not found.`
    //     console.log(chalk.red(msg))

    //     active = undefined
    // }

    return active
}

export function setActiveConf(dir, name) {
    const conf = config(dir)
    conf.set('active', name)
}

// tug active
export default function (options) {
    let dir = options.dir || '.docker'
    let active = getActiveConf(dir)


    if (active === undefined) {
        let msg = 'No active configuration found'
        console.log(msg)
    } else {
        console.log(active)
    }
}