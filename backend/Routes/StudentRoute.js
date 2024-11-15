const express = require("express");
const AssignmentsModel = require("../Models/Assignment");
const UsersModel = require("../Models/Users");

const router = express.Router();

router.put("/completeAssignment/:assignmentId", async (req, res) => {
  const userId = req.userId;
  const { assignmentId } = req.params;
  const { assignmentDetails } = req.body;

  try {
    // Find the user
    const user = await UsersModel.findById(userId);
    if (user.role !== "student") {
      throw Error("Unauthorized access");
    }

    // find assignment
    const assignment = await AssignmentsModel.findById(assignmentId);
    if (!assignment) {
      throw Error("Assignment not found");
    }

    // submit user assignment
    assignment.students.push({
      studentId: userId,
      studentName: user.name,
      studentEmail: user.email,
      assignmentDetails,
    });

    await assignment.save();

    res.status(200).json("Assignment submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
