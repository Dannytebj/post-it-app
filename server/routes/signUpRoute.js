const emailValidation = require('../utils/emailValidation');

/**
 * This route handles signUp Post 
 * Requests
 * 
 * @param {*} app Makes use of express router
 * @param {*} firebase Makes use of the firebase Instance
 * @return {*} results from post request
 */
module.exports = (app, firebase) => {
  app.post('/signUp', (req, res) => {
    const Email = req.body.email,
      password = req.body.password,
      userName = req.body.username,
      phonenumber = req.body.phoneNumber;
    let promise;
    if (!emailValidation(Email)) {
      res.status(400);
      res.send({ message: 'Please use a valid email address' });
    } else if (password === '') {
      res.status(400);
      res.send({ message: 'Please, you have not entered a password' });
    } else {
      promise = firebase.auth().createUserWithEmailAndPassword(Email, password)
        .then((user) => {
          user.updateProfile({
            displayName: userName,

          });
          user.sendEmailVerification()
            .then(() => {
              const uid = user.uid;
              firebase.database().ref(`/users/${uid}`).set(
                {
                  name: user.displayName,
                  id: user.uid,
                  email: Email,
                  phoneNumber: phonenumber
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
