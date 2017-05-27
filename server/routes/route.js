const express = require('express'),
  firebase = require('firebase'),
  router = express.Router();

const config = {
  apiKey: 'AIzaSyAyLQtYUNfRvMG7tqL85kto0Zv9l0H0xxk',
  authDomain: 'postitapp-f266c.firebaseapp.com',
  databaseURL: 'https://postitapp-f266c.firebaseio.com',
  projectId: 'postitapp-f266c',
  storageBucket: 'postitapp-f266c.appspot.com',
  messagingSenderId: '276992209544'
};
firebase.initializeApp(config);
const auth = firebase.auth(),
  db = firebase.database();
  // Router Controlling Authentication
router.use((req, res, next) => {
  //  add real time listner
  auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log('he is signed In');
    } else {
      console.log('not logged In');
    }
  });
  next();
});
router.post('/signUp', (req, res) => {
  const email = req.body.email,
    password = req.body.password,
    userName = req.body.username,
    promise = auth.createUserWithEmailAndPassword(email, password)
  .then((user) => {
    user.updateProfile({
      displayName: userName
    }).then(() => {
      db.ref('/users/' + userName).push(
        {
          userId: user.uid,
        }
      );
      res.send('Message: User Succesfully created!');
    });
  });
  promise
  .catch(error => res.send(error.message));
});  //  end of signUp.post

//  ROUTE THAT CREATES SIGN'S USER IN
router.post('/signIn', (req, res) => {
  const email = req.body.email,
    password = req.body.password,
    promise = auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      res.send('user logged in successfully');
    });
  promise
  .catch((error) => {
    res.send(error.message);
    console.log(error.message);
  });
});
//  ROUTE THAT SIGN'S USER OUT
router.post('/signOut', (req, res) => {
  auth.signOut().then(() => {
  })
.catch(error => console.log(error.message));
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
    console.log('you have created a new group ');
    res.send('You Just Created ' + group);
  } else {
    res.send('Nobody is signed In');
    console.log('Nobody is signed in!');
  }
});

//  ROUTE THAT ADDS USER TO A GROUP
router.post('/group/:groupId/user', (req, res) => {
  const currUser = firebase.auth().currentUser,
    groupId = req.params.groupId,
    userId = req.body.userId;
  if (currUser) {
    db.ref('group/'+ groupId).push(
      {
        newUser: userId,
      }
    );
    // const userId = req.body.userId,
    // const groupRef = db.ref('group/');
    // groupRef.child(groupId).update({
    //   user: userId,
    // });
    console.log('Your group has a new User ');
    res.send('Your group has a new User ');
  } else {
    res.send('Nobody is signed In');
    console.log('Nobody is signed in!');
  }
});


module.exports = router;
