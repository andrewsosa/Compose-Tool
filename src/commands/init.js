import inquirer from 'inquirer';

import { exists } from '../util/fs';

export default function init (options) {

    // Don't double init
    if (exists('.tugrc.json')) {
        
    }

    const questions = [
        {
            name: "DIRECTORY",
            type: "input",
            message: "Where would you like to keep your Compose configs?",
            default: ".docker"
        },
        {
            name: "INIT_NAME",
            type: "input",
            message: "What should we call the active config?",
            default: "master",
            when: exists('docker-compose.yml')
        }
    ]

    const { DIRECTORY, INIT_NAME } = inquirer.prompt(questions);


}