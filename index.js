var http = require('http');
var httpProxy = require('http-proxy');
var connect = require('connect');
var bodyParser = require('body-parser');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//restream parsed body before proxying
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  if(req.body) {
    proxyReq.write(req.body);
    proxyReq.end();
  }
});

var app = connect()
  .use(bodyParser.json())//json parser
  .use(bodyParser.urlencoded())//urlencoded parser
  .use(function(req, res){
    console.log('proxy body:',req.body)
    proxy.web(req, res, {
      target: 'http://www.hostelspoint.com'
    })
  });
