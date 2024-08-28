import Room from "./room.js";
import { Request, Response } from "express";
import generateRandomString from "./randomId.js";

async function createNewRoom(req: Request, res: Response) {
  const username: string = req.params.username;
  console.log(username);

  try {
    // Check if a room with the same roomId already exists
    const existingRoom = await Room.findOne({ username });
    if (existingRoom) {
      res.status(400).send({ message: 'Room with this ID already exists' });
    }

    // Create a new room since no duplicate was found
    const room = new Room({
      roomId: generateRandomString(),
      users: [username]
    });

    const result = await room.save();
    res.status(200).send(result);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).send({ message: 'There was an error with creating the room' });
  }
}

export default createNewRoom;