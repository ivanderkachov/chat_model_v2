const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    users: {
      type: [{}],
    },
    messages: {
      type: [{}],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("chat_rooms", roomSchema)