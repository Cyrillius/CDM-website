var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var express = require('express');
// Set up an express server (but not starting it yet)
var server = express();
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist' });
});


server.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});