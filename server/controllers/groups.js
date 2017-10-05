import firebase from 'firebase';
// import dbConfig from '../config/config';
import getArray from '../utils/getArray';
import SendNotification from '../utils/sendNotifications';

/**
 * This Controller file exports all controllers for the group 
 * endpoints
 * @param {*} req 
 * @param {*} res 
 */

// ============Controller for Creating Groups ============

export const createGroup = (req, res) => {
  // const currUser = firebase.auth().currentUser;
  const userUid = req.body.userId;
  const userName = req.body.userName;
  if (userUid !== null) {
    const dbRef = firebase.database().ref('/group'),
      group = req.body.groupName,
      newGroupId = dbRef.push({
        groupName: group,
      }).key;
    firebase.database().ref(`/users/${userUid}/groups`).push(
      {
        groupId: newGroupId,
        groupName: group,
        isAdmin: true
      });
    firebase.database().ref(`group/${newGroupId}/users/${userUid}`)
      .update({
        id: userUid,
        name: userName
      })
      .then(() => {
        res.status(200);
        res.send({ message: `You Just Created a group called:${group}` });
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.status(400);
    res.send('Please sign In first!');
  }
};

//  ============ Controller that Gets all groups created  ============
export const getGroups = (req, res) => {
  const userUid = req.params.userUid;
  const ref = firebase.database().ref(`users/${userUid}/groups`);
  ref.once('value', (data) => {
    const groupList = data.val();
    if (groupList === null) {
      res.status(404)
        .send('You do not belong to any group yet');
    } else {
      const groups = getArray(groupList);
      res.status(200)
        .send(groups);
    }
  }).catch((error) => {
    res.send(error);
  });
};

// ===========controller gets the users in a particular group ============
export const getGroupUsers = (req, res) => {
  const groupId = req.params.groupId;
  const ref = firebase.database().ref(`group/${groupId}/users`);
  const ref1 = firebase.database().ref().child('users');
  ref.once('value', (data) => {
    const groupUsers = data.val();
    if (groupUsers === null) {
      res.status(404)
        .send('This group has no user yet!');
    } else {
      const newArr = getArray(groupUsers);
      ref1.once('value', (data1) => {
        const usersGotten = data1.val();
        if (data1 !== null) {
          const allUsers = getArray(usersGotten);
          const filtered = allUsers.filter(userInAllUsers => !newArr.some(
            userInGroup => userInAllUsers.id === userInGroup.id)
          );
          res.status(200)
            .send(filtered);
        }
      })
        .catch((error) => {
          res.status(400)
            .send(error);
        });
    }
  });
};

//  ============ Controller that get's Messages ============
export const getMessages = (req, res) => {
  const groupId = req.params.groupId;
  const ref = firebase.database().ref(`/messages/${groupId}`);
  ref.once('value', (data) => {
    const mesResponse = data.val();
    if (mesResponse !== null) {
      const messages = getArray(mesResponse);
      res.status(200)
        .send(messages);
    } else {
      res.status(404)
        .send('There are no Messages!');
    }
  })
    .catch((error) => {
      res.send(error);
    });
};

//  ============ Controller that post's messages ============
export const postMessage = (req, res) => {
  const { message, priority, groupId, userId } = req.body;
  const currUser = firebase.auth().currentUser;
  if (currUser) {
    const username = currUser.displayName;
    const messagekey = firebase.database().ref(`messages/${groupId}`)
      .push({
        id: userId,
        name: username,
        messages: message,
        Priority: priority
      }).key;
    const promise = firebase.database().ref(`group/${groupId}/messages`)
      .push({
        id: userId,
        messageKey: messagekey
      })
      .then(() => {
        if (priority === 'Urgent' || priority === 'Critical') {
          SendNotification(groupId, priority);
        }
        res.status(200)
          .send('Your message was posted successfully!');
      });
    promise.catch((error) => {
      res.status(400)
        .send({ message: 'Unfortunately,Your message was not posted' },
          error.message);
    });
  } else {
    res.status(401);
    res.send({ message: 'You need to be signed In' });
  }
};

//  ============Controller Get's All Users  ============
export const getAllUsers = (req, res) => {
  const ref = firebase.database().ref().child('users');
  ref.once('value', (data) => {
    const users = getArray(data.val());
    res.status(200)
      .send(users);
  }).catch((error) => {
    res.send(error);
  });
};
//  ============Controller Adds user to group ============ 
export const addUser = (req, res) => {
  const { groupName, name, userId } = req.body;
  const groupId = req.params.groupId;
  // console.log(groupId, userId, name);
  // const currentUser = firebase.auth().currentUser;
  if (groupId) {
    const promise = firebase.database()
      .ref(`/group/${groupId}/users/${userId}`)
      .update({
        id: userId,
        name
      });
    firebase.database().ref(`/users/${userId}/groups`).push(
      {
        groupId,
        groupName,
        isAdmin: false
      });
    promise.then(() => {
      res.status(200);
      res.send('Your group has a new User ');
    });
    promise.catch((error) => {
      res.status(400);
      res.send(error.message);
    });
  } else {
    res.status(401);
    res.send('You need to be signed In');
  }
};
