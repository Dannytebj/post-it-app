module.exports = (app, firebase) => {
  app.post('/signOut', (req, res) => {
    firebase.auth().signOut()
  .catch((error) => {
    res.send(error.message);
  });
    res.send('User signed Out');
  });
};
