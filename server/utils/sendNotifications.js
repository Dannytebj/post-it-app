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
      const filtered = allUsers.filter((el) => {
        return newArr.some((usersInGroup) => {
          return el.id === usersInGroup.id;
        });
      });
      filtered.map((user, index) => {
        return emails.push(user.email);
      });
      filtered.map((user,index) => {
        return phoneNumbers.push(user.phoneNumber);
      });
      console.log(phoneNumbers, emails);
      //  Send email to users based on priority!
      if (priority === 'Urgent' || priority === 'Critical') {
        sendEmail(emails, priority);
      } else if (priority === 'Critical') {
        // SendSMS(phoneNumbers)
        sendSms(phoneNumbers);
      }
      sendEmail(emails, priority);
    });
  });
};
module.exports = SendNotification;
