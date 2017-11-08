import express from 'express';
import validateInputs from '../utils/validator';
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
} from '../controllers/groups';


const router = express.Router();
// END POINTS FOR POST-IT router
//  Post Routes
router.post('/api/v1/signIn', signIn);
router.post('/api/v1/signUp', validateInputs, signUp);
router.post('/api/v1/signOut', signOut);
router.post('/api/v1/signIn/google', signInWithGoogle);
router.post('/api/v1/group', createGroup);
router.post('/api/v1/message', postMessage);
router.post('/api/v1/group/:groupId/users', addUser);
router.post('/api/v1/resetPassword', resetPassword);

// Get Routes
router.get('/api/v1/getUsers', getAllUsers);
router.get('/api/v1/getGroupUsers/:groupId', getGroupUsers);
router.get('/api/v1/notGroupUsers/:groupId', notGroupUsers);
router.get('/api/v1/getGroup/:userUid', getGroups);
router.get('/api/v1/getMessages/:groupId', getMessages);


// module.exports = router;
export default router;
