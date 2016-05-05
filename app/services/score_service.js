'use strict';

module.exports = function(app) {
  app.factory('ScoreService', ['$http', 'AuthService', function($http, AuthService) {
    const mainRoute = "http://localhost:3000/api";
    let scoreId;
    let scoreService = {};

    scoreService.createScore = function(data) {
      return $http.post(mainRoute + '/users/' + data.userId + '/scores', data)
      .then((res)=>{
        console.log(res)
      });
    };

    scoreService.getScores = function(userId) {
      return $http.get(mainRoute + '/users/' + userId + '/scores', {
        headers: {
          token: AuthService.getToken()
        }
      })
    };

    scoreService.getScore = function(data) {
      return $http.get(mainRoute + '/users/' + data.userId + '/scores/' + data.scoreId, {
        headers: {
          token: AuthService.getToken()
        }
      }).then((res)=>{
        console.log(res)
      });
    };

    scoreService.getScoreId = function(data) {
      return $http.get(mainRoute + '/users/' + data.userId + '/scores?category=' + data.category + '&difficulty=' + data.difficulty, {
        headers: {
          token: AuthService.getToken()
        }
      });
    }

    scoreService.updateScore = function(data) {
      return $http.put(mainRoute + '/users/' + data.userId + '/scores/' + data.scoreId, data, {
        headers: {
          token: AuthService.getToken()
        }
      }).then((res)=>{
        console.log(res)
      });
    };

    scoreService.resetScore = function(data) {
      return $http.delete(mainRoute + '/users/' + data.userId + '/scores/' + data.scoreId, {
        headers: {
          token: AuthService.getToken()
        }
      });
    };

    return scoreService;
  }]);
};
