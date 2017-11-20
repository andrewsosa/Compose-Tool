#!/usr/bin/env node

import app from 'commander'

import active from './active'
import checkout from './checkout'
import create from './create'
import list from './list'

app.version('0.1.0')
    .description('Docker Compose configuration management tool')
    .option('-d, --dir <path>', 'Specify an alternate config directory (default: .docker)')

app.command('active')
    .description('Print the active Compose configuration')
    .option('-u, --unset', 'Unset the active Compose configuration')
    .action(active)

app.command('checkout <name>')
    .description('Switch to a different Compose configuration')
    .option('-f, --force', 'Force overwrite of current docker-compose.yml')
    .option('-w, --write-back', 'Write active configuration back to config storage')
    .action(checkout)

app.command('create <name>')
    .description('Create a new Compose configuration')
    .option('-f, --force', 'Force overwrite of current docker-compose.yml')
    .option('-w, --write-back', 'Write active configuration back to config storage')
    .action(create)

app.command('ls')
    .description('List available Compose configurations')
    .action(list)

app.parse(process.argv)
