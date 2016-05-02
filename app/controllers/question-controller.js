module.exports = function(app) {
  app.controller('QuestionController',['$http','$window', function($http, $window){
    let url = 'http://localhost:3000/api/questions'
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
      this.currentPlace.category = category;
    }

    this.getDifficulty = function(difficulty){
      this.catQuestions = this.catQuestions.filter((q) => {
        return q.difficulty == difficulty
      })
      this.currentPlace.difficulty = difficulty;
    }

    this.newQuestion = function(){
      if (this.count < this.catQuestions.length) {
        this.count += 1;
        $windowStorage.localStorage.count = this.count;
      } else {
        console.log('done')
        //route to results page
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
    this.resetQuestions = function(){
      this.count = this.$window.localStorage.count = 0;
    }

  }])
}
