module.exports = (app, firebase) => {
  app.post('/group/:groupId/users', (req, res) => {
    const groupId = req.params.groupId,
      currentUser = firebase.auth().currentUser,
      userId = req.body.userId;
    if (currentUser) {
      const promise = firebase.database()
      .ref(`group/${groupId}/users/${userId}`)
      .update({
        id: userId
      });
      promise.then(() => {
        res.status(200);
        res.send('Your group has a new User ');
      });
      promise.catch((error) => {
        res.status(400);
        res.send(error.message);
      });
    } else {
      res.status(401);
      res.send('You need to be signed In');
    }
  });
};
