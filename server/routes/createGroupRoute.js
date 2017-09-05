/**
 * This route creates Groups for Users
 * 
 * @param {*} app Makes use of express router
 * @param {*} firebase Makes use of the firebase Instance
 * @return {array} Results from post request.
 */

module.exports = (app, firebase) => {
  app.post('/group', (req, res) => {
    const currUser = firebase.auth().currentUser;
    if (currUser !== null) {
      const dbRef = firebase.database().ref('/group'),
        group = req.body.groupName,
        newGroupId = dbRef.push({
          groupName: group,
        }).key;
      firebase.database().ref(`/users/${currUser.uid}/groups`).push(
        {
          groupId: newGroupId,
          groupName: group,
          isAdmin: true
        });
      firebase.database().ref(`group/${newGroupId}/users/${currUser.uid}`)
        .update({
          id: currUser.uid,
          name: currUser.displayName
        })
        .then(() => {
          res.status(200);
          res.send({ message: `You Just Created a group called:${group}` });
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      res.status(400);
      res.send('Please sign In first!');
    }
  });
};
