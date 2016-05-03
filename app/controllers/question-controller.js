'use strict';
module.exports = function(app) {
  app.controller('QuestionController',['$http','$window','$location','AuthService', function($http, $window, $location, AuthService){
    let url = 'http://localhost:3000/api/questions';
    let vm = this;
    vm.allQuestions = $window.localStorage.allQuestions ? JSON.parse($window.localStorage.allQuestions) : [];
    vm.catQuestions = $window.localStorage.catQuestions ? JSON.parse($window.localStorage.catQuestions) : [];
    vm.currentPlace = $window.localStorage.currentPlace ? JSON.parse($window.localStorage.currentPlace) : {};
    vm.showNextButton;
    // vm.correct = $window.localStorage.correct || 0;
    vm.count = $window.localStorage.count || 0;
    // vm.score = vm.correct/vm.score || 0;
    vm.curQuestion = vm.catQuestions[vm.count];
    vm.answers = vm.curQuestion ? vm.curQuestion.choices : null;

    vm.getQuestions = function(){
      console.log(vm.curQuestion)
      console.log(vm.count)
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
      vm.currentPlace['category'] = category;
      $window.localStorage.currentPlace = JSON.stringify(vm.currentPlace)
    }

    vm.getDifficulty = function(difficulty){
      vm.catQuestions = vm.catQuestions.filter((q) => {
        return q.difficulty == difficulty
      })
      $window.localStorage.catQuestions = JSON.stringify(vm.catQuestions)
      vm.currentPlace['difficulty'] = difficulty;
      $window.localStorage.currentPlace = JSON.stringify(vm.currentPlace)
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
        console.log('correct')
      } else {
        console.log('in-corr-ect')
      }
      console.log(vm.count)
      vm.showNextButton = true;
    }

    vm.submit = function(q){
      q.choices = [q.choices[0],q.choices[1],q.choices[2],q.choices[3]]
      console.log(q)
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
      vm.currentPlace = $window.localStorage.currentPlace = {}
    }

  }])
}
