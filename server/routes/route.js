const express = require('express'),
  firebase = require('firebase'),
  emailValidation = require('../utils/emailValidation');
// import express from 'express';
// import firebase from 'firebase';
// import emailValidation from '../utils/emailValidation';

const router = express.Router(),
  config = {
    apiKey: 'AIzaSyAyLQtYUNfRvMG7tqL85kto0Zv9l0H0xxk',
    authDomain: 'postitapp-f266c.firebaseapp.com',
    databaseURL: 'https://postitapp-f266c.firebaseio.com',
    projectId: 'postitapp-f266c',
    storageBucket: 'postitapp-f266c.appspot.com',
    messagingSenderId: '276992209544' };
//  Initialize Database
firebase.initializeApp(config);
const auth = firebase.auth(),
  db = firebase.database();

  // Router Controlling Authentication
router.use((err, req, res, next) => {
  //  add real time listner
  auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      res.send('Welcome to PostIt...');
    } else {
      res.status(401);
      res.send('You need to log in first!: ' + res.status(401));
    }
  });
  next();
});
router.post('/signUp', (req, res) => {
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
    promise = auth.createUserWithEmailAndPassword(email, password)
  .then((user) => {
    user.updateProfile({
      displayName: userName
    });
    user.sendEmailVerification()
    .then(() => {
      db.ref('/users/' + userName).update(
        {
          userId: user.uid,
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
 //  end of signUp.post
//  ROUTE THAT CREATES SIGN'S USER IN
router.post('/signIn', (req, res) => {
  const email = req.body.email,
    password = req.body.password,
    promise = auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      res.status(200).send({ message: 'User signed In successfully!' });
      auth.currentUser.getIdToken(true).then((userToken) => {
        console.log(userToken);
      }).catch((error) => {
        res.send(error);
      });
    });
  promise
  .catch((error) => {
    res.status(400).send(error);
  });
});
//  ROUTE THAT SIGN'S USER OUT
router.post('/signOut', (req, res) => {
  auth.signOut().then(() => {
  })
.catch((error) => {
  res.send(error.message);
});
  res.send('User signed Out');
});

// ROUTE THAT ALLOWS ONLY LOGGED IN USERS CREATE GROUP
router.post('/group', (req, res) => {
  const currUser = firebase.auth().currentUser;
  if (currUser) {
    const dbRef = db.ref('/group'),
      group = req.body.groupName,
      newGroupId = dbRef.push({
        groupName: group,
        createdBy: currUser.uid,
      }).key;
    db.ref('/users/' + currUser.displayName + '/groups').push(
      {
        groupId: newGroupId,
        groupName: group,
      });
    res.status(200);
    res.send('You Just Created a group called: ' + group);
  } else {
    res.status(400);
    res.send('You need to be signed In');
  }
});

//  ROUTE THAT ADDS USER TO A GROUP
router.post('/group/:groupId/users', (req, res) => {
  const currUser = firebase.auth().currentUser,
    groupId = req.params.groupId,
    userId = req.body.userId;
  if (currUser) {
    const promise = db.ref('group/' + groupId + '/users').push(
      { UserId: userId, }
    );
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

// ROUTE THAT ALLOWS USERS POST MESSAGES
router.post('/message/:groupId', (req, res) => {
  const currUser = firebase.auth().currentUser,
    message = req.body.message,
    groupId = req.params.groupId;
  if (currUser) {
    const userId = currUser.uid;
    const messagekey = db.ref('messages/' + groupId).push(
      { Id: userId,
        messageBody: {
          message,
        }
      }
    ).key;
    const promise = db.ref('group/' + groupId + '/messages').push({
      Id: userId,
      messageKey: messagekey
    }
    ).then(() => {
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


module.exports = router;
