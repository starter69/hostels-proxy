var http = require('http');
var httpProxy = require('http-proxy');
var https = require('https');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  console.log(req.headers);
  proxy.on('proxyReq', function(proxyReq, req, res, options) {
    if(req.method=="POST" && req.body){
        proxyReq.write(req.body);
        proxyReq.end();
    }
  });
  proxy.web(req, res, { target: 'https://www.hostelspoint.com' });
});

console.log("listening on port 5050")
server.listen(5050);
