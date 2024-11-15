const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentsSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    assignmentDetails: { type: String, required: true },
    grade: { type: Number },
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
