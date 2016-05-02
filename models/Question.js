'use strict';

module.exports = (mongoose, models) => {
  let QuestionSchema = mongoose.Schema({
    question: String,
    choices: Array,
    answer: String,
    category: String,
    difficulty: String,
    rating: Number
  });

  let Question = mongoose.model('Question', QuestionSchema);
  models.Question = Question;
};
