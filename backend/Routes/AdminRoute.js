const express = require("express");

const UsersModel = require("../Models/Users.js");
const AnnouncementModel = require("../Models/Announcement.js");
const SurveyModel = require("../Models/Survey.js");
const ResourcesModel = require("../Models/Resources.js");
const MessageModel = require("../Models/Message.js");

const router = express.Router();

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

// endpoint to add a survey
router.post("/createSurvey", async (req, res) => {
  const userId = req.userId;
  const { title, questions } = req.body;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (user.role !== "admin") {
      throw Error("Unauthorized access.");
    }

    // create survey
    await SurveyModel.create({ title, questions });

    res.status(200).json("Survey created successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
});

// endpoint to create a resources

router.post("/createResources", async (req, res) => {
  const userId = req.userId;
  const { resourcesTitle, resourcesDescription, role } = req.body;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (user.role !== "admin") {
      throw Error("Unauthorized access.");
    }

    // find if role exists already and push in the resources or create a new resources
    let resource = await ResourcesModel.findOne({ role });
    if (resource) {
      resource.resources.push({ resourcesTitle, resourcesDescription });

      await resource.save();
    } else {
      await ResourcesModel.create({
        role,
        resources: [{ resourcesTitle, resourcesDescription }],
      });
    }

    res.status(200).json("Resource created successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
});

// endpoint for admin to send message
router.post("/send/messages", async (req, res) => {
  const { message: content } = req.body;
  const userId = req.userId;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (user.role !== "admin") {
      throw Error("Unauthorized access.");
    }

    // create new message
    const newMessage = await MessageModel.create({
      content,
    });

    await newMessage.save();

    res.status(200).json("Message Sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending message.");
  }
});

// endpoint for admin to delete a user

router.delete("/deleteUser/:userToDeleteId", async (req, res) => {
  const { userToDeleteId } = req.params;
  const userId = req.userId;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (user.role !== "admin") {
      throw Error("Unauthorized access.");
    }

    // delete user
    await UsersModel.findByIdAndDelete(userToDeleteId);

    res.status(200).json("User deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
});

module.exports = router;
