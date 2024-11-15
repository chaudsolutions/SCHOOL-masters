const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const GradesSchema = new Schema(
  {
    subject: { type: String },
    score: { type: Number },
  },
  { timestamps: true }
);

const TeacherStudentMessagesSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderRole: { type: String },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const UsersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "student", "teacher", "parent"],
      required: true,
    },
    grades: [GradesSchema],
    attendance: { type: Number },
    teacherStudentMessages: [TeacherStudentMessagesSchema],
  },
  { timestamps: true }
);

// Static sign up method and hashing password
UsersSchema.statics.signup = async function (email, name, role, password) {
  // validation
  if (!name || !email || !password) {
    throw Error("All Fields must be filled");
  } else if (password.length < 3) {
    throw Error("password too short");
  } else if (!validator.isEmail(email)) {
    throw Error("Not a valid Email");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("User already exists");
  }

  const user = await this.create({
    name,
    email,
    role,
    password,
  });

  return user;
};

//static login method
UsersSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All Fields must be filled");
  }

  // check is user exists
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User does not exist");
  }

  const match = password === user.password;
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

// Create Mongoose model
const UsersModel = mongoose.model("User", UsersSchema);
module.exports = UsersModel;
