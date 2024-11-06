const express = require("express");

const UsersModel = require("../Models/Users.js");
const AnnouncementModel = require("../Models/Announcement.js");

const router = express.Router();

// endpoint to fetch user data from DB
router.get("/userObj", async (req, res) => {
  const userId = req.userId;

  try {
    // find user
    const user = await UsersModel.findById(userId);

    if (!user) {
      throw Error("User not found.");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

// endpoint to fetch notifications
router.get("/notifications", async (req, res) => {
  const userId = req.userId;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (!user) {
      throw Error("User not found.");
    }

    const notifications = await AnnouncementModel.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
