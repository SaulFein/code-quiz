// 'use strict';
// module.exports = function(app) {
//   app.controller('QuestionController',['$http','$window','$location','AuthService','ScoreService', function($http, $window, $location, AuthService, ScoreService){
//     let url = 'http://localhost:3000/api/questions';
//     let vm = this;
//     vm.allQuestions = $window.localStorage.allQuestions ? JSON.parse($window.localStorage.allQuestions) : [];
//     vm.catQuestions = $window.localStorage.catQuestions ? JSON.parse($window.localStorage.catQuestions) : [];
//     // vm.scoreData = $window.localStorage.scoreData ? JSON.parse($window.localStorage.scoreData) : {
//     //   category: null,
//     //   difficulty: null,
//     //   userId: AuthService.getId(),
//     //   totalQuestions: vm.catQuestions.length,
//     //   questionsCorrect: 0,
//     //   questionsWrong: this.totalQuestions-this.questionsCorrect,
//     // };
//     // vm.scoreData = {
//     //   category: $window.localStorage.category,
//     //   difficulty: $window.localStorage.difficulty,
//     //   userId: AuthService.getId(),
//     //   totalQuestions: vm.catQuestions.length,
//     //   questionsCorrect: 0,
//     //   questionsWrong: 0,
//     //   completedQuestions: 0,
//     // };
//
//     vm.scoreData = {
//       userId: AuthService.getId(),
//       totalQuestions: vm.catQuestions.length,
//       category: $window.localStorage.category ? JSON.parse($window.localStorage.category) : null,
//       difficulty: $window.localStorage.difficulty ? JSON.parse($window.localStorage.difficulty) : null,
//       questionsCorrect: $window.localStorage.correct ? $window.localStorage.correct : 0,
//       completedQuestions: $window.localStorage.count ? $window.localStorage.count : 0,
//       questionsWrong: $window.localStorage.wrong ? $window.localStorage.wrong : 0,
//     };
//
//     vm.showNextButton;
//     vm.count = vm.scoreData.completedQuestions || 0;
//     vm.curQuestion = vm.catQuestions[vm.count];
//     vm.answers = vm.curQuestion ? vm.curQuestion.choices : null;
//
//     vm.getPosition = function(){
//       $http.get('http://localhost:3000/api/users/' + AuthService.getId(), {
//         headers: {
//           token: AuthService.getToken()
//         }
//       })
//       .then((res)=>{
//         console.log(res.data.data.position)
//         if(res.data.data.position){
//           vm.scoreData = res.data.data.position;
//         }
//       })
//     }
//
//     vm.resume = function(){
//       console.log(vm.scoreData)
//       vm.getCategory(vm.scoreData.category)
//       vm.getDifficulty(vm.scoreData.difficulty)
//       $window.localStorage.count = vm.count = vm.scoreData.completedQuestions;
//       $window.localStorage.wrong = vm.scoreData.questionsWrong;
//       $window.localStorage.correct = vm.scoreData.questionsCorrect;
//       console.log('scoreDetta', vm.scoreData)
//     }
//
//     vm.getQuestions = function(){
//       console.log(vm.count)
//       if(!vm.allQuestions.length)
//       $http.get(url)
//         .then((res) => {
//           vm.allQuestions = res.data.data;
//           console.log(vm.allQuestions)
//           $window.localStorage.allQuestions = JSON.stringify(vm.allQuestions)
//         })
//     }
//
//     vm.getCategory = function(category){
//       if(!vm.catQuestions.length)
//       if (category == 'All') return vm.catQuestions = vm.allQuestions;
//       vm.catQuestions = vm.allQuestions.filter((q) => {
//         return q.category == category;
//       })
//       $window.localStorage.catQuestions = JSON.stringify(vm.catQuestions)
//       $window.localStorage.category = JSON.stringify(category)
//     }
//
//     vm.getDifficulty = function(difficulty){
//       vm.catQuestions = vm.catQuestions.filter((q) => {
//         return q.difficulty == difficulty
//       })
//       $window.localStorage.catQuestions = JSON.stringify(vm.catQuestions)
//       $window.localStorage.difficulty = JSON.stringify(difficulty)
//       ScoreService.createScore(vm.scoreData)
//     }
//
//     vm.newQuestion = function(){
//       console.log(vm.curQuestion)
//       if (vm.count < vm.catQuestions.length - 1) {
//         vm.count ++;
//         $window.localStorage.count = vm.count;
//         vm.curQuestion = vm.catQuestions[vm.count];
//         vm.answers = vm.curQuestion.choices;
//       } else {
//         console.log('done')
//         vm.updatePos({position:{}})
//         vm.count = $window.localStorage.count = 0;
//         vm.scoreData.completedQuestions = 0;
//         $window.localStorage.wrong = 0;
//         $window.localStorage.correct = 0;
//         $location.path('/results')
//       }
//     }
//
//     vm.getAnswer = function(answer){
//       if(answer == vm.curQuestion.answer) {
//         console.log('correct');
//         vm.scoreData.questionsCorrect ++;
//         $window.localStorage.correct = vm.scoreData.questionsCorrect;
//       } else {
//         console.log('in-corr-ect');
//         vm.scoreData.questionsWrong ++;
//         $window.localStorage.wrong = vm.scoreData.questionsWrong;
//       }
//       vm.scoreData.completedQuestions ++;
//       console.log(vm.scoreData)
//       vm.showNextButton = true;
//       console.log('atUpdat', vm.scoreData)
//       vm.updatePos({position: vm.scoreData});
//       // ScoreService.updateScore(vm.scoreData) /// make data object from info
//     }
//
//     vm.updatePos = function(data){
//       $http.put('http://localhost:3000/api/users/' + AuthService.getId(), data, {
//         headers: {
//           token: AuthService.getToken()
//         }
//       }).then((res)=>{
//         console.log('updated position ', res.data.data.position)
//       })
//     }
//
//     vm.submit = function(q){
//       q.choices = [q.choices[0],q.choices[1],q.choices[2],q.choices[3]];
//       $http.post(url, q, {
//         headers: {
//           token: AuthService.getToken()
//         }
//       })
//       .then((res) => {
//         console.log(res)
//       })
//     }
//
//     vm.resetQuestions = function(){
//       vm.count = $window.localStorage.count = 0;
//
//     }
//
//   }])
// }
'use stict';
module.exports = function(app){
  app.controller('QuestionController',['$http','$window','$location','AuthService','ScoreService', function($http, $window, $location, AuthService, ScoreService){
    let url = 'http://localhost:3000/api/questions';
    let vm = this;
    vm.allQuestions = [];

    vm.scoreData = {
      userId: AuthService.getId(),
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

    // vm.getPosition = function(data){
    //   ScoreService.getScore(data, (err, res) => {
    //     console.log(res)
    //   })
    // }

    vm.getCategory = function(cat){
      console.log( cat)
      $window.localStorage.cat = vm.category = cat;
      $location.path('/difficulty')
    }

    vm.getDifficulty = function(dif){
      console.log(dif)
      $window.localStorage.dif = vm.difficulty = dif;
      $location.path('/game')
    }

    vm.getQuestions = function(){
      vm.category = vm.scoreData.category = $window.localStorage.cat;
      vm.difficulty = vm.scoreData.difficulty = $window.localStorage.dif;
      if(!vm.allQuestions.length)
      $http.get(url + '?category=' + vm.category + '&difficulty=' + vm.difficulty)
        .then((res) => {
          vm.allQuestions = res.data.data;
          vm.curQuestion = vm.allQuestions[vm.scoreData.completedQuestions];
          vm.answers = vm.curQuestion.choices
          vm.createScore();
        })
    }

    vm.createScore = function(){
      ScoreService.createScore(vm.scoreData)
    }

    vm.getAnswer = function(answer){
      if(answer == vm.curQuestion.answer) {
        vm.scoreData.questionsCorrect ++;
      } else {
        console.log('in-corr-ect');
        vm.scoreData.questionsWrong ++;
      }
      vm.scoreData.completedQuestions ++;
      vm.showNextButton = true;
      console.log(vm.scoreData)
      console.log('atUpdat', vm.scoreData)
      vm.updateScore(vm.scoreData);
    }

    vm.updateScore = function(data){
      ScoreService.updateScore(data, ScoreService.getId())
    }

    vm.newQuestion = function(){
      console.log(vm.curQuestion)
      if (vm.count < vm.allQuestions.length - 1) {
        vm.scoreData.completedQuestions ++
        vm.curQuestion = vm.allQuestions[vm.scoreData.completedQuestions];
        vm.answers = vm.curQuestion.choices;
      } else {
        vm.reset();
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
      vm.scoreData.completedQuestions = 0;
      vm.scoreData.wrong = 0;
      vm.scoreData.correct = 0;
      $location.path('/results')
    }
  }])
}
