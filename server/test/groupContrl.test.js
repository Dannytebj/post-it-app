import mocha from 'mocha';
import chai from 'chai';
// import firebase from 'firebase';
import chaiHttp from 'chai-http';
import faker from 'faker';
import assert from 'assert';
import { 
  createGroup,
  getGroups,
  getGroupUsers, 
  postMessage,
  getAllUsers,
  addUser } from '../controllers/groups';

const expect = require('chai').expect;
const app = require('../server');

chai.should();
chai.use(chaiHttp);

describe('The Create Group controller', () => {
  let userId; 
  let userName;

  beforeEach(() => {
    userName = 'John Doe';
    userId = 'vmodRxnuhhXZQsqTBQx4A6V48CI2';
  });

  it('should return 200 when a Group is Successfully created', (done) => {
    const groupName = faker.company.companyName();
    chai.request(app)
      .post('/group', createGroup)
      .send({ groupName, userName, userId })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  });
  it('should return 400 if userUid is null', (done) => {
    const groupName = faker.company.companyName();
    const userId = null;
    chai.request(app)
      .get('/group', createGroup)
      .send({ groupName, userName, userId })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(400);
        }
        done();
      });
  });
  it('should return 500 if userUid does not exist', (done) => {
    const groupName = faker.company.companyName();
    const userId = 'vmodRxnuhhXZQsqTBQx4A6';
    chai.request(app)
      .get('/group', createGroup)
      .send({ groupName, userName, userId })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(500);
        }
        done();
      });
  });
});

describe('The Get Group controllers', () => {
  it('should return 200 when groups are fetched successfully', (done) => {
    const userUid = 'vmodRxnuhhXZQsqTBQx4A6V48CI2';
    chai.request(app)
      .get(`/getGroup/${userUid}`, getGroups)
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  });
});

describe('The Get All Users controller', () => {
  it('should return 200 on successful fetch of group Users', (done) => {
    chai.request(app)
      .get('/getUsers', getAllUsers)
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  });
});

describe('The Add User Controller', () => {
  let userId; 
  let username;
  let group;
  let groupId;
  beforeEach(() => {
    username = 'Roosevelt Halvorson';
    userId = '2Gw8x06GEKhxBmoOsArdbzIcmYF3';
    groupId = '-Kv5rBdlfntOZp1ICdPp';
    group = 'Testers Group';
  });
  it('should return 200 when a user is successfully added to group', (done) => {
    chai.request(app)
      .post(`/group/${groupId}/users`, addUser)
      .send({ group, username, userId })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  });
});
