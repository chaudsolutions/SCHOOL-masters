const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExamsSchema = new Schema(
  {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  { timestamps: true }
);

const ExamsModel = mongoose.model("Exam", ExamsSchema);

module.exports = ExamsModel;
