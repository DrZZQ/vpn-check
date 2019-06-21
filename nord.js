const fs = require('fs')
const execa = require('execa')
const chalk = require('chalk')

let ip = []
let ipPass = 0
let s = { //settings
  pingTimeout: 1,
  pingAmount: 'all' // 'all' or amount
}

let serverList = fs.readdirSync('/etc/openvpn/ovpn_tcp/')

serverList.forEach(function(item, i, arr) {
  serverList[i] = '/etc/openvpn/ovpn_tcp/' + item
})


for (let i = 0; i < serverList.length; i++) {
  let data = fs.readFileSync(serverList[i]).toString()
  serverList[i] = serverList[i].split('/').slice(4).toString().split('.').slice(0, 1).toString() // '/etc/openvpn/ovpn_tcp/uk951.nordvpn.com.tcp.ovpn' => 'uk951'
  data = data.split('\n', 4)
  data = data[3].substring(7)
  let port = data.indexOf(' 443');
  data = data.slice(0, port)
  ip.splice(0, 0, data)
}


console.log('Have ' + ip.length + ' servers')
if (s.pingAmount != 'all' && typeof s.pingAmount != serverList[1]) {
  ip.splice(s.pingAmount)
  console.log('Now ' + ip.length + ' servers');
}

// Loading
const _cliProgress = require('cli-progress')
const bar = new _cliProgress.Bar({
  fps: 60,
  format: 'Cheking servers {bar} {percentage}% | {value}/{total}'
}, _cliProgress.Presets.shades_classic)
bar.start(ip.length,0)


for (let i = 0; i < ip.length; i++) {
  (async () => {
    try {
      // console.log('Cheking ' + ip[i]);
      // if (i % 2 == 0) {
        bar.increment(1)
      // }
      await execa.shell('ping -c 1 -W ' + s.pingTimeout + ' ' + ip[i])
      console.log(chalk.green('Ping pass ') + ip[i] + ' ' + serverList[i])
    } catch (e) {
      // console.log(serverList[i] + chalk.red(' no ping'))
    }
    if (ip.length == i + 1) {
      // bar.update(ip.length * 2)
      bar.stop()
      console.log(chalk.green('Done'));
    }
  })()
}
