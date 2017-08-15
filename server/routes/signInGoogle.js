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
