'use stict';
module.exports = function(app){
  app.controller('QuestionController',['$http','$window','$location','AuthService','ScoreService', function($http, $window, $location, AuthService, ScoreService){

    let url = 'https://localhost:3000/api/questions';
    let vm = this;
    vm.correct = 0;
    vm.allQuestions = [];

    vm.scoreData = {};

    vm.showNextButton;
    vm.count = vm.scoreData.completedQuestions || 0;
    vm.curQuestion = vm.allQuestions[vm.scoreData.completedQuestions];
    vm.answers = vm.curQuestion ? vm.curQuestion.choices : null;

    vm.difficulty = '';
    vm.category = '';
    vm.selectedAns = 5;

    //adds class giving color to selected answer indicating right/wrong
    vm.itemClicked = function($index) {
      if(vm.selectedAns !== 5) return
      vm.selectedAns = $index;
    }

    vm.results = function(){
      vm.selectedAns = 5;
      $location.path('/results');
    }

    //called when continuing quiz from profile page, brings back previous position in a given quiz
    vm.getPosition = function(data){
        console.log('getpost data: ', data)
        vm.scoreData = data;
        $window.localStorage.scoreId = data._id;
        vm.category = vm.scoreData.category;
        vm.difficulty = vm.scoreData.difficulty;
        vm.getQuestions(data)
    }

    //sets category/resets scoreData object to allow for new score to be saved
    vm.getCategory = function(cat){
      vm.reset();
      vm.scoreData.category = vm.category = cat;
      $location.path('/difficulty')
    }

    vm.getDifficulty = function(dif){
      vm.scoreData.difficulty = vm.difficulty = dif;
      vm.getQuestions(vm.scoreData);
    }

    //gets questions based on category/difficulty selected or from previous quiz
    vm.getQuestions = function(data){
      vm.scoreData = data;
      console.log('data!!!',data)

      $http.get(url + '?category=' + vm.category + '&difficulty=' + vm.difficulty)
        .then((res) => {
          vm.allQuestions = res.data.data;
          console.log(vm.allQuestions)
          vm.scoreData.totalQuestions = vm.allQuestions.length;
          vm.curQuestion = vm.allQuestions[vm.scoreData.completedQuestions];
          vm.answers = vm.curQuestion.choices
          if (!vm.scoreData._id) {
            console.log('CREATING SCORE')
            vm.createScore();
          }
        })
      $location.path('/game')
    }

    vm.createScore = function(){
      console.log(vm.scoreData)
      ScoreService.createScore(vm.scoreData)
    }

    //increments scoreData, updates score on db
    vm.getAnswer = function(answer){
      if (vm.correct) return
      if(answer == vm.curQuestion.answer) {
        vm.correct = 1;
        vm.scoreData.questionsCorrect ++;
      } else {
        vm.correct = 2;
        vm.scoreData.questionsWrong ++;
      }
      vm.scoreData.completedQuestions ++;
      vm.showNextButton = true;
      console.log(vm.scoreData.completedQuestions)
      vm.updateScore(vm.scoreData);
    }

    vm.updateScore = function(data){
      ScoreService.updateScore(data, ScoreService.getId())
    }

    vm.newQuestion = function(){
      vm.correct = 0;
      vm.selectedAns = 5;
      if (vm.scoreData.completedQuestions <= vm.allQuestions.length - 1) {
        vm.curQuestion = vm.allQuestions[vm.scoreData.completedQuestions];
        vm.answers = vm.curQuestion.choices;
      } else {
        vm.reset();
        $location.path('/results')
      }
    }

    //used to populate db
    vm.submit = function(q){
      q.choices = [q.choices[0],q.choices[1],q.choices[2],q.choices[3]];
      $http.post(url, q, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then((res) => {
        console.log(res)
      })
    }

    vm.reset = function(){
      vm.scoreData = {
        userId: $window.localStorage.user,
        totalQuestions: vm.allQuestions.length,
        category: null,
        difficulty:null,
        questionsCorrect: 0,
        completedQuestions:0,
        questionsWrong: 0,
      }
    }

    vm.getScore = function() {
      let data = {
        userId: AuthService.getId(),
        scoreId: $window.localStorage.scoreId
      };
      ScoreService.getScore(data)
        .then(function(res) {
          vm.result = res.data.data;
        }, function(err) {
          console.log(err);
        });
    }
  }])
}
