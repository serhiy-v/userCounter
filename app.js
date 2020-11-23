const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set("view engine", "ejs");


server.listen(3000);

let connectedIp = [];
let count = 0;

io.on('connection',(socket)=>{
  var address = socket.handshake.address;
  if(!connectedIp.hasOwnProperty(address)){
    connectedIp[address] = 1;
    count++;
} else {
        connectedIp[address] += 1;
    }
  console.log(count + " " + connectedIp);
  socket.on('disconnect',()=>{
   connectedIp[address] -= 1;

     if (connectedIp[address] <= 0) {
         delete connectedIp[address];
         count--;
     }
     console.log(count + " " + connectedIp);
 })
});

app.get('/',(req,res)=>{
  res.render('view',{counter:count});
});
