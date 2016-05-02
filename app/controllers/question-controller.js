module.exports = function(app) {
  app.controller('QuestionController',['$http', function($http){
    let url = 'http://localhost:3000/api/questions'
    this.allQuestions = [];
    this.catQuestions = [];

    this.getQuestions = function(){
      $http.get(url)
        .then((res) => {
          this.allQuestions = res.data.data;
          console.log(res.data.data)
          console.log('made it here?')
        })
    }
    this.getCategory = function(category){
      this.catQuestions = this.allQuestions.filter((q) => {
        return q.category == category;
      })
    }
    this.getDifficulty = function(difficulty){
      this.catQuestions = this.catQuestions.filter((q) => {
        return q.difficulty == difficulty
      })
    }

  }])
}
