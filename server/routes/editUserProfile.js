module.exports = (app, firebase) => {
  app.post('/updateProfile', (req, res) => {
    const user = firebase.auth().currentUser;
    const newName = req.body.newName;
    const profilePic = req.body.profilePic;
    user.updateProfile({
      displayName: newName,
      photoURL: profilePic,
    })
      .then(() => {
        firebase.database().ref(`users/${user.uid}`)
          .update({
            id: user.uid,
            name: newName,
            photoURL: profilePic,
          })
          .then(() => {
            res.status(200);
            res.send('Your profile has been successfully Updated!');
          });
      })
      .catch((error) => {
        res.status(error.code);
        res.send(`there was an error: ${error}`);
      });
  });
};
