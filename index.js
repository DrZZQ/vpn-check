#!/usr/bin/env node
const chalk = require('chalk');
const { description, name, version } = require('./package.json')
const options = process.argv.slice(2) //arguments

const VERSION_MESSAGE = `${name} ${version}`
const LOGO = chalk.yellow(` __  __  ____    __  __      ____    __                     __
/\\ \\/\\ \\/\\  _\`\\ /\\ \\/\\ \\    /\\  _\`\\ /\\ \\                   /\\ \\
\\ \\ \\ \\ \\ \\ \\L\\ \\ \\ \`\\\\ \\   \\ \\ \\/\\_\\ \\ \\___      __    ___\\ \\ \\/'\\
 \\ \\ \\ \\ \\ \\ ,__/\\ \\ , \` \\   \\ \\ \\/_/\\ \\  _ \`\\  /'__\`\\ /'___\\ \\ , <
  \\ \\ \\_/ \\ \\ \\/  \\ \\ \\\`\\ \\   \\ \\ \\L\\ \\ \\ \\ \\ \\/\\  __//\\ \\__/\\ \\ \\\\\`\\
   \\ \`\\___/\\ \\_\\   \\ \\_\\ \\_\\   \\ \\____/\\ \\_\\ \\_\\ \\____\\ \\____\\\\ \\_\\ \\_\\
    \`\\/__/  \\/_/    \\/_/\\/_/    \\/___/  \\/_/\\/_/\\/____/\\/____/ \\/_/\\/_/`)
const HELP_MESSAGE = LOGO + chalk.yellow('v' + version) + `

${description}

Usage: vpn-check [command] {options...}

Commands:

nord             Check Nord Vpn servers
test             Test
logo             Show logo

Options:

--help           Help documentation
--version | -v   Installed package version
`
function a(arg) { //Check arguments
  return options.includes(arg)
}


if (a('-v') ||a('--version') ) {
  console.log(VERSION_MESSAGE)
} else if (a('nord')) {
  console.log(LOGO)
  require('./nord')
} else if (a('test')) {
  require('./test')
} else if (a('logo')) {
  console.log(LOGO);
} else {
  console.log(HELP_MESSAGE)
}
