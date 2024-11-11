const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    senderRole: { type: String, default: "admin" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
