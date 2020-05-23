const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req,res)=>{
    res.end('sea & cloud');
});

server.listen(3000);

const io = socketio.listen(server);
io.on('connection',(socket)=>{
    console.log('started');
    socket.on('joinRoom',(data)=>{
        socket.join(data.name , ()=>{
            io.to(data.name).emit('newJoin', {count: getUserCount(io,data)}); //if you write io.to it include sender
            // escept sender socket.to()  ----- include sender io.to()
        });
    });

    socket.on('leaveRoom' , (data)=>{
        socket.leave(data.name, ()=>{
            io.to(data.name).emit('leftUser' ,{count : getUserCount(io , data)});
            socket.emit('leftSocket',{message: 'You left from room'});
        });
    });
});

const getUserCount = (io ,data)=>{  // it gets the user number in the given room as input. 
    // to take number of user in the room
    const room = io.sockets.adapter.rooms[data.name];
    return room ? room.length : 0;
}