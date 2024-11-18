const express = require("express");
const AssignmentsModel = require("../Models/Assignment");
const UsersModel = require("../Models/Users");
const StudentsGroupChatModel = require("../Models/StudentGroupChat");

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

// endpoint to Add a new goal
router.put("/add-goal", async (req, res) => {
  const userId = req.userId;
  const { goal } = req.body;

  try {
    // user
    const user = await UsersModel.findById(userId);
    if (user.role !== "student") {
      throw Error("Unauthorized access");
    }

    // add new goal
    user.goals.push({ goal });
    await user.save();

    res.status(201).json("Goal added successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to delete goal
router.delete("/goal/:goalId", async (req, res) => {
  const userId = req.userId;
  const { goalId } = req.params;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (user.role !== "student") {
      throw Error("Unauthorized access");
    }

    // find goal
    const goalIndex = user.goals.findIndex(
      (goal) => goal._id.toString() === goalId
    );
    if (goalIndex === -1) {
      throw Error("Goal not found");
    }

    // delete goal
    user.goals.splice(goalIndex, 1);
    await user.save();

    res.status(200).json("Goal deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// update goal progress
router.put("/goal/progress/:goalId", async (req, res) => {
  const userId = req.userId;
  const { goalId } = req.params;
  const { progress } = req.body;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (user.role !== "student") {
      throw Error("Unauthorized access");
    }

    // find goal
    const goalIndex = user.goals.findIndex(
      (goal) => goal._id.toString() === goalId
    );
    if (goalIndex === -1) {
      throw Error("Goal not found");
    }

    // update goal progress
    user.goals[goalIndex].progress = progress;
    await user.save();

    res.status(200).json("Progress updated successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to send group chat message
router.post("/groupChat", async (req, res) => {
  const userId = req.userId;
  const { message } = req.body;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (!user) {
      throw Error("Unauthorized access");
    }

    // create new group chat message
    await StudentsGroupChatModel.create({
      senderId: user._id,
      content: message,
    });

    res.status(200).json("Message sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to get group chat messages
router.get("/groupChat", async (req, res) => {
  const userId = req.userId;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (!user) {
      throw Error("Unauthorized access");
    }

    // fetch all group chat messages
    const messages = await StudentsGroupChatModel.find();

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
