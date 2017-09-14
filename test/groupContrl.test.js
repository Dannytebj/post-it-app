import mocha from 'mocha';
import chai from 'chai';
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
  let email, userName, password, phoneNumber;
  beforeEach(() => {
    userName = 'John Doe';
    email = 'john1.doe111@myself.com';
    password = 'abc123';
    phoneNumber = '+2348098765432';
  });

  it('should return 200 when a Group is Successfully created', (done) => {
    chai.request(app)
      .post('/group', createGroup)
      .send({ email, password, userName, phoneNumber})
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  })

});