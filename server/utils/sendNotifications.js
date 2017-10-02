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
  ref.once('value', (data) => {
    const groupUsers = data.val();
    const newArr = getArray(groupUsers);
    ref1.once('value', (data1) => {
      const allUsers = getArray(data1.val());
      const filtered = allUsers.filter((el) => {  // eslint-disable-line
        return newArr.some((usersInGroup) => {  // eslint-disable-line
          return el.id === usersInGroup.id;
        });
      });
      filtered.map((user, index) => {  // eslint-disable-line
        return emails.push(user.email);
      });
      filtered.map((user,index) => { // eslint-disable-line
        return phoneNumbers.push(user.phoneNumber);
      });
      sendSms(phoneNumbers, priority);
      sendEmail(emails, priority);
    });
  });
};
module.exports = SendNotification;
