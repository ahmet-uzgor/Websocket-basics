const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req,res)=>{
    res.end('sea & cloud');
});

server.listen(3000);

const io = socketio.listen(server);
io.on('connection',(socket)=>{
    
})