const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: { type: String, required: true },
  answers: [{ type: String }], // Array of answers to this question
});

const SurveySchema = new Schema(
  {
    title: { type: String, required: true },
    questions: [QuestionSchema], // Array of questions with answers
  },
  { timestamps: true }
);

const SurveyModel = mongoose.model("Survey", SurveySchema);

module.exports = SurveyModel;
