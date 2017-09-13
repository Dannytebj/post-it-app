import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import { signUp, signIn, signOut} from '../server/controllers/user.controller';

const expect = require('chai').expect;
const app = require('../server/server');
chai.should();
chai.use(chaiHttp);

describe('The SignUp route controller', () => {
  let email, userName, password, phoneNumber;
  beforeEach(() => {
    userName = 'John Doe';
    email = 'john1.doe111@myself.com';
    password = 'abc123';
    phoneNumber = '+2348098765432';
  });
  it('should return 200 on successful signUp', (done) => {
    chai.request(app)
      .post('/signUp', signUp)
      .send({ email, password, userName, phoneNumber})
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  })
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
  })
  it('should return 400 if a badly formatted email is passed', (done) => {
    const email = 'johndoe4me.com';
    chai.request(app)
      .post('/signUp', signUp)
      .send({ email, password, userName, phoneNumber})
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done()
      });
  })
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
        done()
      });
  })
  it('should return 400 if password is weak', (done) => {
    const password = 'abc1';
    const email = 'weakpass@myself.com'
    chai.request(app)
      .post('/signUp', signUp)
      .send({ email, password, userName, phoneNumber })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done()
      });
  })

}); // End of SignUp Test Suite

describe('The SignIn Controller', () => {
  let email, password;
  beforeEach(() => {
    email = 'john.doe111@myself.com';
    password = 'abc123';
  });
  it('should return 200 on successful signIn', (done) => {
    chai.request(app)
      .post('/signIn', signIn)
      .send({ email, password })
      .set('Accept','application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200)
        }
        done()
      });
  })
  it('should return 400 for Invalid SignIn details', (done) => {
    const email = 'johndoe4me.com';
    const password = ''
    chai.request(app)
      .post('/signIn', signIn)
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400)
        }
        done()
      });
  })
}); //End of SignIn Test Suite

describe('The SignOut Controller', () => {
  it('should return 200 when user successfully signOut', (done) => {
    chai.request(app)
      .post('/signOut')
      .set('Accept', 'application/json')
      .end((res) => {
        if (res){
          res.status.should.equal(200);
        }
        done()
      });
  });
  it('should return 400 when signOut fails', (done) => {
    chai.request(app)
      .post('/signOut')
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done()
      });
  });

}); // End of SignOut Test Suite

