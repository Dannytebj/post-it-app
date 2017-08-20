const sendUserEmails = require('../utils/sendUserEmails');
// const getArray = require('../utils/getArray.js');
module.exports = (app, firebase) => {
  app.post('/message/:groupId', (req, res) => {
    const message = req.body.message,
      currUser = firebase.auth().currentUser,
      priority = req.body.priority,
      groupId = req.params.groupId;
    if (currUser) {
      const userId = currUser.uid;
      const username = currUser.displayName;
      const messagekey = firebase.database().ref(`messages/${groupId}`)
        .push({
          id: userId,
          name: username,
          messages: message,
          Priority: priority
        }).key;
      const promise = firebase.database().ref(`group/${groupId}/messages`)
        .push({
          id: userId,
          messageKey: messagekey
        })
        .then(() => {
          if (priority === 'Urgent' || priority === 'Critical') {
            sendUserEmails(groupId, firebase, priority);
          }
          res.status(200).send('Your message was posted successfully!');
        });
      promise.catch((error) => {
        res.status(400)
          .send({ message: 'Unfortunately,Your message was not posted' },
            error.message);
      });
    } else {
      res.status(401);
      res.send({ message: 'You need to be signed In' });
    }
  });
};
