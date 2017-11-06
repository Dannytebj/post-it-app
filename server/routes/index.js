import express from 'express';
// import router from '../server';
import {
  signUp,
  signIn,
  signOut,
  signInWithGoogle,
  resetPassword,
} from '../controllers/user.controller';
import {
  createGroup,
  getGroups,
  getGroupUsers,
  getMessages,
  postMessage,
  getAllUsers,
  notGroupUsers,
  addUser,
  checkGroupName,
} from '../controllers/groups';


const router = express.Router();
// END POINTS FOR POST-IT router
//  Post Routes
router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/signOut', signOut);
router.post('/signIn/google', signInWithGoogle);
router.post('/group', createGroup);
router.post('/message', postMessage);
router.post('/group/:groupId/users', addUser);
router.post('/resetPassword', resetPassword);
// router.post('/checkGroupName', checkGroupName);

// Get Routes
router.get('/getUsers', getAllUsers);
router.get('/getGroupUsers/:groupId', getGroupUsers);
router.get('/notGroupUsers/:groupId', notGroupUsers);
router.get('/getGroup/:userUid', getGroups);
router.get('/getMessages/:groupId', getMessages);


// module.exports = router;
export default router;
