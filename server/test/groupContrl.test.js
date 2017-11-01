import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import { 
  createGroup,
  getGroups,
  getGroupUsers, 
  postMessage,
  getMessages,
  notGroupUsers,
  getAllUsers,
  addUser } from '../controllers/groups';

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
  let id; 
  let name;
  let groupName;
  let groupId;
  beforeEach(() => {
    name = 'Roosevelt Halvorson';
    id = '2Gw8x06GEKhxBmoOsArdbzIcmYF3';
    groupId = '-Kv5rBdlfntOZp1ICdPp';
    groupName = 'Testers Group';
  });
  it('should return 200 when a user is successfully added to group', (done) => {
    chai.request(app)
      .post(`/group/${groupId}/users`, addUser)
      .send({ groupName, name, id })
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  });
});

describe('The Get Group Users Controller', () => {
  let groupId;
  beforeEach(() => {
    groupId = '-Kv5rBdlfntOZp1ICdPp';
  });
  it('should return 200 when all Group Users are fetched', (done) => {
    chai.request(app)
      .get(`/getGroupUsers/${groupId}`, getGroupUsers)
      .set('Accept', 'application/json')
      .end((res) => {
        if (res) {
          res.status.should.equal(200);
        }
        done();
      });
  });
});

describe('The Get All Users Controller', () => {
  let groupId;
  beforeEach(() => {
    groupId = '-Kv5rBdlfntOZp1ICdPp';
  });
  it('should return 200 when all Users not in that group are fetched', 
    (done) => {
      chai.request(app)
        .get(`/notGroupUsers/${groupId}`, notGroupUsers)
        .set('Accept', 'application/json')
        .end((res) => {
          if (res) {
            res.status.should.equal(200);
          }
          done();
        });
    });
});

describe('The Message Controllers', () => {
  let id; 
  let name;
  let message;
  let priority;
  let groupId;
  beforeEach(() => {
    name = 'Roosevelt Halvorson';
    id = '2Gw8x06GEKhxBmoOsArdbzIcmYF3';
    groupId = '-Kv5rBdlfntOZp1ICdPp';
    message = 'Testers Group Message';
    priority = 'Normal';
  });
  it('should return 200 when a message is successfully posted to a group', 
    (done) => {
      chai.request(app)
        .post('/message', postMessage)
        .send({ message, name, id, priority, groupId })
        .set('Accept', 'application/json')
        .end((res) => {
          if (res) {
            res.status.should.equal(200);
          }
          done();
        });
    });

  it('should return 200 when all messages are successfully fetched',
    (done) => {
      chai.request(app)
        .get(`/getMessages/${groupId}`, getMessages)
        .set('Accept', 'application/json')
        .end((res) => {
          if (res) {
            res.status.should.equal(200);
          }
          done();
        });
    });
  it('should return call sendNotification when message Urgent/Critical',
    (done) => {
      const priority = 'Critical';
      chai.request(app)
        .post('/message', postMessage)
        .send({ message, name, id, priority, groupId })
        .set('Accept', 'application/json')
        .end((res) => {
          if (res) {
            res.status.should.equal(200);
          }
          done();
        });
    });
});

