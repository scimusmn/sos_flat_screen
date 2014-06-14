var static = require('node-static'),
    http = require('http'),
    util = require('util'),
    url = require('url'),
    fs = require('fs'),
    dgram = require('dgram');

// create static server for decks
var fileServer = new static.Server('./public');

var server = http.createServer(function (req, res) {

    var pathname = url.parse(req.url).pathname;
    console.log('pathname: '+pathname);

    req.addListener('end', function () {
        fileServer.serve(req, res, function(err, result) {
            if (err) {
                console.error('Error serving %s - %s', req.url, err.message);
                if (err.status === 404 || err.status === 500) {
                    fileServer.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
                } else {
                    res.writeHead(err.status, err.headers);
                res.end();
                }
            } else {
                console.log('%s - %s', req.url, res.message);
            }
        });
    }).resume();

}).listen(process.env.PORT || 9090, function() {
    console.log('Listening at: http://localhost:' + (process.env.PORT || 9090));
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
    /**
     * Listen for UDP messages on port 7788
     */
    udpsocket = dgram.createSocket('udp4');
    udpsocket.on('message', function(content, rinfo) {
        console.log('got message', content, 'from', rinfo.address, rinfo.port);
        io.sockets.emit('udp message', content.toString());
        socket.broadcast.emit('message', content.toString());
    });
    udpsocket.bind(7788);

    socket.on('message', function(message){
        socket.broadcast.emit('message', message);
    });

    socket.on('key down', function(data){
        socket.broadcast.emit('key down', data);
        console.log("Key down");
    });

    socket.on('key up', function(data){
        socket.broadcast.emit('key up', data);
    });

    socket.on('flowtime minimap complete', function(data){
        socket.broadcast.emit('flowtime minimap complete', data);
    });

    socket.on('navigate', function(data){
        socket.broadcast.emit('navigate', data);
    });

    socket.on('disconnect', function(){
        console.log("Connection " + socket.id + " terminated.");
    });

});

