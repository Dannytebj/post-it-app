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
  addUser } from '../controllers/groupsController';
import convertCase from '../utils/convertCase';

const app = require('../server');


chai.should();
chai.use(chaiHttp);
describe(" The Group Controller's ", () => {
  describe('Create Group Method', () => {
    let userName;
    beforeEach(() => {
      userName = 'John Doe';
    });

    it('should return 201 when a Group is Successfully created',
      (done) => {
        const groupName = faker.company.companyName();
        const normalizedName = convertCase(groupName);
        const userUid = 'vmodRxnuhhXZQsqTBQx4A6V48CI2';
        chai.request(app)
          .post('/api/v1/group', createGroup)
          .send({ groupName, userName, userUid })
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res) {
              res.status.should.equal(201);
              res.body.should.have.property('message')
                .equal(`You Just Created a group called: ${normalizedName}`);
            }
            done();
          });
      });
    it('should return 401 if userUid does not exist', (done) => {
      const groupName = 'Testers';
      const userUid = '';
      chai.request(app)
        .post('/api/v1/group', createGroup)
        .send({ groupName, userName, userUid })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(401);
            res.body.should.have.property('message')
              .equal('Please sign In first!');
          }
          done();
        });
    });
    it('should return 409 group name already exists', (done) => {
      const groupName = 'Testers';
      const userUid = 'vmodRxnuhhXZQsqTBQx4A6V48CI2';
      chai.request(app)
        .post('/api/v1/group', createGroup)
        .send({ groupName, userName, userUid })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(409);
            res.body.should.have.property('message')
              .equal('Sorry, This group name already exists');
          }
          done();
        });
    });
  });

  describe('Get Group Method', () => {
    it('should return 200 when groups are fetched successfully', (done) => {
      const userUid = 'vmodRxnuhhXZQsqTBQx4A6V48CI2';
      chai.request(app)
        .get(`/api/v1/getGroup/${userUid}`, getGroups)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('groups fetched successfully!');
          }
          done();
        });
    });
    it('should check if grouplist is empty and return this message', (done) => {
      const userUid = 'vmoOU9xMvaXoNExg6mjsnJXj6W72';
      chai.request(app)
        .get(`/api/v1/getGroup/${userUid}`, getGroups)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('You do not belong to any group yet');
          }
          done();
        });
    });
  });

  describe('Get All Users Method', () => {
    it('should return 200 on successful fetch of group Users', (done) => {
      chai.request(app)
        .get('/api/v1/getUsers', getAllUsers)
        .set('Accept', 'application/json')
        .end((res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('Users fetched Successfully');
          }
          done();
        });
    });
    it('should return 200 when all Users not in that group are fetched', 
      (done) => {
        const groupId = '-Kv5rBdlfntOZp1ICdPp';
        chai.request(app)
          .get(`/api/v1/notGroupUsers/${groupId}`, notGroupUsers)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res) {
              res.status.should.equal(200);
              res.body.should.have.property('message')
                .equal('Users fetched successfully');
            }
            done();
          });
      });
    it('should check if group has Users', (done) => {
      const groupId = '-Kv5t2OXZIEl5nLBPJvf';
      chai.request(app)
        .get(`/api/v1/notGroupUsers/${groupId}`, notGroupUsers)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('This group has no user yet!');
          }
          done();
        });
    });
  });

  describe('Add User Method', () => {
    it('should return 200 when a user is successfully added to group', 
      (done) => {
        const name = 'Roosevelt Halvorson';
        const id = '2Gw8x06GEKhxBmoOsArdbzIcmYF3';
        const groupId = '-Kv5rBdlfntOZp1ICdPp';
        const groupName = 'Testers';
        chai.request(app)
          .post(`/api/v1/group/${groupId}/users`, addUser)
          .send({ groupName, name, id })
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res) {
              res.status.should.equal(200);
              res.body.should.have.property('message')
                .equal('Your group has a new User');
            }
            done();
          });
      });
    it('should return 401 if no user is signed In', 
      (done) => {
        const name = 'Roosevelt Halvorson';
        const id = '';
        const groupId = '-Kv5rBdlfntOZp1ICdPp';
        const groupName = 'Testers';
        chai.request(app)
          .post(`/api/v1/group/${groupId}/users`, addUser)
          .send({ groupName, name, id })
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res) {
              res.status.should.equal(401);
              res.body.should.have.property('message')
                .equal('You need to be signed In');
            }
            done();
          });
      });
  });

  describe('Get Group Users Method', () => {
    it('should return 200 when all Group Users are fetched', (done) => {
      const groupId = '-Kv5rBdlfntOZp1ICdPp';
      chai.request(app)
        .get(`/api/v1/getGroupUsers/${groupId}`, getGroupUsers)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('Users fetched successfully');
          }
          done();
        });
    });
    it('should check if group has Users', (done) => {
      const groupId = '-Kv5t2OXZIEl5nLBPJvf';
      chai.request(app)
        .get(`/api/v1/getGroupUsers/${groupId}`, getGroupUsers)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res) {
            res.status.should.equal(200);
            res.body.should.have.property('message')
              .equal('This group has no user yet!');
          }
          done();
        });
    });
  });

  describe('Post Message Method', () => {
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
          .post('/api/v1/message', postMessage)
          .send({ message, name, id, priority, groupId })
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res) {
              res.status.should.equal(200);
              res.body.should.have.property('message')
                .equal('Your message was posted successfully!');
            }
            done();
          });
      });
    it('should return 401 if no user is signed in', 
      (done) => {
        const id = '';
        chai.request(app)
          .post('/api/v1/message', postMessage)
          .send({ message, name, id, priority, groupId })
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res) {
              res.status.should.equal(401);
              res.body.should.have.property('message')
                .equal('You need to be signed In');
            }
            done();
          });
      });

    it('should return call sendNotification when message Urgent/Critical',
      (done) => {
        const priority = 'Critical';
        chai.request(app)
          .post('/api/v1/message', postMessage)
          .send({ message, name, id, priority, groupId })
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res) {
              res.status.should.equal(200);
            }
            done();
          });
      });
  });
  describe('Get Message Method', () => {
    it('should return 200 when all messages are successfully fetched',
      (done) => {
        const groupId = '-Kv5rBdlfntOZp1ICdPp';
        chai.request(app)
          .get(`/api/v1/getMessages/${groupId}`, getMessages)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res) {
              res.status.should.equal(200);
              res.body.should.have.property('message')
                .equal('messages fetched successfully');
            }
            done();
          });
      });
    it('should check for empty messages tables',
      (done) => {
        const groupId = '-Kv5t2OXZIEl5nLBPJvf';
        chai.request(app)
          .get(`/api/v1/getMessages/${groupId}`, getMessages)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (res) {
              res.status.should.equal(200);
              res.body.should.have.property('message')
                .equal('There are no Messages!');
            }
            done();
          });
      });
  });
}); // END OF GROUP TEST SUITE

