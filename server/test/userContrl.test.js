import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import { 
  signUp,
  signIn,
  signOut, 
  resetPassword } from '../controllers/user.controller';

const app = require('../server');

chai.should();
chai.use(chaiHttp);

describe('The SignUp route controller', () => {
  let email;
  let userName;
  let password;
  let phoneNumber;
  beforeEach(() => {
    userName = faker.name.findName();
    email = faker.internet.email();
    password = 'abc123';
    phoneNumber = faker.phone.phoneNumber();
  });
  it('should return 200 on successful signUp', (done) => {
    chai.request(app)
      .post('/signUp', signUp)
      .send({ email, password, userName, phoneNumber })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  });
  it('should return 400 if user already exist', (done) => {
    chai.request(app)
      .post('/signUp', signUp)
      .send({ email, password, userName, phoneNumber })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done();
      });
  });
  it('should return 400 if a badly formatted email is passed', (done) => {
    const email = 'johndoe4me.com';
    chai.request(app)
      .post('/signUp', signUp)
      .send({ email, password, userName, phoneNumber })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done();
      });
  });
  it('should return 400 if password is empty', (done) => {
    const password = '';
    chai.request(app)
      .post('/signUp', signUp)
      .send({ email, password, userName, phoneNumber })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done();
      });
  });
  it('should return 400 if password is weak', (done) => {
    const password = 'abc1';
    const email = 'weakpass@myself.com';
    chai.request(app)
      .post('/signUp', signUp)
      .send({ email, password, userName, phoneNumber })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done();
      });
  });
}); // End of SignUp Test Suite

describe('The SignIn Controller', () => {
  let email; 
  let password;
  beforeEach(() => {
    email = 'john.doe@myself.com';
    password = 'abc123';
  });
  it('should return 200 on successful signIn', (done) => {
    chai.request(app)
      .post('/signIn', signIn)
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  });
  it('should return 400 for Invalid SignIn details', (done) => {
    const email = 'johndoe4me.com';
    const password = '';
    chai.request(app)
      .post('/signIn', signIn)
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done();
      });
  });
}); // End of SignIn Test Suite

describe('The SignOut Controller', () => {
  it('should return 200 when user successfully signOut', (done) => {
    chai.request(app)
      .post('/signOut', signOut)
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  });
  it('should return 400 when signOut fails', (done) => {
    chai.request(app)
      .post('/signOut', signOut)
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done();
      });
  });
}); // End of SignOut Test Suite

describe('The Reset Password Controller', () => {
  it('should return 400 if an invalid email is passed', (done) => {
    const badEmail = 'badtguy.com';
    chai.request(app)
      .post('/resetPassword', resetPassword)
      .send({ badEmail })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done();
      });
  });
}); // End of Reset Password test suite
