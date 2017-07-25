const emailValidation = require('../utils/emailValidation');

module.exports = (app, firebase) => {
  app.post('/signUp', (req, res) => {
    const email = req.body.email,
      password = req.body.password,
      userName = req.body.username;
    let promise;
    if (!emailValidation(email)) {
      res.status(400);
      res.send({ message: 'Please use a valid email address' });
    } else if (password === '') {
      res.status(400);
      res.send({ message: 'Please, you have not entered a password' });
    } else {
      promise = firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    user.updateProfile({
      displayName: userName,
    });
    user.sendEmailVerification()
    .then(() => {
      const uid = user.uid;
      firebase.database().ref('/users/' + uid).set(
        {
          name: user.displayName,
          id: user.uid
        }
      );
      res.send('Message: User Succesfully created!');
    });
  });
      promise.catch((error) => {
        res.status(400).send({ message: error });
      });
    }
  });
};
