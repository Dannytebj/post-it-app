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
// const db = firebase.database(),
//   userRef = db.ref('users');

router.use((req, res, next) => {
  console.log('Welcome!');
      //  aunthentication
  next();
});
router.post('/signUp', (req, res) => {
  const email = req.body.email,
    password = req.body.password;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    firebase.database().ref('users').push({
      userEmail: email,
      userPassword: password
    });
    res.send('Message: User Succesfully created!');
  }
  )
.catch((error) => {
  if (error) {
    res.send(error.code);
  } else {
    res.send(error);
  }
});
}); //  end of router.post
module.exports = router;
