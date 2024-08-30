import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import createNewRoom from "./newRoom.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
dotenv.config();

// setup socket connection + CORS with frontend
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

// const PORT = process.env.PORT || 3000;
const PORT = 3000;

// const MONGOURL: string = process.env.MONGO_URL || '';

// start up server and connect to database
// mongoose
//   .connect(MONGOURL)
//   .then(() => {
//     console.log(`Connected to MongoDB: ${MONGOURL}`);
//     app.listen(PORT, () => {
//       console.log(`⚡️ Server started on port ${PORT} at http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => console.log(error));

app.get('/', async (req, res) => {
  res.send('hi');
});

app.get('/add/:username', (req, res) => {
  createNewRoom(req, res);
});

io.on('connection', (socket) => {
  console.log("user connected");

  // when a user joins a room, emit a message to all of the users in that room
  socket.on('joinRoom', (room) => {
    console.log('joined', room);

    socket.join(room);

    // send number of clients in the current room back to frontend
    const clients = io.sockets.adapter.rooms.get(room);
    io.to(room).emit("userJoin", clients.size);
  })
})

server.listen(PORT, () => {
  console.log(`⚡️ Server started on port ${PORT} at http://localhost:${PORT}`);
});