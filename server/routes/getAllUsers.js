const getArray = require('../utils/getArray');

module.exports = (app, firebase) => {
  app.get('/getUsers', (req, res) => {
    const ref = firebase.database().ref().child('users');
    ref.once('value', (data) => {
      const users = getArray(data.val());
      users.forEach((key, index) =>{
        console.log(key.id);
      });
      res.send(users);
    }).catch((error) => {
      res.send(error);
    });
  });
};
