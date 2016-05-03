'use strict';

require('angular')
require('angular-route')

var app = angular.module('app',['ngRoute'])

require('./services/auth_service')(app);
require('./services/error_service')(app);
require('./services/score_service')(app);
require('./controllers/question-controller.js')(app)
require('./controllers/user-controller.js')(app)

app.config(['$routeProvider', function(router) {
  router
    .when('/home', {
      controller: 'UserController',
      controllerAs: 'userctrl',
      templateUrl: 'templates/home.html'
    })
    .when('/login', {
      controller: 'UserController',
      controllerAs: 'userctrl',
      templateUrl: 'templates/login.html'
    })
    .when('/category', {
      controller: 'QuestionController',
      controllerAs: 'questionCtrl',
      templateUrl: 'templates/category.html'
    })
    .when('/difficulty', {
      controller: 'QuestionController',
      controllerAs: 'questionCtrl',
      templateUrl: 'templates/difficulty.html'
    })
    .when('/game', {
      controller: 'QuestionController',
      controllerAs: 'questionCtrl',
      templateUrl: 'templates/game.html'
    })
    .when('/submit', {
      controller: 'QuestionController',
      controllerAs: 'questionCtrl',
      templateUrl: 'templates/submit.html'
    })
}])
