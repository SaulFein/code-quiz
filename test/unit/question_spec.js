require('../../app/app.js');
const angular = require('angular');
require('angular-mocks');

describe('question controller', ()=>{
  var questionCtrl;

  beforeEach(angular.mock.module('app'))
  beforeEach(angular.mock.inject(function($controller){
    questionCtrl = $controller('QuestionController');
  }))

  it('should construct controller', () => { //this seems like overkill?
    expect(typeof questionCtrl).toBe('object')
    expect(typeof questionCtrl.scoreData).toBe('object')
    expect(typeof questionCtrl.getCategory).toBe('function')
    expect(typeof questionCtrl.getDifficulty).toBe('function')
    expect(typeof questionCtrl.getQuestions).toBe('function')
    expect(typeof questionCtrl.createScore).toBe('function')
    expect(typeof questionCtrl.getAnswer).toBe('function')
    expect(typeof questionCtrl.updateScore).toBe('function')
    expect(typeof questionCtrl.newQuestion).toBe('function')
    expect(typeof questionCtrl.submit).toBe('function')
    expect(typeof questionCtrl.reset).toBe('function')
  })

  describe('getting questions', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
  }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })

    it('should get some questions', () => {
      $httpBackend.expectGET('http://localhost:3000/api/questions?category=test&difficulty=easy')
      .respond(200, {data :[{question:"who", choices:["a","b","c","d"],answer:"a",category:"test",difficulty:"Easy"}]})
      $httpBackend.expectPOST('http://localhost:3000/api/users/undefined/scores')
      .respond(200, {data: {_id:'dumb'}})
      window.localStorage.cat='test';
      window.localStorage.dif='easy';
      questionCtrl.getQuestions()
      $httpBackend.flush();
      console.log(questionCtrl.allQuestions)
      expect(questionCtrl.allQuestions.length).toBe(1)
      expect(questionCtrl.answers.length).toBe(4)
      expect(questionCtrl.curQuestion.question).toBe('who')
    })
  })

})
