const express = require("express");
const UsersModel = require("../Models/Users");

const router = express.Router();

// endpoint to add a child
router.put("/addAChild", async (req, res) => {
  const userId = req.userId;
  const { childName, childEmail } = req.body;

  try {
    // Find the user
    const user = await UsersModel.findById(userId);
    if (user.role !== "parent") {
      throw Error("Unauthorized access");
    }

    // find child
    const child = await UsersModel.findOne({ email: childEmail });
    if (!child) {
      return res.status(400).json("Child not found");
    }

    // check if child details are correct
    const correctChild = child.name === childName;
    if (!correctChild) {
      return res.status(400).json("Child Name is incorrect");
    }

    // check if child is already added to user
    const childAlreadyExists = user.children.some(
      (child) => child.childId.toString() === child._id.toString()
    );
    if (childAlreadyExists) {
      return res.status(400).json("Child already exists");
    }

    // Add child to user
    user.children.push({ childId: child._id });
    await user.save();

    res.status(200).json("Child added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
