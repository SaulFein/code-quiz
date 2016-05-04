'use strict';

module.exports = (router, models) => {
  let Score = models.Score;
  let User = models.User;
  let jwtAuth = require(__dirname + '/../lib/jwtAuth.js');

  router.route('/users/:user/scores')
    .get(jwtAuth, (req, res) => {
      if (!Object.keys(req.query).length) {
        Score.find({userId: req.params.user}, (err, scores) => {
          if (err) {
            return res.send(err);
          }
          res.status(200).json({message: 'Returned All Scores', data: scores});
        });
      } else {
        Score.find({userId: req.params.user, category: req.query.category, difficulty: req.query.difficulty}, (err, scores) => {
          if (err) {
            return res.send(err);
          }
          res.status(200).json({message: 'Returned ScoreId', data: {scoreId: scores[0]._id}});
        });
      }
    })
    .post((req, res) => {
      let newScore = new Score(req.body);
      newScore.userId = req.params.user;
      newScore.save((err, score) => {
        if (err) {
          return res.json({message: 'Error Saving New Score', error: err});
        }
        User.findByIdAndUpdate(req.params.user, {$push: {scores: score._id}}, {new: true}, (err, user) => {
          console.log(user);
        });
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
