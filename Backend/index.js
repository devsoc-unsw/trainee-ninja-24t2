import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import createNewRoom from "./newRoom";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

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

app.get('/add', (req, res) => {
  const { username } = req.body;
  createNewRoom(username);
});