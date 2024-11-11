const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentsSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignmentDetails: { type: String, required: true },
  },
  { timestamps: true }
);

const AssignmentsSchema = new Schema(
  {
    assignmentTitle: { type: String, required: true },
    assignmentDescription: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    students: [StudentsSchema],
  },
  { timestamps: true }
);

const AssignmentsModel = mongoose.model("Assignment", AssignmentsSchema);

module.exports = AssignmentsModel;
