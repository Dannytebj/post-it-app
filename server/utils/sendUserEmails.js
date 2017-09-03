const getArray = require('../utils/getArray');
const sendEmail = require('./sendEmail');
/**
 * This module uses userId in groups table to 
 * iterate through users table and return user details
 * @param {*} groupId 
 * @param {*} firebase 
 * @param {*} priority 
 * @return {array} An array of User emails
 */
const getUserEmail = (groupId, firebase, priority) => {
  const emails = [];
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
      //  Send email to users based on priority!
      sendEmail(emails, priority);
    });
  });
};
module.exports = getUserEmail;
