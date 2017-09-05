const getArray = require('../utils/getArray');

/**
 * This route gets Groups Created by User from the firebase Database
 * 
 * @param {*} app Makes use of express router
 * @param {*} firebase Makes use of the firebase Instance
 * @return {array} Array of Groups Created by User.
 */
module.exports = (app, firebase) => {
  app.get('/getGroup/:userUid', (req, res) => {
    const userUid = req.params.userUid;
    const ref = firebase.database().ref(`users/${userUid}/groups`);
    ref.once('value', (data) => {
      const groups = getArray(data.val());
      res.send(groups);
    }).catch((error) => {
      res.send(error);
    });
  });
};
