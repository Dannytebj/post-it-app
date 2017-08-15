const supertest = require('supertest'),
  should = require('should'),
  mocha = require('mocha'),
  assert = require('assert'),
  expect = require('chai').expect,
  firebase = require('firebase'),
  sinon = require('sinon');

  // configure firebase
const config = {
  apiKey: 'AIzaSyAyLQtYUNfRvMG7tqL85kto0Zv9l0H0xxk',
  authDomain: 'postitapp-f266c.firebaseapp.com',
  databaseURL: 'https://postitapp-f266c.firebaseio.com',
  projectId: 'postitapp-f266c',
  storageBucket: 'postitapp-f266c.appspot.com',
  messagingSenderId: '276992209544' };
firebase.initializeApp(config);
const server = supertest.agent('http://localhost:9999');
const dbAuth = firebase.auth();

describe('Sign up route function', () => {
  beforeEach(() => {
    sinon.stub(dbAuth, 'createUserWithEmailAndPassword');
  });
  afterEach(() => {
    sinon.stub(dbAuth, 'createUserWithEmailAndPassword').restore();
  });
  it('should allow users create an account with valid email and password',
  (done) => {
    server
    .post('/signUp')
    .send({ userName: 'YourName',
      email: 'YourName@gmail.com',
      password: 'abc123' })
    .expect('Content-type', /json/)
    .expect(200);
    done();
  });
  it('should return 400 for a bad signUp Request(invalid email or password)',
  (done) => {
    server
    .post('/signUp')
    .send({ userName: 'YourName',
      email: 'yourself4me',
      password: 'abc12' })
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      done();
    });
  });
});


describe('The Sign In Route', () => {
  beforeEach(() => {
    sinon.stub(dbAuth, 'signInWithEmailAndPassword');
  });
  afterEach(() => {
    sinon.stub(dbAuth, 'signInWithEmailAndPassword').restore();
  });

  it('should allow users sign In with valid email and password',
  (done) => {
    server
    .post('/signIn')
    .send({ email: 'YourName@gmail.com',
      password: 'abc123' })
    .expect('Content-type', /json/)
    .expect(200);
    done();
  });

  it('should fail to sign in user with invalid email or password', (done) => {
    server
    .post('/signIn')
    .send({ email: '', password: '' })
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      done();
    });
  });
});
