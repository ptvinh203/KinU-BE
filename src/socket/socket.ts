import http from 'http'
import socketIo from 'socket.io'
import express from 'express'

const app = express()
const server = http.createServer(app)
const io = new socketIo.Server(server, {
  cors: {
    methods: ['GET', 'POST'],
    credentials: true
  }
})

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Lắng nghe sự kiện disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

export { io, server, app }