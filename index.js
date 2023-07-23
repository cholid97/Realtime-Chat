const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static("public"));

// Set up a connection event for new clients
io.on("connection", (socket) => {
  console.log("A new client has connected");

  // Handle chat messages
  socket.on("chatMessage", (message) => {
    console.log("Received message:", message);
    // Broadcast the message to all connected clients
    io.emit("chatMessage", message);
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("A client has disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
