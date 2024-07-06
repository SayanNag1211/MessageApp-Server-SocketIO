const express = require('express')
const app = express()
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const {Server}=require('socket.io');
var users = {};
//Socket
const io = new Server(server);
const username='Client1';
io.on('connection',(socket)=>{
    console.log('Client Connected',socket.id);
      socket.on('register', (username) => {
    users[username] = socket.id;
    console.log(`${username} registered with socket id ${socket.id}`);
  });

    socket.on('Server1',(msg)=>{
        const { to, message, from } = msg;
        const recipientSocketId = users[to];
        if(recipientSocketId){
        console.log("User send:- ",msg);''
        io.to(recipientSocketId).emit('Client1',{message,from});
        }else{
            console.log("User not found:- ",msg);
        }
    });
});


app.use(express.static(path.resolve('./public')));
app.get('/', (req, res) => res.sendFile('/public/index.html'));

// app.use();
server.listen(3000, () => console.log(`Example app listening on port 3000!`));