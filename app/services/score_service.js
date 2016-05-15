'use strict';

module.exports = function(app) {
  app.factory('ScoreService', ['$http', 'AuthService','$window', function($http, AuthService, $window) {
    const mainRoute = "http://localhost:3000/api";
    let scoreId;
    let scoreService = {};

    scoreService.score = null;

    scoreService.createScore = function(data) {
      return $http.post(mainRoute + '/users/' + data.userId + '/scores', data)
      .then((res)=>{
        scoreId = $window.localStorage.scoreId = res.data.data._id;
        console.log(res);
      });
    };

    scoreService.getScores = function(userId) {
      return $http.get(mainRoute + '/users/' + userId + '/scores', {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    scoreService.getScore = function(data) {
      $http.get(mainRoute + '/users/' + data.userId + '/scores/' + data.scoreId, {
        headers: {
          token: AuthService.getToken()
        }
      }).then((res) => {
        console.log(res)
        return res.data.data;
      });
    };

    scoreService.getScoreId = function(data) {
      return $http.get(mainRoute + '/users/' + data.userId + '/scores?category=' + data.category + '&difficulty=' + data.difficulty, {
        headers: {
          token: AuthService.getToken()
        }
      });
    }

    scoreService.updateScore = function(data, scoreId) {
      console.log(scoreId)
      $window.localStorage.data = JSON.stringify(data);
      return $http.put(mainRoute + '/users/' + data.userId + '/scores/' + scoreId, data, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    scoreService.resetScore = function(data) {
      return $http.delete(mainRoute + '/users/' + data.userId + '/scores/' + data.scoreId, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    scoreService.getId = function(){
      return $window.localStorage.scoreId || scoreId;
    }

    return scoreService;
  }]);
};
