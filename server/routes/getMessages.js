const getArray = require('../utils/getArray');

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
