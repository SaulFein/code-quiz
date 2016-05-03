module.exports = function(app) {
  app.factory('ScoreService', ['$http', function($http) {
    const mainRoute = "http://localhost:3000/api/";

    var scoreService = {};

    scoreService.createScore = function(userId) {
      return $http.post(mainRoute + '/users/' + userId + '/scores');
    };

    scoreService.getAllScores = function(userId) {
      return $http.get(mainRoute + '/users/' + userId + '/scores')
    };

    scoreService.getScore = function(userId, scoreId) {
      return $http.get(mainRoute + '/users/' + userId + '/scores/' + scoreId);
    };

    scoreService.updateScore = function(userId, scoreId) {
      return $http.put(mainRoute + '/users/' + userId + '/scores/' + scoreId);
    };

    scoreService.resetScore = function(userId, scoreId) {
      return $http.delete(mainRoute + '/users/' + userId + '/scores/' + scoreId);
    };

    return scoreService;
  }])
};