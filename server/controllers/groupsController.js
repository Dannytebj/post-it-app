import firebase from 'firebase';
import moment from 'moment';
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
  if (userUid !== '') {
    const normalizedName = convertCase(groupName);
    const groupNameArray = [];
    const groupRef = firebase.database().ref(`users/${userUid}/groups`); 
    const dbRef = firebase.database().ref('/group');  
    groupRef.once('value', (groups) => {
      groups.forEach((child) => {
        const currentGroupName = child.val().groupName;
        groupNameArray.push(currentGroupName);
      });
      const uniqueName = groupNameArray
        .find(groupNames => groupNames === normalizedName);
      if (uniqueName) {
        res.status(409)
          .send({ message: 'Sorry, This group name already exists' });
      } else {
        const newGroupId = dbRef.push({
          groupName: normalizedName,
        }).key;
        firebase.database().ref(`/users/${userUid}/groups`).push(
          {
            groupId: newGroupId,
            groupName: normalizedName,
            isAdmin: true,
          });
        firebase.database().ref(`group/${newGroupId}/users/${userUid}`)
          .update({
            id: userUid,
            name: userName,
          })
          .then(() => {
            res.status(201)
              .send({ 
                message: `You Just Created a group called: ${normalizedName}` });
          })
          .catch((error) => {
            res.send({ message: error.message });
          });
      } 
    });
  } else {
    res.status(401)
      .send({ message: 'Please sign In first!' });
  }
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
      ref1.once('value', (allUsers) => {
        const fetchedUsers = allUsers.val();
        if (allUsers !== null) {
          const allUsersArray = getArray(fetchedUsers);
          const filteredUsers = allUsersArray.filter(userInAllUsers => 
            groupUsersArray.some(
              userInGroup => userInAllUsers.id === userInGroup.id),
          );
          res.status(200)
            .send({
              message: 'Users fetched successfully',
              groupUser: filteredUsers,
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

// ===========controller gets all users not in a particular group =========
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
      ref1.once('value', (allUsers) => {
        const fetchedUsers = allUsers.val();
        if (fetchedUsers !== null) {
          const allUsersArray = getArray(fetchedUsers);
          const filteredUsers = allUsersArray.filter(userInAllUsers => 
            !groupUsersArray.some(
              userInGroup => userInAllUsers.id === userInGroup.id),
          );
          res.status(200)
            .send({
              message: 'Users fetched successfully',
              allUsers: filteredUsers,
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
  ref.once('value', (fetchedMessages) => {
    const allMessages = fetchedMessages.val();
    if (allMessages !== null) {
      const messages = getArray(allMessages);
      res.status(200)
        .send({ message: 'messages fetched successfully', messages });
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
  const timeStamp = moment().format('llll');
  if (id) {
    const messageKey = firebase.database().ref(`messages/${groupId}`)
      .push({
        id,
        name,
        message,
        priority,
        timeStamp,
      }).key;
    const promise = firebase.database().ref(`group/${groupId}/messages`)
      .push({
        id,
        messageKey,
      })
      .then(() => {
        // const payload = { id, message, name, priority, timeStamp };
        // io.emit(`newMessage${groupId}`, payload);
        if (priority === 'Urgent' || priority === 'Critical') {
          SendNotification(groupId, priority);
        }
        res.status(200)
          .send({ message: 'Your message was posted successfully!', timeStamp });
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
      .send({ message: 'Users fetched Successfully', users });
  }).catch((error) => {
    res.send({ message: error.message });
  });
};
//  ============Controller Adds user to group ============ 
export const addUser = (req, res) => {
  const { groupName, name, id } = req.body;
  const groupId = req.params.groupId;
  if (id) {
    firebase.database()
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
      })
      .then(() => {
        res.status(200);
        res.send({ message: 'Your group has a new User' });
      })
      .catch((error) => {
        res.status(400);
        res.send({ message: error.message });
      });
  } else {
    res.status(401);
    res.send({ message: 'You need to be signed In' });
  }
};
