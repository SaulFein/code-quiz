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

let questionJSON = {
  question: 'Which of the following is not a primitive data type?',
  choices: ['Boolean', 'Object', 'Number', 'String', 'Symbol'],
  answer: 'Object',
  category: 'JavaScript',
  difficulty: 'Easy'
};

describe('test /questions routes', () => {
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
      })
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

  describe('GET /questions', () => {
    let questionId;
    before((done) => {
      request('localhost:' + config.PORT)
        .post('/api/questions')
        .set('token', userToken)
        .send(questionJSON)
        .end((err, res) => {
          questionId = res.body.data._id;
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('question');
          expect(res.body.data).to.have.property('choices');
          expect(res.body.data).to.have.property('answer');
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data.question).to.equal('Which of the following is not a primitive data type?');
          expect(res.body.data.choices).to.deep.equal(['Boolean', 'Object', 'Number', 'String', 'Symbol']);
          expect(res.body.data.answer).to.equal('Object');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Easy');
          done();
        });
    });

    after((done) => {
      request('localhost:' + config.PORT)
        .delete('/api/questions/' + questionId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Deleted Question');
          done();
        });
    });

    it('should respond to GET /questions', (done) => {
      request('localhost:' + config.PORT)
        .get('/api/questions')
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          let data = res.body.data;
          data = data[data.length - 1];
          expect(data).to.have.property('question');
          expect(data).to.have.property('choices');
          expect(data).to.have.property('answer');
          expect(data).to.have.property('category');
          expect(data).to.have.property('difficulty');
          expect(data.question).to.equal('Which of the following is not a primitive data type?');
          expect(data.choices).to.deep.equal(['Boolean', 'Object', 'Number', 'String', 'Symbol']);
          expect(data.answer).to.equal('Object');
          expect(data.category).to.equal('JavaScript');
          expect(data.difficulty).to.equal('Easy');
          done();
        });
    });

  it('should respond to GET /questions/:question', (done) => {
      request('localhost:' + config.PORT)
        .get('/api/questions/' + questionId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('question');
          expect(res.body.data).to.have.property('choices');
          expect(res.body.data).to.have.property('answer');
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data.question).to.equal('Which of the following is not a primitive data type?');
          expect(res.body.data.choices).to.deep.equal(['Boolean', 'Object', 'Number', 'String', 'Symbol']);
          expect(res.body.data.answer).to.equal('Object');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Easy');
          done();
        });
    });
  });

  describe('POST /questions', () => {
    let questionId;
    after((done) => {
      request('localhost:' + config.PORT)
        .delete('/api/questions/' + questionId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Deleted Question');
          done();
        });
    });

    it('should respond to POST /questions', (done) => {
      request('localhost:' + config.PORT)
        .post('/api/questions')
        .set('token', userToken)
        .send(questionJSON)
        .end((err, res) => {
          questionId = res.body.data._id;
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('question');
          expect(res.body.data).to.have.property('choices');
          expect(res.body.data).to.have.property('answer');
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data.question).to.equal('Which of the following is not a primitive data type?');
          expect(res.body.data.choices).to.deep.equal(['Boolean', 'Object', 'Number', 'String', 'Symbol']);
          expect(res.body.data.answer).to.equal('Object');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Easy');
          done();
        });
    });
  });

  describe('PUT /questions', () => {
    let questionId;
    before((done) => {
      request('localhost:' + config.PORT)
        .post('/api/questions')
        .set('token', userToken)
        .send(questionJSON)
        .end((err, res) => {
          questionId = res.body.data._id;
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('question');
          expect(res.body.data).to.have.property('choices');
          expect(res.body.data).to.have.property('answer');
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data.question).to.equal('Which of the following is not a primitive data type?');
          expect(res.body.data.choices).to.deep.equal(['Boolean', 'Object', 'Number', 'String', 'Symbol']);
          expect(res.body.data.answer).to.equal('Object');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Easy');
          done();
        });
    });

    after((done) => {
      request('localhost:' + config.PORT)
        .delete('/api/questions/' + questionId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Deleted Question');
          done();
        });
    });

    it('should respond to PUT /questions/:question', (done) => {
      request('localhost:' + config.PORT)
        .put('/api/questions/' + questionId)
        .set('token', userToken)
        .send({difficulty: 'Hard'})
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('question');
          expect(res.body.data).to.have.property('choices');
          expect(res.body.data).to.have.property('answer');
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data.question).to.equal('Which of the following is not a primitive data type?');
          expect(res.body.data.choices).to.deep.equal(['Boolean', 'Object', 'Number', 'String', 'Symbol']);
          expect(res.body.data.answer).to.equal('Object');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Hard');
          done();
        });
    });
  });

  describe('DELETE /questions', () => {
    let questionId;
    before((done) => {
      request('localhost:' + config.PORT)
        .post('/api/questions')
        .set('token', userToken)
        .send(questionJSON)
        .end((err, res) => {
          questionId = res.body.data._id;
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('question');
          expect(res.body.data).to.have.property('choices');
          expect(res.body.data).to.have.property('answer');
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('difficulty');
          expect(res.body.data.question).to.equal('Which of the following is not a primitive data type?');
          expect(res.body.data.choices).to.deep.equal(['Boolean', 'Object', 'Number', 'String', 'Symbol']);
          expect(res.body.data.answer).to.equal('Object');
          expect(res.body.data.category).to.equal('JavaScript');
          expect(res.body.data.difficulty).to.equal('Easy');
          done();
        });
    });

    it('should respond to DELETE /questions/:question', (done) => {
      request('localhost:' + config.PORT)
        .delete('/api/questions/' + questionId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Deleted Question');
          done();
        });
    });
  })
})
