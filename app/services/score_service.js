'use strict';

module.exports = function(app) {
  app.factory('ScoreService', ['$http', 'AuthService','$window', function($http, AuthService, $window) {
    const mainRoute = "http://localhost:3000/api";
    var scoreId;
    var scoreService = {};

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
      })
    };

    scoreService.getScore = function(data, cb) {
      cb || function(){};
      return $http.get(mainRoute + '/users/' + data.userId + '/scores/' + data.scoreId, {
        headers: {
          token: AuthService.getToken()
        }
      }).then((res)=>{
        console.log(res)
        cb(null, res)
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
      return $http.put(mainRoute + '/users/' + data.userId + '/scores/' + scoreId, data, {
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

    scoreService.getId = function(){
      return scoreId;
    }

    return scoreService;
  }]);
};
