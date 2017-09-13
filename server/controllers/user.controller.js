// import { dbConfigDb, dbConfigAuth } from '../config/config';

const firebase = require('firebase');
// const dbConfig = require('../config/config');
const emailValidation = require('../utils/emailValidation');

/**
 * This Controller exports controllers for the user endpoints
 * @param {*} req 
 * @param {*} res 
 */

// ============ Controller for Signing Up Users ============
export const signUp = (req, res) => {
  const { email, password, userName, phoneNumber } = req.body;
  let promise;
  if (!emailValidation(email)) {
    res.status(400)
      .send({ message: 'Please use a valid email address' });
  } else if (password === '') {
    res.status(400)
      .send({ message: 'Please, you have not entered a password' });
  } else {
    promise = firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.updateProfile({
          displayName: userName,
        })
          .then(() => {
            const uid = user.uid;
            firebase.database().ref(`/users/${uid}`).set(
              {
                name: user.displayName,
                id: user.uid,
                email,
                phoneNumber
              }
            );
            res.status(201)
              .send('Message: User Succesfully created!');
          });
      });
    promise.catch((error) => {
      res.status(400).send({ message: error });
    });
  }
};
// ============ Controller that Sign's In Users ============
export const signIn = (req, res) => {
  const { email, password } = req.body;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      const username = user.displayName;
      const uid = user.uid;
      res.json({ message: 'User Logged In Successfully!',
        userName: username,
        userUid: uid });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

// =========== Controller that Sign's out  Registered User===========
export const signOut = (req, res) => {
  firebase.auth().signOut()
    .then(() => {
      res.status(200)
        .send('User signed Out');
    })
    .catch((error) => {
      res.status(400)
        .send(error.message);
    });
};

// =========== Controller for editing Registered User===========
export const editProfile = (req, res) => {
  const user = firebase.auth().currentUser;
  const { newName, profilePic } = req.body;
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
      res.send(`Failed to signIn User:${error.message}`);
    });
};
