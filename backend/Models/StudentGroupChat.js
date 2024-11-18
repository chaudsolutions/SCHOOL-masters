const mongoose = require("mongoose");

const StudentsGroupChatSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const StudentsGroupChatModel = mongoose.model(
  "GroupChat",
  StudentsGroupChatSchema
);

module.exports = StudentsGroupChatModel;
