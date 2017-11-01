import firebase from 'firebase';

const getArray = require('../utils/getArray');
const sendEmail = require('./sendEmail');
const sendSms = require('./sendSms');
/**
 * This module uses userId in groups table to 
 * iterate through users table and return user details
 * @param {string} groupId 
 * @param {string} priority 
 * @return {array} An array of User emails
 */
const SendNotification = (groupId, priority) => {
  const emails = [];
  const phoneNumbers = [];
  const ref = firebase.database().ref(`group/${groupId}/users`);
  const ref1 = firebase.database().ref().child('users');
  ref.once('value', (fetchedUsers) => {
    const groupUsers = fetchedUsers.val();
    const newArr = getArray(groupUsers);
    ref1.once('value', (allUsersFetched) => {
      const allUsers = getArray(allUsersFetched.val());
      const filtered = allUsers.filter(currentUser => 
        newArr.some(usersInGroup =>  currentUser.id === usersInGroup.id));
      filtered.map(user => emails.push(user.email));
      filtered.map(user => phoneNumbers.push(user.phoneNumber));
      sendSms(phoneNumbers, priority);
      sendEmail(emails, priority);
    });
  });
};
module.exports = SendNotification;
