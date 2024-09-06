import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import createNewRoom from "./newRoom.js";
import { Server } from "socket.io";
import httpModule from 'http';
import cors from "cors";
import Room from "./room.js";
import { Socket } from "socket.io";

const app = express();
dotenv.config();

// setup socket connection
const http = httpModule.createServer(app);
const io = new Server(http, {cors: {origin: "*"}});
app.use(cors({ origin: "*" }));

const PORT = process.env.PORT || 3000;
const SOCKET = process.env.SOCKET || 7000;
const MONGOURL: string = process.env.MONGO_URL || '';

interface CustomSocket extends Socket {
  username?: string;
  roomId?: string;
}

// start up server and connect to databasex
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

// route for validating whether a room with a given roomId exists
app.get("/validateRoom/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({ roomId: roomId });
    if (room) {
      return res.status(200).json({ valid: true, userCount: room.users.length });
    } else {
      return res.status(200).json({ valid: false, userCount: 0 });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

io.on('connection', (socket: CustomSocket) => {
  // Handle user joining a room
  socket.on('joinRoom', async (roomId, username) => {
    socket.join(roomId);
    socket.username = username;
    socket.roomId = roomId;
    console.log(`${username} joined ${roomId}`);

    try {
      const room = await Room.findOne({ roomId: roomId });
      if (room && room.users.length < 2) {
        socket.join(roomId);
        io.to(roomId).emit("userJoin", room.users.length + 1);
        room.users.push(username); // Add user to room
        await room.save(); // Save changes to the database
      } else {
        socket.emit("joinError", "Room is full or does not exist");
      }
    } catch (error) {
      console.error('Error joining room:', error);
      socket.emit("joinError", "There was an error joining the room");
    }
  });

  // Handle user disconnecting
  socket.on('disconnecting', async () => {
    const rooms = socket.rooms;
    const leftRoom = [...rooms][1]; // Convert set of rooms into array

    try {
      const room = await Room.findOne({ roomId: leftRoom });
      if (room) {
        room.users = room.users.filter(user => user !== socket.username); // Remove user from room
        await room.save(); // Save changes to the database
        console.log(`${socket.username} left ${socket.roomId}`);
        socket.leave(leftRoom);

        const clients = io.sockets.adapter.rooms.get(leftRoom);
        if (typeof clients !== 'undefined') {
          console.log('user disconnecting', clients);
          io.to(leftRoom).emit("userLeave", clients.size);
        } else {
          console.log('user disconnecting', clients);
          io.to(leftRoom).emit("userLeave", 0);
        }
      }
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  });
});