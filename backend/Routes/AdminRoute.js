const express = require("express");

const UsersModel = require("../Models/Users.js");
const AnnouncementModel = require("../Models/Announcement.js");

const router = express.Router();

// endpoint to fetch all users
router.get("/getUsers", async (req, res) => {
  const userId = req.userId;

  try {
    // find user
    const user = await UsersModel.findById(userId);

    if (!user) {
      throw Error("User not found.");
    }
    if (user.role !== "admin") {
      throw Error("Unauthorized access.");
    }

    const users = await UsersModel.find({});

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
});

// endpoint to update user role
router.put("/updateRole/:roleUserId/:role", async (req, res) => {
  const { roleUserId, role } = req.params;
  const userId = req.userId;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (user.role !== "admin") {
      throw Error("Unauthorized access.");
    }

    // find user to update role
    const roleUser = await UsersModel.findById(roleUserId);
    if (!roleUser) {
      throw Error("User not found.");
    }

    // update user role
    roleUser.role = role;
    await roleUser.save();

    res.status(200).json("User role updated successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
});

// endpoint to post announcements

router.post("/createAnnouncement", async (req, res) => {
  const userId = req.userId;
  const { subject, announcement } = req.body;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (user.role !== "admin") {
      throw Error("Unauthorized access.");
    }

    // post announcement
    await AnnouncementModel.create({
      subject,
      announcement,
    });

    res.status(200).json("Announcement posted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
});

// endpoint to delete announcement
router.delete("/deleteAnnouncement/:announcementId", async (req, res) => {
  const { announcementId } = req.params;
  const userId = req.userId;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (user.role !== "admin") {
      throw Error("Unauthorized access.");
    }

    // delete announcement
    await AnnouncementModel.findByIdAndDelete(announcementId);

    res.status(200).json("Announcement deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
});

module.exports = router;
