/**
 * This route handles signOut Post 
 * Request
 * 
 * @param {*} app Makes use of express router
 * @param {*} firebase Makes use of the firebase Instance
 * @return {*} results from post request
 */

module.exports = (app, firebase) => {
  app.post('/signOut', (req, res) => {
    firebase.auth().signOut()
      .catch((error) => {
        res.send(error.message);
      });
    res.send('User signed Out');
  });
};
