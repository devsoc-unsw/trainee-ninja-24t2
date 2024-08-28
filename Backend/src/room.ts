import mongoose from "mongoose";

// MongoDB schema for a room 
const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true
  },
  users: {
    type: [String],
    validate: [numUserCap, '{PATH} exceeds the limit of 2'],
  },
}); 

function numUserCap(val) {
  return val.length <= 2;
}

const Room = mongoose.model("rooms", roomSchema);
export default Room;