'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
require(__dirname + '/../server.js');
let config = require(__dirname + '/../config/env.js');

chai.use(chaiHttp);
let request = chai.request;
let expect = chai.expect;

let userId;
let userToken;

let userJSON = {
  username: 'codequizzer',
  password: 'winner'
};

let scoreJSON = {
  category: 'JavaScript',
  difficulty: 'Easy',
  totalQuestions: 10,
  completedQuestions: 10,
  questionsCorrect: 7,
  questionsWrong: 3
};

describe('test /users/:user/scores routes', () => {
  before((done) => {
    request('localhost:' + config.PORT)
      .post('/api/users')
      .send(userJSON)
      .end((err,res) => {
        userId = res.body.data._id;
        userToken = res.body.token;
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('token');
        expect(res.body.data).to.have.property('username');
        expect(res.body.data).to.have.property('password');
        expect(res.body.token).to.not.equal(null);
        expect(res.body.data.username).to.equal('codequizzer');
        expect(res.body.data.password).to.not.equal(null);
        done();
      });
  });

  after((done) => {
    request('localhost:' + config.PORT)
      .delete('/api/users/' + userId)
      .set('token', userToken)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.message).to.be.equal('Deleted User');
        done();
      });
  });

  describe('GET /users/:user/scores', () => {
    let scoreId;
    before((done) => {
      request('localhost:' + config.PORT)
        .post('/api/users/' + userId + '/scores')
        .set('token', userToken)
        .send(scoreJSON)
        .end((err, res) => {
          scoreId = res.body.data._id;
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data).to.have.property('totalQuestions');
          expect(res.body.data).to.have.property('completedQuestions');
          expect(res.body.data).to.have.property('questionsCorrect');
          expect(res.body.data).to.have.property('questionsWrong');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Easy');
          expect(res.body.data.totalQuestions).to.equal(10);
          expect(res.body.data.completedQuestions).to.equal(10);
          expect(res.body.data.questionsCorrect).to.equal(7);
          expect(res.body.data.questionsWrong).to.equal(3);
          done();
        });
    });

    after((done) => {
      request('localhost:' + config.PORT)
        .delete('/api/users/' + userId + '/scores/' + scoreId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Deleted Score');
          done();
        });
    });

    it('should respond to GET /users/:user/scores', (done) => {
      request('localhost:' + config.PORT)
        .get('/api/users/' + userId + '/scores')
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          let data = res.body.data;
          data = data[data.length - 1];
          expect(data).to.have.property('category');
          expect(data).to.have.property('difficulty');
          expect(data).to.have.property('totalQuestions');
          expect(data).to.have.property('completedQuestions');
          expect(data).to.have.property('questionsCorrect');
          expect(data).to.have.property('questionsWrong');
          expect(data.category).to.equal('JavaScript');
          expect(data.difficulty).to.equal('Easy');
          expect(data.totalQuestions).to.equal(10);
          expect(data.completedQuestions).to.equal(10);
          expect(data.questionsCorrect).to.equal(7);
          expect(data.questionsWrong).to.equal(3);
          done();
        });
    });

  it('should respond to GET /users/:user/scores/:score', (done) => {
      request('localhost:' + config.PORT)
        .get('/api/users/' + userId + '/scores/' + scoreId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data).to.have.property('totalQuestions');
          expect(res.body.data).to.have.property('completedQuestions');
          expect(res.body.data).to.have.property('questionsCorrect');
          expect(res.body.data).to.have.property('questionsWrong');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Easy');
          expect(res.body.data.totalQuestions).to.equal(10);
          expect(res.body.data.completedQuestions).to.equal(10);
          expect(res.body.data.questionsCorrect).to.equal(7);
          expect(res.body.data.questionsWrong).to.equal(3);
          done();
        });
    });
  });

  describe('POST /users/:user/scores', () => {
    let scoreId;
    after((done) => {
      request('localhost:' + config.PORT)
        .delete('/api/users/' + userId + '/scores/' + scoreId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Deleted Score');
          done();
        });
    });

    it('should respond to POST /users/:user/scores', (done) => {
      request('localhost:' + config.PORT)
        .post('/api/users/' + userId + '/scores')
        .set('token', userToken)
        .send(scoreJSON)
        .end((err, res) => {
          scoreId = res.body.data._id;
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data).to.have.property('totalQuestions');
          expect(res.body.data).to.have.property('completedQuestions');
          expect(res.body.data).to.have.property('questionsCorrect');
          expect(res.body.data).to.have.property('questionsWrong');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Easy');
          expect(res.body.data.totalQuestions).to.equal(10);
          expect(res.body.data.completedQuestions).to.equal(10);
          expect(res.body.data.questionsCorrect).to.equal(7);
          expect(res.body.data.questionsWrong).to.equal(3);
          done();
        });
    });
  });

  describe('PUT /users/:user/scores/:score', () => {
    let scoreId;
    before((done) => {
      request('localhost:' + config.PORT)
        .post('/api/users/' + userId + '/scores')
        .set('token', userToken)
        .send(scoreJSON)
        .end((err, res) => {
          scoreId = res.body.data._id;
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data).to.have.property('totalQuestions');
          expect(res.body.data).to.have.property('completedQuestions');
          expect(res.body.data).to.have.property('questionsCorrect');
          expect(res.body.data).to.have.property('questionsWrong');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Easy');
          expect(res.body.data.totalQuestions).to.equal(10);
          expect(res.body.data.completedQuestions).to.equal(10);
          expect(res.body.data.questionsCorrect).to.equal(7);
          expect(res.body.data.questionsWrong).to.equal(3);
          done();
        });
    });

    after((done) => {
      request('localhost:' + config.PORT)
        .delete('/api/users/' + userId + '/scores/' + scoreId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Deleted Score');
          done();
        });
    });

    it('should respond to PUT /users/:user/scores/:score', (done) => {
      request('localhost:' + config.PORT)
        .put('/api/users/' + userId + '/scores/' + scoreId)
        .set('token', userToken)
        .send({difficulty: 'Hard'})
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data).to.have.property('totalQuestions');
          expect(res.body.data).to.have.property('completedQuestions');
          expect(res.body.data).to.have.property('questionsCorrect');
          expect(res.body.data).to.have.property('questionsWrong');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Hard');
          expect(res.body.data.totalQuestions).to.equal(10);
          expect(res.body.data.completedQuestions).to.equal(10);
          expect(res.body.data.questionsCorrect).to.equal(7);
          expect(res.body.data.questionsWrong).to.equal(3);
          done();
        });
    });
  });

  describe('DELETE /users/:user/scores/:score', () => {
    let scoreId;
    before((done) => {
      request('localhost:' + config.PORT)
        .post('/api/users/' + userId + '/scores')
        .set('token', userToken)
        .send(scoreJSON)
        .end((err, res) => {
          scoreId = res.body.data._id;
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data).to.have.property('totalQuestions');
          expect(res.body.data).to.have.property('completedQuestions');
          expect(res.body.data).to.have.property('questionsCorrect');
          expect(res.body.data).to.have.property('questionsWrong');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Easy');
          expect(res.body.data.totalQuestions).to.equal(10);
          expect(res.body.data.completedQuestions).to.equal(10);
          expect(res.body.data.questionsCorrect).to.equal(7);
          expect(res.body.data.questionsWrong).to.equal(3);
          done();
        });
    });

    it('should respond to DELETE /users/:user/scores/:score', (done) => {
      request('localhost:' + config.PORT)
        .delete('/api/users/' + userId + '/scores/' + scoreId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Deleted Score');
          done();
        });
    });
  });
});
