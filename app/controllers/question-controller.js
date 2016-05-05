'use stict';
module.exports = function(app){
  app.controller('QuestionController',['$http','$window','$location','AuthService','ScoreService', function($http, $window, $location, AuthService, ScoreService){

    let url = 'http://localhost:3000/api/questions';
    let vm = this;
    vm.correct = 0;
    vm.allQuestions = [];

    vm.selected = 5;
    vm.itemClicked = function($index) {
      vm.selected = $index;
    }

    vm.scoreData = {
      userId: $window.localStorage.user,
      totalQuestions: vm.allQuestions.length,
      category: null,
      difficulty:null,
      questionsCorrect: 0,
      completedQuestions:0,
      questionsWrong: 0,
    }

    vm.showNextButton;
    vm.count = vm.scoreData.completedQuestions || 0;
    vm.curQuestion = vm.allQuestions[vm.scoreData.completedQuestions];
    vm.answers = vm.curQuestion ? vm.curQuestion.choices : null;

    vm.difficulty = '';
    vm.category = '';

    vm.getPosition = function(data){
        console.log('getpost data: ', data)
        vm.scoreData = data;
        $window.localStorage.scoreId = data._id;
        vm.category = vm.scoreData.category = $window.localStorage.cat;
        vm.difficulty = vm.scoreData.difficulty = $window.localStorage.dif;
        vm.getQuestions(data)
    }

    vm.getCategory = function(cat){
      console.log( cat)
      vm.reset();
      $window.localStorage.cat = vm.category = cat;
      $location.path('/difficulty')
    }

    vm.getDifficulty = function(dif){
      console.log(dif)
      $window.localStorage.dif = vm.difficulty = dif;
      vm.getQuestions(vm.scoreData);
    }

    vm.getQuestions = function(data){
      vm.scoreData = data;
      console.log('data!!!',data)
      vm.category = vm.scoreData.category = $window.localStorage.cat;
      vm.difficulty = vm.scoreData.difficulty = $window.localStorage.dif;

      $http.get(url + '?category=' + vm.category + '&difficulty=' + vm.difficulty)
        .then((res) => {
          vm.allQuestions = res.data.data;
          console.log(vm.allQuestions)
          vm.scoreData.totalQuestions = vm.allQuestions.length;
          vm.curQuestion = vm.allQuestions[vm.scoreData.completedQuestions];
          vm.answers = vm.curQuestion.choices
          console.log(vm.allQuestions)
          console.log(vm.curQuestion)
          console.log(vm.answers)
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

    vm.getAnswer = function(answer){
      if(answer == vm.curQuestion.answer) {
        vm.correct = 1;
        vm.scoreData.questionsCorrect ++;
      } else {
        vm.correct = 2;
        vm.scoreData.questionsWrong ++;
      }
      vm.scoreData.completedQuestions ++;
      vm.showNextButton = true;
      console.log('THIS HAPPENED')
      console.log(vm.scoreData.completedQuestions)
      vm.updateScore(vm.scoreData);
    }

    vm.updateScore = function(data){
      ScoreService.updateScore(data, ScoreService.getId())
    }

    vm.newQuestion = function(){
      vm.correct = 0;
      vm.selected = 5;
      if (vm.scoreData.completedQuestions <= vm.allQuestions.length - 1) {
        vm.curQuestion = vm.allQuestions[vm.scoreData.completedQuestions];
        vm.answers = vm.curQuestion.choices;
      } else {
        vm.reset();
        $location.path('/results')
      }
    }

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
  }])
}
