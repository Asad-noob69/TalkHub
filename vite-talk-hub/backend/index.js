// index.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (username) => {
    users.set(socket.id, username);
    io.emit('userJoined', username);
    io.emit('userList', Array.from(users.values()));
  });

  socket.on('message', (msg) => {
    const username = users.get(socket.id);
    io.emit('message', { text: msg.text, sender: username, timestamp: msg.timestamp });
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    io.emit('userLeft', username);
    io.emit('userList', Array.from(users.values()));
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));