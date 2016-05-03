'use strict';

module.exports = function(app) {
  app.factory('ScoreService', ['$http', function($http) {
    const mainRoute = "http://localhost:3000/api/";

    var scoreService = {};

    scoreService.createScore = function(userId) {
      return $http.post(mainRoute + '/users/' + userId + '/scores', data);
    };

    scoreService.getScores = function(data) {
      return $http.get(mainRoute + '/users/' + data.userId + '/scores')
    };

    scoreService.getScore = function(data) {
      return $http.get(mainRoute + '/users/' + data.userId + '/scores/' + data.scoreId);
    };

    scoreService.updateScore = function(data) {
      return $http.put(mainRoute + '/users/' + data.userId + '/scores/' + data.scoreId, data);
    };

    scoreService.resetScore = function(data) {
      return $http.delete(mainRoute + '/users/' + data.userId + '/scores/' + data.scoreId);
    };

    return scoreService;
  }]);
};