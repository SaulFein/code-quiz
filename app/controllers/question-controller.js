'use strict';
module.exports = function(app) {
  app.controller('QuestionController',['$http','$window','$location','AuthService', function($http, $window, $location, AuthService){
    let url = 'http://localhost:3000/api/questions';
    this.allQuestions = $window.localStorage.allQuestions ? JSON.parse($window.localStorage.allQuestions) : [];
    this.catQuestions = $window.localStorage.catQuestions ? JSON.parse($window.localStorage.catQuestions) : [];
    this.currentPlace = $window.localStorage.currentPlace ? JSON.parse($window.localStorage.currentPlace) : {};
    this.showNextButton;
    this.count = $window.localStorage.count || 0 ; // show {{question[questionCtrl.count]}}
    this.curQuestion = this.catQuestions[this.count];
    this.answers = this.curQuestion ? this.curQuestion.choices : null;

    this.getQuestions = function(){
      if(!this.allQuestions.length)
      $http.get(url)
        .then((res) => {
          this.allQuestions = res.data.data;
          console.log(this.allQuestions)
          $window.localStorage.allQuestions = JSON.stringify(this.allQuestions)
        })
    }

    this.getCategory = function(category){
      if(!this.catQuestions.length)
      if (category == 'All') return this.catQuestions = this.allQuestions;
      this.catQuestions = this.allQuestions.filter((q) => {
        return q.category == category;
      })
      $window.localStorage.catQuestions = JSON.stringify(this.catQuestions)
      this.currentPlace['category'] = category;
      $window.localStorage.currentPlace = JSON.stringify(this.currentPlace)
    }

    this.getDifficulty = function(difficulty){
      this.catQuestions = this.catQuestions.filter((q) => {
        return q.difficulty == difficulty
      })
      $window.localStorage.catQuestions = JSON.stringify(this.catQuestions)
      this.currentPlace['difficulty'] = difficulty;
      $window.localStorage.currentPlace = JSON.stringify(this.currentPlace)
    }

    this.newQuestion = function(){
      if (this.count < this.catQuestions.length - 1) {
        this.count += 1;
        $window.localStorage.count = this.count;
      } else {
        console.log('done')
        this.count = null;
        $location.path('/results')
      }
    }

    this.getAnswer = function(answer){
      if(answer == this.curQuestion.answer) {
        console.log('correct')
      } else {
        console.log('in-corr-ect')
      }
      this.showNextButton = true;
    }

    this.submit = function(q){
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

    this.resetQuestions = function(){
      this.count = this.$window.localStorage.count = 0;
    }

  }])
}
