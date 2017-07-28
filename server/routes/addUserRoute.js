module.exports = (app, firebase) => {
  app.post('/group/:groupId/users', (req, res) => {
    const groupid = req.params.groupId,
      currentUser = firebase.auth().currentUser,
      group = req.body.groupName,
      username = req.body.name,
      userId = req.body.userId;

    if (currentUser) {
      const promise = firebase.database()
      .ref(`group/${groupid}/users/${userId}`)
      .update({
        id: userId,
        name: username
      });
      firebase.database().ref('/users/' + userId + '/groups').push(
        {
          groupId: groupid,
          groupName: group,
          isAdmin: false
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
