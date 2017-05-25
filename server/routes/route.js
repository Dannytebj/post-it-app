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
const auth = firebase.auth();
// const db = firebase.database(),
//   userRef = db.ref('users');

router.use((req, res, next) => {
  console.log('Welcome!');
      //  aunthentication
  next();
});
router.post('/signUp', (req, res) => {
  const email = req.body.email,
    password = req.body.password,
    promise = auth.createUserWithEmailAndPassword(email, password)
  .then(() => {
    firebase.database().ref('users').push({
      userEmail: email,
      userPassword: password
    });
  });
  promise
  .catch(error => console.log(error.message));
  res.send('Message: User Succesfully created!');
}); //  end of signUp.post

router.post('/signIn', (req, res) => {
  const email = req.body.email,
    password = req.body.password,
    promise = auth.signInWithEmailAndPassword(email, password);
  res.send('user logged in successfully');
  promise.catch(error => console.log(error.message));
});

router.post('/signOut', (req, res) => {
  auth.signOut().then(() => {
  })
.catch(error => console.log(error.message));
  res.send('User signed Out');
});


router.post('/group', (req, res) => {
  const currUser = firebase.auth().currentUser;
  if (currUser) {
    const db = firebase.database().ref(),
      groupName = req.body.groupName;
      // Ref = db.ref('users'),
      // userRef = Ref.child(groupName);
    // const currRef = firebase.database().ref.child('users'),
    db.push({
      groupName: {
        ownerId: currUser.uid,
        message: 'Wetin dey',
      }
    });

    console.log('We have a User ');
    res.send(currUser.uid);
  } else {
    console.log('Nobody is signed in!');
  }
});
//  add real time listner
auth.onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    console.log('he is signed In');
  } else {
    console.log('not logged In');
  }
});

module.exports = router;
