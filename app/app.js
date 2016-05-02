'use strict';

require('angular')
require('angular-route')

var app = angular.module('app',['ngRoute'])

require('./controllers/question-controller.js')(app)
require('./controllers/user-controller.js')(app)

app.config(['$routeProvider', function(router) {
  router
    .when('/home', {
      controller: 'UserController',
      controllerAs: 'userctrl',
      templateUrl: 'templates/home.html'
    })
    // .when('/home', {
    //   controller: 'PeopleController',
    //   controllerAs: 'peoplectrl',
    //   templateUrl: 'views/home.html'
    // })
}])
