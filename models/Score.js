'use strict';

module.exports = (mongoose, models) => {
  let ScoreSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    category: String,
    difficulty: String,
    totalQuestions: Number,
    completedQuestions: Number,
    questionsCorrect: Number,
    questionsWrong: Number
  });

  let Score = mongoose.model('Score', ScoreSchema);
  models.Score = Score;
};
