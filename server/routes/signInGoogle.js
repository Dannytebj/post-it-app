/**
 * This route handles Google signIn Post 
 * Requests
 * 
 * @param {*} app Makes use of express router
 * @param {*} firebase Makes use of the firebase Instance
 * @return {*} results from post request
 */

module.exports = (app, firebase) => {
  app.post('/signIn/google', (req, res) => {
    const idToken = req.body.idToken;
    const provider = new firebase.auth.GoogleAuthProvider.credential(idToken);

    firebase.auth().signInWithCredential(provider)
      .then((googleUser) => {
        res.send({ user: googleUser });
      })
      .catch((error) => {
        res.status(401);
        res.send(`Failed to signIn User:${error.message}`);
      });
  });
};
