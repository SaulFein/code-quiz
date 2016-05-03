require('../../app/app.js');
const angular = require('angular');
require('angular-mocks');


describe('it should test something', () => {
  var userController;
  it('should have a test', () => {
    expect(false).toBe(false);
  });
  beforeEach(angular.mock.module('app'))
  beforeEach(angular.mock.inject(function($controller) {
    userController = $controller('UserController');
  }))
  it('should construct a controller', () => {
    expect(typeof userController).toBe('object');
    expect(userController.user[0]).toBe('user');
    expect(typeof userController.createUser).toBe('function');
  })
  describe('REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })

    it('should create a new user', () => {
      $httpBackend.expectPOST('http://localhost:3000/signup')
        .respond(200, {username: 'testperson', password: '123'});
      userController.createUser();
      $httpBackend.flush();
      expect(userController.user[1].username).toBe('testperson');
    });

    // it('should login a user', () => {
    //   $httpBackend.expectPOST('http://localhost:3000/login', {name: 'testperson', password: '123'})
    //     .respond(200, {name: 'testperson', password: 'hashedPass'});
    //   userController.signIn({name: 'testperson', password: '123'})
    //   $httpBackend.flush();
    //   // expect(userController.people.length).toBe(2);
    //   // expect(userController.people[1].name).toBe('test person');
    //   // expect(userController.newPerson).toBeNull();
    // });


  });
});
