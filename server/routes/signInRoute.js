
module.exports = (app, firebase) => {
  app.post('/signIn', (req, res) => {
    const email = req.body.email,
      password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.emailVerified === true) {
          const username = user.displayName,
            uid = user.uid;
          res.json({ message: 'User Logged In Successfully!',
            userName: username,
            userUid: uid });
        } else {
          res.send('Please Verify your Account First Thanks');
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });
};
