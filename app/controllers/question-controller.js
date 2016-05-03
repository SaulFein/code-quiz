'use strict';
module.exports = function(app) {
  app.controller('QuestionController',['$http','$window','$location', function($http, $window, $location){
    let url = 'http://localhost:3000/api/questions'
    this.allQuestions = []
    this.catQuestions = []
    this.allQuestions = $window.localStorage.allQuestions ? JSON.parse($window.localStorage.allQuestions) : [];
    this.catQuestions = $window.localStorage.catQuestions ? JSON.parse($window.localStorage.catQuestions) : [];
    this.showNextButton;
    this.count = $window.localStorage.count || 0 ; // show {{question[questionCtrl.count]}}
    this.curQuestion = this.catQuestions[this.count];
    this.answers = this.curQuestion ? this.curQuestion.choices : null;
    this.currentPlace = $window.localStorage.currentPlace ? JSON.parse($window.localStorage.currentPlace) : {};

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
      console.log(category)
      this.catQuestions = this.allQuestions.filter((q) => {
        console.log(q)
        console.log('qcat ',q.category)
        console.log('cat', category)
        return q.category == category;
      })
      console.log(this.catQuestions)
      console.log(this.allQuestions)
      $window.localStorage.catQuestions = JSON.stringify(this.catQuestions)
      this.currentPlace['category'] = category;
      console.log(this.currentPlace)
    }

    this.getDifficulty = function(difficulty){
      this.catQuestions = this.catQuestions.filter((q) => {
        return q.difficulty == difficulty
      })
      $window.localStorage.catQuestions = JSON.stringify(this.catQuestions)
      this.currentPlace['difficulty'] = difficulty;
      console.log(this.currentPlace)
      console.log(this.catQuestions)
      console.log(this.allQuestions)
    }

    this.newQuestion = function(){
      if (this.count < this.catQuestions.length - 1) {
        this.count += 1;
        $window.localStorage.count = this.count;
      } else {
        console.log('done')
        this.count = null;
        $location.path('/results')
        //route to results page
      }
    }

    this.getAnswer = function(answer){
      if(answer == this.curQuestion.answer) {
        console.log('correct')
      } else {
        console.log(this.answers)
        console.log(answer)
        console.log(this.curQuestion)
        console.log('in-corr-ect')
      }
      this.showNextButton = true;
    }
    this.resetQuestions = function(){
      this.count = this.$window.localStorage.count = 0;
    }

  }])
}
