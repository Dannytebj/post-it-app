const signInRoute = require('./signInRoute');
const signUpRoute = require('./signUpRoute');
const googleSignIn = require('./signInGoogle');
const createGroup = require('./createGroupRoute');
const addUserRoute = require('./addUserRoute');
const messageRoute = require('./messageRoute');
<<<<<<< HEAD
const editProfile = require('./editUserProfile');
=======
>>>>>>> 6ea970e1ca388c19e6d58ae1ef7e62fac43a3ecf
const signOutRoute = require('./signOutRoute');
const getAllUsers = require('./getAllUsers');
const getGroups = require('./getGroups');
const getGroupUsers = require('./getGroupUsers');
const getMessages = require('./getMessages');

module.exports = (app, firebase) => {
  app.use((err, req, res, next) => {
  //  add real time listner
    firebase.auth().onAuthStateChanged((currUser) => {
      if (currUser) {
        res.send('Welcome to PostIt...');
      } else {
        res.status(401);
<<<<<<< HEAD
        res.send(`You need to log in first :${res.status(401)}`);
=======
        res.send('You need to log in first!: ' + res.status(401));
>>>>>>> 6ea970e1ca388c19e6d58ae1ef7e62fac43a3ecf
      }
    });
    next();
  });

<<<<<<< HEAD
  // END POINTS FOR POST-IT APP
  //  Post Routes
=======
  //  Post Routes

>>>>>>> 6ea970e1ca388c19e6d58ae1ef7e62fac43a3ecf
  signInRoute(app, firebase);
  signUpRoute(app, firebase);
  googleSignIn(app, firebase);
  createGroup(app, firebase);
  addUserRoute(app, firebase);
  messageRoute(app, firebase);
  signOutRoute(app, firebase);
<<<<<<< HEAD
  editProfile(app, firebase);
=======
>>>>>>> 6ea970e1ca388c19e6d58ae1ef7e62fac43a3ecf

  // Get Routes

  getAllUsers(app, firebase);
  getGroupUsers(app, firebase);
  getGroups(app, firebase);
  getMessages(app, firebase);
};
