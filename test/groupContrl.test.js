import mocha from 'mocha';
import chai from 'chai';
import firebase from 'firebase';
import chaiHttp from 'chai-http';
import assert from 'assert';
import { 
  createGroup,
  getGroups,
  getGroupUsers, 
  getMessages, 
  postMessage,
  getAllUsers,
  addUser } from '../server/controllers/groups';

const expect = require('chai').expect;
const app = require('../server/server');

chai.should();
chai.use(chaiHttp);

describe('The Group controller', () => {
  // let email, userName, password, phoneNumber;
  let email;
  let password;
  beforeEach(() => {
    email = 'john.doe@myself.com';
    password = 'abc123';
    // let currUser;
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     const currUser = user;
    //     return currUser;
    //   });
    // userName = 'John Doe';
    // 
    // phoneNumber = '+2348098765432';
  });

  it('should return 200 when a Group is Successfully created', (done) => {
    const groupName = 'Testers Group';
    chai.request(app)
      .post('/group', createGroup)
      .send({ groupName })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  });
});
