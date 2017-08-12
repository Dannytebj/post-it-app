
module.exports = (app, firebase) => {
  app.post('/signIn', (req, res) => {
<<<<<<< HEAD
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.emailVerified === true) {
          const username = user.displayName;
          const uid = user.uid;
=======
    const email = req.body.email,
      password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.emailVerified === true) {
          const username = user.displayName,
            uid = user.uid;
>>>>>>> 6ea970e1ca388c19e6d58ae1ef7e62fac43a3ecf
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
