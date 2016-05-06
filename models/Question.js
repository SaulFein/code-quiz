'use strict';

module.exports = (mongoose, models) => {
  let QuestionSchema = mongoose.Schema({
    question: {
      type: String,
      required: true,
      unique: true
    },
    choices: Array,
    answer: String,
    category: String,
    difficulty: String
  });

  let Question = mongoose.model('Question', QuestionSchema);
  models.Question = Question;
};
