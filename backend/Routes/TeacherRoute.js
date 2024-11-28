const express = require("express");
const UsersModel = require("../Models/Users");
const AssignmentsModel = require("../Models/Assignment");
const ExamsModel = require("../Models/Exam");

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

// endpoint to grade assignments
router.put("/gradeAssignment/:assignmentId/:studentId", async (req, res) => {
  const { assignmentId, studentId } = req.params;
  const { grade } = req.body;

  try {
    // find assignment
    const assignment = await AssignmentsModel.findById(assignmentId);
    if (!assignment) {
      throw Error("Assignment not found.");
    }

    // find student withing assignment
    const student = assignment.students.find(
      (s) => s.studentId.toString() === studentId
    );
    if (!student) {
      throw Error("Student not found in the assignment.");
    }

    // update student grade
    student.grade = grade;
    await assignment.save();

    res.status(200).json("Assignment Grade Updated");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to end assignment
router.put("/endAssignment/:assignmentId", async (req, res) => {
  const { assignmentId } = req.params;

  try {
    // find assignment
    const assignment = await AssignmentsModel.findById(assignmentId);
    if (!assignment) {
      throw Error("Assignment not found.");
    }

    // end assignment
    assignment.active = !assignment.active;
    await assignment.save();

    const assignmentStatus = assignment.active;

    res
      .status(200)
      .json(`Assignment ${assignmentStatus ? "Started" : "Ended"}`);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to fetch a user by Id
router.get("/userDetails/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // find user
    const user = await UsersModel.findById(userId);
    if (!user) {
      throw Error("User not found.");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to grade teacher subjects
router.put("/gradeSubjects/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { subjects } = req.body;

  try {
    // find student
    const student = await UsersModel.findById(studentId);
    if (!student) {
      throw Error("Student not found.");
    }

    // update student grades
    student.grades = subjects;

    await student.save();

    res.status(200).json("Subjects Graded");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to submit attendance
router.put("/submitAttendance/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { attendance } = req.body;

  try {
    // find student
    const student = await UsersModel.findById(studentId);
    if (!student) {
      throw Error("Student not found.");
    }

    student.attendance = attendance;

    await student.save();

    res.status(200).json("Attendance Updated");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint for student and teacher messaging
router.put("/send/message/:studentId/:userId", async (req, res) => {
  const { studentId, userId } = req.params;
  const { message } = req.body;

  try {
    // find student and user
    const student = await UsersModel.findById(studentId);
    const user = await UsersModel.findById(userId);

    if (!student || !user) {
      throw Error("User not found.");
    }

    // send message
    student.teacherStudentMessages.push({
      senderId: user._id,
      senderRole: user.role,
      content: message,
    });
    await student.save();

    res.status(200).json("Message sent");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to set exam date
router.post("/setExamDate", async (req, res) => {
  const { from, to } = req.body;

  try {
    // Validate input
    if (!from || !to) {
      return res.status(400).json("Both 'from' and 'to' dates are required.");
    }

    await ExamsModel.deleteMany();

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (fromDate > toDate) {
      return res.status(400).json("'From' date must be before 'To' date.");
    }

    // Save exam date range (example logic)
    const examDate = { from: fromDate, to: toDate };

    // Save examDate to database or update the necessary record
    await ExamsModel.create(examDate);

    res.status(200).json("Exam date range set successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// endpoint to add a child
router.put("/addAChild", async (req, res) => {
  const userId = req.userId;
  const { childName, childEmail } = req.body;

  try {
    // Find the user
    const user = await UsersModel.findById(userId);
    if (user.role !== "teacher") {
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
