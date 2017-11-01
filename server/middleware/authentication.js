import dbConfig from '../config/config';

// const authenticateUser = () => new Promise((resolve) => {
//   dbConfig.auth().onAuthStateChanged((currentUser) => {
//     if (currentUser) {
//       resolve(currentUser);
//     }
//     resolve({});
//   });
// });
// ===========Authentication function=================== //
// const isAuthenticated = () => new Promise((resolve) => {
//   dbConfigAuth.onAuthStateChanged((currentUser) => {
//     if (currentUser) {
//       resolve(currentUser);
//     }
//     resolve({});
//   });
// });

const isAuthenticated = (req, res, next) => {
  const user = dbConfig.auth().currentUser;
  if (user !== null) {
    req.user = user;
    next();
  } else {
    res.redirect('/signIn');
  }
};

export default isAuthenticated;
