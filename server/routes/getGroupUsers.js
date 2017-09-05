const getArray = require('../utils/getArray');
/**
 * This route handles get request to Group table 
 * 
 * @param {*} app Makes use of express router
 * @param {*} firebase Makes use of the firebase Instance
 * @return {array} Returns an Array of users not in group
 */
// Returns an Array of users not in group
module.exports = (app, firebase) => {
  app.get('/getGroupUsers/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const ref = firebase.database().ref(`group/${groupId}/users`);
    const ref1 = firebase.database().ref().child('users');

    ref.once('value', (data) => {
      const groupUsers = data.val();
      const newArr = getArray(groupUsers);
      ref1.once('value', (data1) => {
        const allUsers = getArray(data1.val());
        const filtered = allUsers.filter((userInAllUsers) => {
          return !newArr.some((userInGroup) => {
            return userInAllUsers.id === userInGroup.id;
          });
        }
        );
        res.send(filtered);
      })
        .catch((error) => {
          res.send(error);
        });
    });
  });
};
