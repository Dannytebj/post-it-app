const getArray = require('../utils/getArray');

module.exports = (app, firebase) => {
  app.get('/getGroup/:userUid', (req, res) => {
    const userUid = req.params.userUid;
    const ref = firebase.database().ref('users/' + userUid + '/groups');
    ref.once('value', (data) => {
      const groups = getArray(data.val());
      res.send(groups);
    }).catch((error) => {
      res.send(error);
    });
  });
};
