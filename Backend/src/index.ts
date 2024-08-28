import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import createNewRoom from "./newRoom.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
dotenv.config();

// setup socket connection
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const MONGOURL: string = process.env.MONGO_URL || '';

// start up server and connect to database
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log(`Connected to MongoDB: ${MONGOURL}`);
    app.listen(PORT, () => {
      console.log(`⚡️ Server started on port ${PORT} at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.get('/', async (req, res) => {
  res.send('hi');
});

app.get('/add/:username', (req, res) => {
  createNewRoom(req, res);
});

io.on('connection', (socket) => {
  console.log("user connected");
})