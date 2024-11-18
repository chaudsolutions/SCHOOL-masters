const express = require("express");

const UsersModel = require("../Models/Users.js");
const AnnouncementModel = require("../Models/Announcement.js");
const SurveyModel = require("../Models/Survey.js");
const ResourcesModel = require("../Models/Resources.js");
const MessageModel = require("../Models/Message.js");
const AssignmentsModel = require("../Models/Assignment.js");
const ExamsModel = require("../Models/Exam.js");

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

// endpoint to fetch all users
router.get("/getUsers/:userType", async (req, res) => {
  const userId = req.userId;
  const { userType } = req.params;

  try {
    // find user
    const user = await UsersModel.findById(userId);

    if (!user) {
      throw Error("User not found.");
    }

    let users = await UsersModel.find({});

    if (userType !== "all") {
      users = users.filter((user) => user.role === userType);
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
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

// endpoint to fetch surveys
router.get("/surveys", async (req, res) => {
  const userId = req.userId;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (!user) {
      throw Error("User not found.");
    }

    const surveys = await SurveyModel.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(surveys);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

// endpoint tp fetch survey by ID
router.get("/survey/:surveyId", async (req, res) => {
  const userId = req.userId;
  const { surveyId } = req.params;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (!user) {
      throw Error("User not found.");
    }

    const survey = await SurveyModel.findById(surveyId);
    if (!survey) {
      throw Error("Survey not found.");
    }

    res.status(200).json(survey);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

// endpoint to submit a survey
router.put("/addSurvey/:surveyId", async (req, res) => {
  const userId = req.userId;
  const { surveyId } = req.params;
  const { answers } = req.body;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (!user) {
      throw Error("User not found.");
    }

    // find survey
    const survey = await SurveyModel.findById(surveyId);
    if (!survey) {
      throw Error("Survey not found.");
    }

    // Update each question's answers
    answers.forEach(({ questionId, answer }) => {
      const question = survey.questions.id(questionId);
      if (question) question.answers.push(answer);
    });

    await survey.save();

    res.status(200).json("Survey Submitted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

// fetch resources by role
router.get("/resources/:role", async (req, res) => {
  const userId = req.userId;
  const { role } = req.params;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (!user) {
      throw Error("User not found.");
    }

    const resources = await ResourcesModel.findOne({ role });

    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

// endpoint to fetch messages
router.get("/messages", async (req, res) => {
  const userId = req.userId;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (!user) {
      throw Error("User not found.");
    }

    // find messages
    const messages = await MessageModel.find({});

    res.status(200).send(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to fetch assignments
router.get("/assignments", async (req, res) => {
  try {
    const assignments = await AssignmentsModel.find({}).sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to fetch assignment by ID
router.get("/assignment/:assignmentId", async (req, res) => {
  const { assignmentId } = req.params;

  try {
    const assignment = await AssignmentsModel.findById(assignmentId);

    res.status(200).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to fetch exams
router.get("/exams", async (req, res) => {
  try {
    const exams = await ExamsModel.find({}).sort({ createdAt: -1 });

    res.status(200).json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
