const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema(
  {
    subject: { type: String, required: true },
    announcement: { type: String, required: true },
  },
  { timestamps: true }
);

const AnnouncementModel = mongoose.model("Announcement", AnnouncementSchema);

module.exports = AnnouncementModel;
