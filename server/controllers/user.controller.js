
const firebase = require('firebase');
const emailValidation = require('../utils/emailValidation');

/**
 * This Controller exports controllers for the user endpoints
 * @param {*} req User Requests
 * @param {*} res Server Responses
 */

// ============ Controller for Signing Up Users ============
export const signUp = (req, res) => {
  const { email, password, username, phoneNumber } = req.body;
  let promise;
  if (!emailValidation(email)) {
    res.status(400)
      .send({ error: 'Please use a valid email address' });
  } else if (password === '') {
    res.status(400)
      .send({ error: 'Please, you have not entered a password' });
  } else {
    promise = firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.updateProfile({
          displayName: username,
        })
          .then(() => {
            const userUid = user.uid;
            const username = user.displayName;            
            firebase.database().ref(`/users/${userUid}`).set(
              {
                name: username,
                id: userUid,
                email,
                phoneNumber,
              },
            );
            res.status(201)
              .send({ message: 'User Succesfully created!',
                username,
                userUid,
              });
          });
      });
    promise.catch((error) => {
      res.status(400).send({ error: error.message });
    });
  }
};
// ============ Controller that Sign's In Users ============
export const signIn = (req, res) => {
  const { email, password } = req.body;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      const username = user.displayName;
      const userUid = user.uid;
      res.send({
        message: 'User Logged In Successfully!',
        username,
        userUid,
      });
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        res.status(404)
          .send({ message: 'Sorry!, User not found!!, Kindly SignUp first' });
      } else if (error.code === 'auth/wrong-password') {
        res.status(422)
          .send({ message: 'Hey! you have provided an invalid password!!' });
      } else {
        res.status(400).send({ message: error.message });
      }
    });
};

// =========== Controller that Sign's out  Registered User===========
export const signOut = (req, res) => {
  firebase.auth().signOut()
    .then(() => {
      res.status(200)
        .send({ message: 'User signed Out' });
    })
    .catch((error) => {
      res.status(500)
        .send({ message: error.message });
    });
};

// =========== Controller for Google SignIn===========
export const signInWithGoogle = (req, res) => {
  const idToken = req.body.idToken;
  const provider = new firebase.auth.GoogleAuthProvider.credential(idToken);
  firebase.auth().signInWithCredential(provider)
    .then((googleUser) => {
      res.send({ user: googleUser });
    })
    .catch((error) => {
      res.status(401);
      res.send({ message: error.message });
    });
};

// ============ Controller for Password Reset ===========
export const resetPassword = (req, res) => {
  const emailAddress = req.body.email;
  if (!emailValidation(emailAddress)) {
    res.status(400)
      .send({ error: 'Please use a valid email address' });
  } else {
    firebase.auth().sendPasswordResetEmail(emailAddress)
      .then(() => {
        res.status(200)
          .send({
            message: 'A mail has been sent to the email address provided',
          });
      }).catch((error) => {
        res.status(500)
          .send({ message: error.message });
      });
  }
};
