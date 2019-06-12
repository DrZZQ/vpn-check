const fs = require('fs');
// const execa = require('execa');
// const listr = require('listr');

let serverList = fs.readdirSync('/etc/openvpn/ovpn_tcp/')

serverList.forEach(function(item, i, arr) {
  serverList[i] = '/etc/openvpn/ovpn_tcp/' + item
})

let ips = []

for (var i = 0; i < serverList.length; i++) {
  let data = fs.readFileSync(serverList[i]) + ''
  data = data.split('\n',4)
  data = data[3].substring(7)
  ips.splice(0, 0, data)
}
