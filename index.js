var http = require('http');
var httpProxy = require('http-proxy');
var https = require('https');

httpProxy.createProxyServer({
  target: 'https://www.hotelspoint.com',
  agent  : https.globalAgent,
  headers: {
    host: 'hostelspoint.com'
  }
}).listen(5050);
