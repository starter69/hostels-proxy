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
  proxyReq.setHeader('Host', 'www.hostelspoint.com');
});

proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log(proxyRes.headers);
  console.log(proxyRes.statusCode);
});

var app = connect()
  // .use(bodyParser.json())//json parser
  // .use(bodyParser.urlencoded())//urlencoded parser
  .use(function(req, res){
    console.log('proxy body:', req.body)
    proxy.web(req, res, {
      target: 'http://www.hostelspoint.com'
    })
  });

http.createServer(app).listen(5050, function(){
  console.log('proxy listen 5050');
});
