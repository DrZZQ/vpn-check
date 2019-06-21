#!/usr/bin/env node
const { description, name, version } = require('./package.json')
const options = process.argv.slice(2) //arguments

const VERSION_MESSAGE = `${name} ${version}`
const HELP_MESSAGE = `${VERSION_MESSAGE}

${description}

Usage:
--help           Help documentation
--version | -v   Installed package version

`
function a(arg) { //Check arguments
  return options.includes(arg)
}


if (a('-v') ||a('--version') ) {
  console.log(VERSION_MESSAGE)
} else if (a('nord')) {
  require('./nord')
}
