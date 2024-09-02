import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import createNewRoom from "./newRoom.js";
import { Server } from "socket.io";
import httpModule from 'http';

const app = express();
dotenv.config();

// setup socket connection
const http = httpModule.createServer(app);
const io = new Server(http, {cors: {origin: "*"}});

const PORT = process.env.PORT || 3000;
const SOCKET = process.env.SOCKET || 8000;
const MONGOURL: string = process.env.MONGO_URL || '';

// start up server and connect to database
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log(`Connected to MongoDB: ${MONGOURL}`);
    
    app.listen(PORT, () => {
      console.log(`⚡️ Server started on port ${PORT} at http://localhost:${PORT}`);
    });

    http.listen(SOCKET, () => {
      console.log(`listening on http://localhost:${SOCKET}`);
    });
  })
  .catch((error) => console.log(error));

app.post('/create', (req, res) => {
  createNewRoom(req, res);
});

io.on('connection', (socket) => {
  console.log("user connected");
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(roomId);

    const clients = io.sockets.adapter.rooms.get(roomId);
    io.to(roomId).emit("userJoin", clients.size);
  });

  // when a user joins a room, emit a message to all of the users in that room
  socket.on('joinRoom', (room) => {
    console.log('joined', room);

    socket.join(room);

    // send number of clients in the current room back to frontend
    const clients = io.sockets.adapter.rooms.get(room);
    io.to(room).emit("userJoin", clients.size);
  })

  // handle user disconnect
  socket.on('disconnecting', () => {
    const rooms = socket.rooms;

    // convert set of rooms into array
    const leftRoom = [...rooms][1];
    socket.leave(leftRoom);

    // broadcast to all clients in the given room that a user has disconnected
    const clients = io.sockets.adapter.rooms.get(leftRoom);
    if (typeof clients != 'undefined') {
      console.log('user disconnecting', clients);
      io.to(leftRoom).emit("userLeave", clients.size);
    }
    else {
      // no users left in room
      console.log('user disconnecting', clients);
      io.to(leftRoom).emit("userLeave", 0);
    }
  })
})

http.listen(PORT, () => {
  console.log(`⚡️ Server started on port ${PORT} at http://localhost:${PORT}`);
});