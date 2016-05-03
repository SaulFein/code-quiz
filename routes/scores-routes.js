'use strict';

module.exports = (router, models) => {
  let Score = models.Score;
  let jwtAuth = require(__dirname + '/../lib/jwtAuth.js');

  router.route('/users/:user/scores')
    .get(jwtAuth, (req, res) => {
      Score.find({userId: req.params.user}, (err, scores) => {
        if (err) {
          return res.send(err);
        }
        res.status(200).json({message: 'Returned All Scores', data: scores});
      });
    })
    .post((req, res) => {
      var newScore = new Score(req.body);
      newScore.userId = req.params.user;
      newScore.category = req.body.category;
      newScore.difficulty = req.body.difficulty;
      newScore.totalQuestions = req.body.totalQuestions;
      newScore.completedQuestions = req.body.completedQuestions;
      newScore.questionsCorrect = req.body.questionsCorrect;
      newScore.questionsWrong = req.body.questionsWrong;

      newScore.save((err, score) => {
        if (err) {
          return res.json({message: 'Error Saving New Score', error: err});
        }
        res.status(200).json({message: 'Created Score', data: score});
      });
    });

  router.route('/users/:user/scores/:score')
    .get(jwtAuth, (req, res) => {
      Score.findById(req.params.score, (err, score) => {
        if (err) {
          return res.send(err);
        }
        res.status(200).json({message: 'Returned Score', data: score});
      });
    })
    .put(jwtAuth, (req, res) => {
      Score.findByIdAndUpdate(req.params.score, req.body, {new: true}, (err, score) => {
        if (err) {
          return res.send(err);
        }
        res.status(200).json({message: 'Updated Score', data: score});
      });
    })
    .delete(jwtAuth, (req, res) => {
      Score.findByIdAndRemove(req.params.score, (err, score) => {
        res.status(200).json({message: 'Deleted Score', data: score});
      });
    });
};
