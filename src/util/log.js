import chalk from 'chalk';

// export function debug (msg) {
//     if (process.env.NODE_ENV === 'test' ||
//         process.env.NODE_ENV === 'dev') {
//             console.log(chalk.blue(msg));
//         }
// }

export function success (msg) {
    console.log(chalk.green(msg));
}

export function warn (msg) {
    console.log(chalk.yellow(msg));
}

export function error (msg) {
    console.log(chalk.red(msg));
}