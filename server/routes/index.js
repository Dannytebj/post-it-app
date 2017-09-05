import express from 'express';
// import router from '../server';
import {
  signUp,
  signIn,
  signOut,
  signInWithGoogle,
  editProfile
} from '../controllers/users';
import {
  createGroup,
  getGroups,
  getGroupUsers,
  getMessages,
  postMessage,
  getAllUsers,
  addUser
} from '../controllers/groups';
// const express = require('express');
// const {
//   signIn,
//   signUp,
//   signOut,
//   signInWithGoogle,
//   addUser,
//   editProfile
// } = require('../controllers/users');
// const {
//   getAllUsers,
//   createGroup,
//   getGroups,
//   postMessage,
//   getGroupUsers,
//   getMessages
// } = require('../controllers/groups');

const router = express.Router();
// END POINTS FOR POST-IT router
//  Post Routes
router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/signOut', signOut);
router.post('/signIn/google', signInWithGoogle);
router.post('/group', createGroup);
router.post('/message/:groupId', postMessage);
router.post('/group/:groupId/users', addUser);
router.post('/updateProfile', editProfile);

// Get Routes
router.get('/getUsers', getAllUsers);
router.get('/getGroupUsers/:groupId', getGroupUsers);
router.get('/getGroup/:userUid', getGroups);
router.get('/getMessages/:groupId', getMessages);

module.exports = router;
// export default router;
