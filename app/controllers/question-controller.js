'use strict';
module.exports = function(app) {
  app.controller('QuestionController',['$http','$window','$location','AuthService','ScoreService', function($http, $window, $location, AuthService, ScoreService){
    let url = 'http://localhost:3000/api/questions';
    let vm = this;
    vm.allQuestions = $window.localStorage.allQuestions ? JSON.parse($window.localStorage.allQuestions) : [];
    vm.catQuestions = $window.localStorage.catQuestions ? JSON.parse($window.localStorage.catQuestions) : [];
    // vm.scoreData = $window.localStorage.scoreData ? JSON.parse($window.localStorage.scoreData) : {
    //   category: null,
    //   difficulty: null,
    //   userId: AuthService.getId(),
    //   totalQuestions: vm.catQuestions.length,
    //   questionsCorrect: 0,
    //   questionsWrong: this.totalQuestions-this.questionsCorrect,
    // };
    vm.scoreData = {
      category: null,
      difficulty: null,
      userId: AuthService.getId(),
      totalQuestions: vm.catQuestions.length,
      questionsCorrect: 0,
      questionsWrong: 0,
    };
    vm.showNextButton;
    vm.count = $window.localStorage.count || 0;
    vm.curQuestion = vm.catQuestions[vm.count];
    vm.answers = vm.curQuestion ? vm.curQuestion.choices : null;


    vm.getQuestions = function(){
      if(!vm.allQuestions.length)
      $http.get(url)
        .then((res) => {
          vm.allQuestions = res.data.data;
          console.log(vm.allQuestions)
          $window.localStorage.allQuestions = JSON.stringify(vm.allQuestions)
        })
    }

    vm.getCategory = function(category){
      if(!vm.catQuestions.length)
      if (category == 'All') return vm.catQuestions = vm.allQuestions;
      vm.catQuestions = vm.allQuestions.filter((q) => {
        return q.category == category;
      })
      $window.localStorage.catQuestions = JSON.stringify(vm.catQuestions)
      vm.scoreData.category = category;
      // $window.localStorage.scoreData = JSON.stringify(vm.scoreData)
    }

    vm.getDifficulty = function(difficulty){
      vm.catQuestions = vm.catQuestions.filter((q) => {
        return q.difficulty == difficulty
      })
      $window.localStorage.catQuestions = JSON.stringify(vm.catQuestions)
      vm.scoreData.difficulty = difficulty; //does not work
      // $window.localStorage.scoreData = JSON.stringify(vm.scoreData)
    }

    vm.newQuestion = function(){
      console.log(vm.curQuestion)
      if (vm.count < vm.catQuestions.length - 1) {
        vm.count ++;
        $window.localStorage.count = vm.count;
        vm.curQuestion = vm.catQuestions[vm.count];
        vm.answers = vm.curQuestion.choices;
      } else {
        console.log('done')
        vm.count = $window.localStorage.count = 0;
        $location.path('/results')
      }
            console.log(vm.curQuestion)
    }

    vm.getAnswer = function(answer){
      if(answer == vm.curQuestion.answer) {
        console.log('correct');
        vm.scoreData.questionsCorrect ++;
      } else {
        console.log('in-corr-ect');
        vm.scoreData.questionsWrong ++;
      }
      console.log(vm.scoreData)
      ScoreService.updateScore(vm.scoreData) /// make data object from info
      vm.showNextButton = true;
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

    vm.resetQuestions = function(){
      vm.count = $window.localStorage.count = 0;

    }

  }])
}
