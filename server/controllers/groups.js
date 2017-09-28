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
  const currUser = firebase.auth().currentUser;
  console.log(currUser);
  if (currUser !== null) {
    const dbRef = firebase.database().ref('/group'),
      group = req.body.groupName,
      newGroupId = dbRef.push({
        groupName: group,
      }).key;
    firebase.database().ref(`/users/${currUser.uid}/groups`).push(
      {
        groupId: newGroupId,
        groupName: group,
        isAdmin: true
      });
    firebase.database().ref(`group/${newGroupId}/users/${currUser.uid}`)
      .update({
        id: currUser.uid,
        name: currUser.displayName
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
    const groups = getArray(data.val());
    res.status(200)
      .send(groups);
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
    const newArr = getArray(groupUsers);
    ref1.once('value', (data1) => {
      const allUsers = getArray(data1.val());
      const filtered = allUsers.filter(userInAllUsers => !newArr.some(
        userInGroup => userInAllUsers.id === userInGroup.id)
      );
      res.status(200)
        .send(filtered);
    })
      .catch((error) => {
        res.status(400)
          .send(error);
      });
  });
};

//  ============ Controller that get's Messages ============
export const getMessages = (req, res) => {
  const groupId = req.params.groupId;
  const ref = firebase.database().ref(`/messages/${groupId}`);
  ref.once('value', (data) => {
    const messages = getArray(data.val());
    res.status(200)
      .send(messages);
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
  const { group, username, userId } = req.body;
  const groupId = req.params.groupId;
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const promise = firebase.database()
      .ref(`group/${groupId}/users/${userId}`)
      .update({
        id: userId,
        name: username
      });
    firebase.database().ref(`/users/${userId}/groups`).push(
      {
        groupId,
        groupName: group,
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
