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

module.exports = router;
