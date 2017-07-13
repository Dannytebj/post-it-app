const express = require('express'),
  firebase = require('firebase');

const getArray = (data) => {
  return Object.keys(data).map((key) => {
    return data[key];
  });
};
const getKeys = (data) => {
  return Object.keys(data).map((key) => {
    return key;
  });
};


const router = express.Router();

router.get('/getUsers', (req, res) => {
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


router.get('/getGroup/:userUid', (req, res) => {
  const userUid = req.params.userUid;
  const ref = firebase.database().ref('users/' + userUid + '/groups');
  ref.once('value', (data) => {
    const groups = getArray(data.val());
    res.send(groups);
  }).catch((error) => {
    res.send(error);
  });
});

router.get('/getGroupUsers/:groupId', (req, res) => {
  const groupId = req.params.groupId;
  const ref = firebase.database().ref('group/' + groupId + '/users');
  const ref1 = firebase.database().ref().child('users');

  ref.once('value', (data) => {
    const groupUsers = data.val();
    const newArr = getKeys(groupUsers);
    ref1.once('value', (data1) => {
      // const genUsers = getArray(data1.val());
      const allUsers = getKeys(data1.val());
      const filtered = newArr.filter(x => allUsers.indexOf(x) === -1)
      .concat(allUsers.filter(x => newArr.indexOf(x) === -1));
      res.send(filtered);
    });
  })
  .catch((error) => {
    res.send(error);
  });
});
module.exports = router;

