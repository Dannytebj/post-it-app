import firebase from 'firebase';
import getArray from '../utils/getArray';
import SendNotification from '../utils/sendNotifications';
import convertCase from '../utils/convertCase';
import io from '../utils/socketConfig';

/**
 * This file exports all controllers for the group 
 * endpoints
 * @param {*} req 
 * @param {*} res 
 */

// ============Controller for Creating Groups ============

export const createGroup = (req, res) => {
  const { userUid, userName, groupName } = req.body;
  const convertedName = convertCase(groupName);
  const groupNameArray = [];
  const groupRef = firebase.database().ref(`users/${userUid}/groups`); 
  const dbRef = firebase.database().ref('/group');  
  groupRef.once('value', (data) => {
    data.forEach((child) => {
      const eachName = child.val().groupName;
      groupNameArray.push(eachName);
    });
    const uniqueName = groupNameArray
      .find(groupname => groupname === convertedName);
    if (uniqueName) {
      res.status(409)
        .send({ message: `${uniqueName} is already a group name na` });
    } else if (userUid !== null) {
      const newGroupId = dbRef.push({
        groupName: convertedName,
      }).key;
      firebase.database().ref(`/users/${userUid}/groups`).push(
        {
          groupId: newGroupId,
          groupName: convertedName,
          isAdmin: true,
        });
      firebase.database().ref(`group/${newGroupId}/users/${userUid}`)
        .update({
          id: userUid,
          name: userName,
        })
        .then(() => {
          res.status(200)
            .send({ 
              message: `You Just Created a group called: ${convertedName}` });
        })
        .catch((error) => {
          res.send({ message: error.message });
        });
    } else {
      res.status(400);
      res.send({ message: 'Please sign In first!' });
    }
  });
};

//  ============ Controller that Gets all groups created  ============
export const getGroups = (req, res) => {
  const userUid = req.params.userUid;
  const ref = firebase.database().ref(`users/${userUid}/groups`);
  ref.once('value', (data) => {
    const groupList = data.val();
    if (groupList === null) {
      res.status(200)
        .send({ message: 'You do not belong to any group yet' });
    } else {
      const groups = getArray(groupList);
      res.status(200)
        .send({ message: 'groups fetched successfully!', groups });
    }
  }).catch((error) => {
    res.status(500)
      .send({ message: error.message });
  });
};

// ===========controller gets the users in a particular group ============
export const getGroupUsers = (req, res) => {
  const groupId = req.params.groupId;
  const ref = firebase.database().ref(`group/${groupId}/users`);
  const ref1 = firebase.database().ref().child('users');

  ref.once('value', (users) => {
    const groupUsers = users.val();
    if (groupUsers === null) {
      res.status(200)
        .send({ message: 'This group has no user yet!' });
    } else {
      const groupUsersArray = getArray(groupUsers);
      ref1.once('value', (users2) => {
        const usersGotten = users2.val();
        if (users2 !== null) {
          const allUsers = getArray(usersGotten);
          const filtered = allUsers.filter(userInAllUsers => 
            groupUsersArray.some(
              userInGroup => userInAllUsers.id === userInGroup.id),
          );
          res.status(200)
            .send({
              message: 'Users fetched successfully',
              groupUser: filtered,
            });
        }
      })
        .catch((error) => {
          res.status(400)
            .send({ message: error.message });
        });
    }
  });
};

// ===========controller gets the all users not in a particular group =========
export const notGroupUsers = (req, res) => {
  const groupId = req.params.groupId;
  const ref = firebase.database().ref(`group/${groupId}/users`);
  const ref1 = firebase.database().ref().child('users');
  ref.once('value', (users) => {
    const groupUsers = users.val();
    if (groupUsers === null) {
      res.status(200)
        .send({ message: 'This group has no user yet!' });
    } else {
      const groupUsersArray = getArray(groupUsers);
      ref1.once('value', (users2) => {
        const usersGotten = users2.val();
        if (usersGotten !== null) {
          const allUsers = getArray(usersGotten);
          const filtered = allUsers.filter(userInAllUsers => 
            !groupUsersArray.some(
              userInGroup => userInAllUsers.id === userInGroup.id),
          );
          res.status(200)
            .send({
              message: 'Users fetched successfully',
              allUsers: filtered,
            });
        }
      })
        .catch((error) => {
          res.status(400)
            .send({ message: error.message });
        });
    }
  });
};

//  ============ Controller that get's Messages ============
export const getMessages = (req, res) => {
  const groupId = req.params.groupId;
  const ref = firebase.database().ref(`/messages/${groupId}`);
  ref.once('value', (msgData) => {
    const mesResponse = msgData.val();
    if (mesResponse !== null) {
      const messages = getArray(mesResponse);
      res.status(200)
        .send({ messages });
    } else {
      res.status(200)
        .send({ message: 'There are no Messages!' });
    }
  })
    .catch((error) => {
      res.send({ message: error.message });
    });
};

//  ============ Controller that post's messages ============
export const postMessage = (req, res) => {
  const { message, priority, groupId, id, name } = req.body;
  // const currUser = firebase.auth().currentUser;
  if (id) {
    const messageKey = firebase.database().ref(`messages/${groupId}`)
      .push({
        id,
        name,
        message,
        priority,
      }).key;
    const promise = firebase.database().ref(`group/${groupId}/messages`)
      .push({
        id,
        messageKey,
      })
      .then(() => {
        if (priority === 'Urgent' || priority === 'Critical') {
          SendNotification(groupId, priority);
        }
        res.status(200)
          .send({ message: 'Your message was posted successfully!' });
        const payload = { id, message, name };
        io.emit(`newMessage${groupId}`, payload);
      });
    promise.catch((error) => {
      res.status(400)
        .send({ message: error.message });
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
    res.send({ message: error.message });
  });
};
//  ============Controller Adds user to group ============ 
export const addUser = (req, res) => {
  const { groupName, name, id } = req.body;
  const groupId = req.params.groupId;
  if (id) {
    const promise = firebase.database()
      .ref(`/group/${groupId}/users/${id}`)
      .update({
        id,
        name,
      });
    firebase.database().ref(`/users/${id}/groups`).push(
      {
        groupId,
        groupName,
        isAdmin: false,
      });
    promise.then(() => {
      res.status(200);
      res.send({ message: 'Your group has a new User ' });
    });
    promise.catch((error) => {
      res.status(400);
      res.send({ message: error.message });
    });
  } else {
    res.status(401);
    res.send({ message: 'You need to be signed In' });
  }
};
