'use strict';

module.exports = (router, models) => {
  let Question = models.Question;
  let jwtAuth = require(__dirname + '/../lib/jwtAuth.js');

  router.route('/questions')
    .get((req, res) => {
      Question.find({category: req.query.category, difficulty:req.query.difficulty}, (err, questions)=>{
        if(err){
          return res.json({message: err});
        }
        res.status(200).json({message: 'All Questions', data: questions});
      });
    })
    .post(jwtAuth, (req, res) => {
      let newQuestion = new Question(req.body);
      newQuestion.save((err, question)=>{
        if(err){
          return res.json({message: err});
        }
        res.status(200).json({message: 'Created Question', data: question});
      });
    });

  router.route('/questions/:question')
    .get((req, res) => {
      Question.findOne({_id: req.params.question}, (err, question)=>{
        if(err){
          return res.json({message: err});
        }
        res.status(200).json({message: 'Get Question', data: question});
      });
    })
    .put(jwtAuth, (req, res) => {
      Question.findOneAndUpdate({_id: req.params.question}, {$set: req.body }, {new: true}, (err, data)=>{
        if(err){
          return res.json({message: err});
        }
        res.status(200).json({message: 'Modified Question', data: data });
      });
    })
    .delete(jwtAuth, (req, res) => {
      Question.findOneAndRemove({_id: req.params.question}, (err, data)=>{
        if(err){
          return res.json({message: err});
        }
        res.status(200).json({message: 'Deleted Question', data: data});
      });
    });
};
