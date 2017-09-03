const getArray = require('../utils/getArray');

/**
 * This route gets all Users details from the firebase Database
 * 
 * @param {*} app Makes use of express router
 * @param {*} firebase Makes use of the firebase Instance
 * @return {array} Array of Groups Created by User.
 */
module.exports = (app, firebase) => {
  app.get('/getUsers', (req, res) => {
    const ref = firebase.database().ref().child('users');
    ref.once('value', (data) => {
      const users = getArray(data.val());
      res.send(users);
    }).catch((error) => {
      res.send(error);
    });
  });
};
