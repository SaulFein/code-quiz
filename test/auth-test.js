'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let config = require(__dirname + '/../config/env.js');
config.MONGOLAB_URI='mongodb://localhost/db';
require(__dirname + '/../server.js');

chai.use(chaiHttp);
let request = chai.request;
let expect = chai.expect;

let userId;
let userToken;

let userJSON = {
  username: 'codequizzer',
  password: 'winner'
};

describe('test /signup route', () => {
  after((done) => {
    request('localhost:' + config.PORT)
      .delete('/api/users/' + userId)
      .set('token', userToken)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('username');
        expect(res.body.data).to.have.property('password');
        expect(res.body.message).to.equal('Deleted User');
        expect(res.body.data._id).to.not.equal(null);
        expect(res.body.data.username).to.equal('codequizzer');
        expect(res.body.data.password).to.not.equal(null);
        done();
      });
  });

  it('should respond to POST /signup', (done) => {
    request('localhost:' + config.PORT)
      .post('/signup')
      .send(userJSON)
      .end((err, res) => {
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
});

describe('test /login route', () => {
  before((done) => {
    request('localhost:' + config.PORT)
      .post('/signup')
      .send(userJSON)
      .end((err, res) => {
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
        expect(res.body).to.have.property('message');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('username');
        expect(res.body.data).to.have.property('password');
        expect(res.body.message).to.equal('Deleted User');
        expect(res.body.data._id).to.not.equal(null);
        expect(res.body.data.username).to.equal('codequizzer');
        expect(res.body.data.password).to.not.equal(null);
        done();
      });
  });

  it('should respond to POST /login', (done) => {
    request('localhost:' + config.PORT)
      .post('/login')
      .auth(userJSON.username, userJSON.password)
      .end((err, res) => {
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

  it('should respond to POST /signup with existing username', (done) => {
    request('localhost:' + config.PORT)
      .post('/signup')
      .send(userJSON)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('User Already Exists');
        done();
      });
  });
});