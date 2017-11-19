#!/usr/bin/env node

import app from 'commander'

import checkout from './checkout'
import active from './active'

app.version('0.1.0')
    .description('Docker Compose configuration management tool')
    .option('-d, --dir <path>', 'Specify an alternate config directory (default: .docker)')

// app.command('new <name>')
//     .description('Create new Compose configuration')
//     .action(function (name, options) {
//       console.log('Creating new config %s', name)
//     })

app.command('active')
    .description('Print the active Compose configuration')
    .action(active)

app.command('checkout <name>')
    .description('Switch to a different Compose configuration')
    .option('-f, --force', 'Force overwrite of current docker-compose.yml')
    .option('-w, --write-back', 'Write active configuration back to config storage')
    .action(checkout)

app.parse(process.argv)
