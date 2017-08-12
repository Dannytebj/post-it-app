module.exports = (app, firebase) => {
  app.post('/message/:groupId', (req, res) => {
    const message = req.body.message,
      currUser = firebase.auth().currentUser,
      groupId = req.params.groupId;
    if (currUser) {
      const userId = currUser.uid;
      const username = currUser.displayName;
      const messagekey = firebase.database().ref(`messages/${groupId}`)
      .push({
        id: userId,
        name: username,
        messages: message
      }).key;
      const promise = firebase.database().ref(`group/${groupId}/messages`)
      .push({
        id: userId,
        messageKey: messagekey
      })
      .then(() => {
        res.status(200);
        res.send('Your message was posted successfully!');
      });
      promise.catch((error) => {
        res.status(400);
        res.send({ message: 'Unfortunately,Your message was not posted' },
        error.message);
      });
    } else {
      res.status(401);
      res.send({ message: 'You need to be signed In' });
    }
  });
};
