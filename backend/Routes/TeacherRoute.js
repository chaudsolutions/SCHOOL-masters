const express = require("express");
const UsersModel = require("../Models/Users");
const AssignmentsModel = require("../Models/Assignment");

const router = express.Router();

router.post("/createAssignment", async (req, res) => {
  const userId = req.userId;
  const { assignmentTitle, assignmentDescription } = req.body;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (user.role !== "teacher") {
      throw Error("Unauthorized access.");
    }

    //   create assignment
    await AssignmentsModel.create({ assignmentTitle, assignmentDescription });

    res.status(200).json("Assignment Created");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
