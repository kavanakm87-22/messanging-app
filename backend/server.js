// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); 

const server = http.createServer(app);

// Initialize Socket.io with CORS allowing your React frontend to connect
const io = new Server(server, {
  cors: {
    origin: "*", // Allows connections from any port (e.g., your Vite port 5175)
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Listen for a message from a client
  socket.on('send_message', (data) => {
    // Broadcast the exact message to ALL connected tabs/users
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});