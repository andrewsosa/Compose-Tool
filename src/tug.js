#!/usr/bin/env node

import app from 'commander'

import checkout from './tug-checkout'

app.version('0.1.0')
    .description('Docker Compose configuration management tool')
    .option('-d, --dir <path>', 'Specify an alternate config directory (default: .docker)')

// app.command('new <name>')
//     .description('Create new Compose configuration')
//     .action(function (name, options) {
//       console.log('Creating new config %s', name)
//     })

app.command('checkout <name>')
    .option('-f, --force', 'Force overwrite of current docker-compose.yml')
    .action(checkout)

app.parse(process.argv)
