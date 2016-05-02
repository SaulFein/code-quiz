module.exports = function(app) {
  app.controller('QuestionController',['$http', function($http){
    let url = 'http://localhost:3000/api/questions'
    this.allQuestions = ['dumb']

    this.getQuestions = function(){
      $http.get(url)
        .then((res) => {
          console.log(res)
        })
    }

  }])
}
