import dbConfig from '../config/config';

const authenticateUser = () => new Promise((resolve) => {
  dbConfig.auth().onAuthStateChanged((currentUser) => {
    if (currentUser) {
      resolve(currentUser);
    }
    resolve({});
  });
});

export default authenticateUser;
