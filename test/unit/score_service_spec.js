require('../../app/app.js');
const angular = require('angular');
require('angular-mocks');

describe('score service tests', () => {
  var ScoreService;

  beforeEach(angular.mock.module('app'));

  beforeEach(angular.mock.inject(function(_ScoreService_) {
    ScoreService = _ScoreService_;
  }));

  it('should be a service', () => {
    expect(typeof ScoreService).toBe('object');
    expect(typeof ScoreService.createScore).toBe('function');
    expect(typeof ScoreService.getScores).toBe('function');
    expect(typeof ScoreService.getScore).toBe('function');
    expect(typeof ScoreService.updateScore).toBe('function');
    expect(typeof ScoreService.resetScore).toBe('function');
  });

  describe('score REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create a new score', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/users/userId/scores')
        .respond(200, {data: { __v: 0,
          userId: 'userId',
          category: 'JavaScript',
          difficulty: 'Easy',
          totalQuestions: 10,
          completedQuestions: 10,
          questionsCorrect: 7,
          questionsWrong: 3,
          _id: '57291b9b611f7e8e61ea5983' }});
      ScoreService.createScore({
        userId: 'userId',
        category: 'JavaScript',
        difficulty: 'Easy',
        totalQuestions: 10,
        completedQuestions: 10,
        questionsCorrect: 7,
        questionsWrong: 3});
      $httpBackend.flush();
    });

    it('should get all scores', () => {
      $httpBackend.expectGET('http://localhost:3000/api/users/userId/scores')
        .respond(200, {data: [ { _id: '57290f03f6a07b025e139afe',
          userId: 'userId',
          category: 'JavaScript',
          difficulty: 'Easy',
          totalQuestions: 10,
          completedQuestions: 10,
          questionsCorrect: 7,
          questionsWrong: 3,
          __v: 0 }]})
      ScoreService.getScores('userId');
      $httpBackend.flush();
    });

    it('should get score id', () => {
      $httpBackend.expectGET('http://localhost:3000/api/users/userId/scores?category=JavaScript&difficulty=Easy')
        .respond(200, {"message": "Returned ScoreId", "data": {"scoreId": "57292656a257bb6665801e22"}})
      ScoreService.getScoreId({userId: 'userId', category: 'JavaScript', difficulty: 'Easy'});
      $httpBackend.flush();
    });

    it('should get a score', () => {
      $httpBackend.expectGET('http://localhost:3000/api/users/userId/scores/scoreId')
        .respond(200, {data: { _id: 'scoreId',
          userId: 'userId',
          category: 'JavaScript',
          difficulty: 'Easy',
          totalQuestions: 10,
          completedQuestions: 10,
          questionsCorrect: 7,
          questionsWrong: 3,
          __v: 0 }})
      ScoreService.getScore({userId: 'userId', scoreId: 'scoreId'});
      $httpBackend.flush();
    });

    it('should update a score', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/users/userId/scores/scoreId')
        .respond(200, {message: 'Updated Score'});
      ScoreService.updateScore({userId: 'userId', scoreId: 'scoreId', questionsRight: 8, questionsWrong: 2});
      $httpBackend.flush();
    });

    it('should remove a score', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/users/userId/scores/scoreId')
        .respond(200, {message: 'Deleted Score'});
      ScoreService.resetScore({userId: 'userId', scoreId: 'scoreId'});
      $httpBackend.flush();
    });

  });
});
