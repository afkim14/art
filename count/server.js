var express = require('express');
var app = express();
//var server = require('http').createServer(app);
var http = require('http').Server(app);
var io = require('socket.io')(http);
var count = 0;

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('Client connected...');
    count++;
    var data = {
        r : Math.floor(Math.random() * 256),
        g : Math.floor(Math.random() * 256),
        b : Math.floor(Math.random() * 256),
        count : count
    }
    io.emit('update', data);
});

// setInterval(() => {
//     var random_color = {
//         r : Math.floor(Math.random() * 256),
//         g : Math.floor(Math.random() * 256),
//         b : Math.floor(Math.random() * 256)
//     }
//     io.emit('new random color', random_color);
// }, 5000);

var port = process.env.PORT || 8080;
http.listen(port, function() {
    console.log('listening on *:' + port);
});
