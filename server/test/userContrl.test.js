import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import { 
  signUp,
  signIn,
  signOut, 
  resetPassword } from '../controllers/userController';

const app = require('../server');

const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  describe('Sign Up', () => {
    let email;
    let username;
    let password;
    let phoneNumber;
    beforeEach(() => {
      username = faker.name.findName();
      email = faker.internet.email();
      password = 'abc123';
      phoneNumber = '09876543211';
    });
    it('should return 201 when successful ', (done) => {
      chai.request(app)
        .post('/api/v1/signUp', signUp)
        .send({ email, password, username, phoneNumber })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message').equal("User Succesfully created!");
          }
          done();
        });
    });
    it('should return 400 if email supplied already exist', (done) => {
      const email = 'john.doe@myself.com';
      chai.request(app)
        .post('/api/v1/signUp', signUp)
        .send({ email, password, username, phoneNumber })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            expect(res).to.have.status(409);
            res.body.should.have.property('message')
              .equal("The email address is already in use by another account.");
            done();
          } 
        });
    });
    it('should return 400 if a badly formatted email is supplied', (done) => {
      const email = 'johndoe4me.com';
      chai.request(app)
        .post('/api/v1/signUp', signUp)
        .send({ email, password, username, phoneNumber })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal("Please enter a valid email"); 
          }
          done();
        });
    });
    it('should return 400 if password supplied is empty', (done) => {
      const password = '';
      chai.request(app)
        .post('/api/v1/signUp', signUp)
        .send({ email, password, username, phoneNumber })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal("Password cannot be empty"); 
          }
          done();
        });
    });
    it('should return 400 if password is weak', (done) => {
      const password = 'abc1';
      const email = 'weakpass@myself.com';
      chai.request(app)
        .post('/api/v1/signUp', signUp)
        .send({ email, password, username, phoneNumber })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal("Password must be a mininum of 6 character"); 
          }
          done();
        });
    });
  }); // End of SignUp Test Suite
  describe('Sign In', () => {
    let email; 
    let password;
    beforeEach(() => {
      email = 'john.doe@myself.com';
      password = 'abc123';
    });
    it('should return 200 on successful signIn', (done) => {
      chai.request(app)
        .post('/api/v1/signIn', signIn)
        .send({ email, password })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal("User Logged In Successfully!");
          }
          done();
        });
    });
    it.only('should return 400 for Invalid SignIn details', (done) => {
      const email = 'johndoe4me.com';
      const password = '';
      chai.request(app)
        .post('/api/v1/signIn', signIn)
        .send({ email, password })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(400);
            res.body.should.have.property('message')
              .equal("Please use a valid email address");
          }
          done();
        });
    });
  }); // End of SignIn Test Suite

  describe('The SignOut Controller', () => {
    it('should return 200 when user successfully signOut', (done) => {
      chai.request(app)
        .post('/api/v1/signOut', signOut)
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
        .post('/api/v1/signOut', signOut)
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
        .post('/api/v1/resetPassword', resetPassword)
        .send({ badEmail })
        .set('Accept', 'application/json')
        .end((res) => {
          if (res) {
            res.status.should.equal(400);
          }
          done();
        });
    });
    it('should return 200 when reset password mail has been sent', (done) => {
      const email = 'john.doe@myself.com';
      chai.request(app)
        .post('/api/v1/resetPassword', resetPassword)
        .send({ email })
        .set('Accept', 'application/json')
        .end((res) => {
          if (res) {
            res.status.should.equal(200);
          }
          done();
        });
    });
  }); // End of Reset Password test suite
}); // End of User Test Suites

