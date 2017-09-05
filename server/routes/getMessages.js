const getArray = require('../utils/getArray');

/**
 * This route gets Messages from the firebase Database
 *
 * 
 * @param {*} app Makes use of express router
 * @param {*} firebase Makes use of the firebase Instance
 * @return {array} Array of Messages.
 */
module.exports = (app, firebase) => {
  app.get('/getMessages/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const ref = firebase.database().ref(`/messages/${groupId}`);
    ref.once('value', (data) => {
      const messages = getArray(data.val());
      res.send(messages);
    })
      .catch((error) => {
        res.send(error);
      });
  });
};
