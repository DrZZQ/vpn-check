#!/usr/bin/env node
const chalk = require('chalk');
const { description, name, version } = require('./package.json')
const options = process.argv.slice(2) //arguments

const VERSION_MESSAGE = `${name} ${version}`
const LOGO = chalk.yellow(` ________________     _____ _      _____
|___  /___  / __ \\   / ____| |    |_   _|
   / /   / / |  | | | |    | |      | |
  / /   / /| |  | | | |    | |      | |
 / /__ / /_| |__| | | |____| |____ _| |_
/_____/_____\\___\\_\\  \\_____|______|_____|`)
const HELP_MESSAGE = LOGO + chalk.yellow('v' + version) + `

${description}

Usage:
--help           Help documentation
--version | -v   Installed package version

nord             Check Nord Vpn servers
test             Test

`
function a(arg) { //Check arguments
  return options.includes(arg)
}


if (a('-v') ||a('--version') ) {
  console.log(VERSION_MESSAGE)
} else if (a('nord')) {
  require('./nord')
} else if (a('test')) {
  require('./test')
} else if (a('logo')) {
  console.log(LOGO);
} else {
  console.log(HELP_MESSAGE)
}
