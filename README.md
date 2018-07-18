# Tug
> A tugboat for managing your `docker-compose.yml` files.

Does your project have multiple `docker-compose.yml` configs? Different configs 
for dev, prod, or test? Maybe typing `docker-compose -f <your_filename>` gets 
tedious. 

With `tug`, you can keep your configurations tucked away and switch between
them easily -- it's like version control, but for Docker Compose!

``` sh
$ tug init
? Where would you like to keep your Compose configs? .docker
? What should we call the active config? master
$ tug checkout -b dev
Switched to dev
$ tug ls
master.yml
dev.yml
```


## Installation
```bash
# npm
npm i -g compose-tugboat

# yarn
yarn global add compose-tugboat
```

## Usage
```
$ tug --help

Usage: tug [options] [command]

Docker Compose configuration management tool

Options:

  -V, --version              output the version number
  -h, --help                 output usage information

Commands:

  init [options]             Initialize Tug
  active [options]           Print the active Compose configuration
  checkout [options] <name>  Switch to a different Compose configuration
  ls                         List available Compose configurations
  save [options] <name>      Save the current configuration as <name>
```

## Built With
  - [Commander](https://github.com/tj/commander.js/) – CLI options and subcommands framework.
  - [Inquirer](https://github.com/SBoudrias/Inquirer.js/) – Interactive CLI framework.
  - [nconf](https://github.com/indexzero/nconf) – Simple Node.js config file management.
  - [Babel](https://babeljs.io/) - Next generation JavaScript, today.
  - [ESLint](https://eslint.org/) - The pluggable linting utility for JavaScript and JSX.
  <!-- - [Travis CI](https://travis-ci.org/) – Continuous Integration & Deployment. -->


## Contributing
1. Fork it
2. Create your feature branch (`git checkout -b my-change`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-change`)
5. Create new Pull Request


## License
[MIT](LICENSE) © [Andrew Sosa](http://andrewsosa.com)
