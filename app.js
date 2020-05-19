const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req,res)=>{
    res.end('server started');
});

server.listen(3000);

const io = socketio.listen(server);

// Chat Area socket events listening
const chatSpace = io.of('/chatArea');
chatSpace.on('connection',(socket)=>{
    console.log("chat area client connected");

    socket.on('writeName',(data)=>{
        console.log('My name is '+data.name);
        chatSpace.emit('distributeName',{name: data.name});
    })
})


// Rootspace socket events listening
io.sockets.on('connection',(socket)=>{
    console.log('User connected');

    socket.on('sayHi',(data)=>{
        console.log('Hiii from %s %s merhaba',data.name,data.language);
    });

    socket.emit('give me five', {name: "Ahmet", age:23}); // socket.emit pushes an event

    socket.on('disconnect',()=>{ // socket.on takes an specified event and show result when client sent
        console.log("User left");
    })
});

