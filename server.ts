import express from 'express';
// create express application
const app = express();
import http from 'http';
// create server instance for socket creation.
const server = http.createServer(app);
import { Server, Socket } from "socket.io";
import { receivedDataDto } from './interfaces';
const io = new Server(server);

// socket connection
io.on('connection', (socket: Socket) => {
 console.log("connected client===", socket.handshake.query.clientIp)
  socket.on("data", (arg:receivedDataDto) => {
    if(arg && arg.IP && arg.data){
      console.log("data receiving from client : ",arg.IP); 
      console.log("received data : " ,arg.data)
      console.log("------------------------------------"); 
    }     
  });
});

// socket disconnection
io.on('disconnect', (socket:Socket) => {
  console.log("disconnected client===", socket.handshake.query.clientIp)
});

server.listen(3000, () => {
  console.log('Server is listening on *:3000');
});