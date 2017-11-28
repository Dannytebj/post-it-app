import axios from 'axios';
// import { browserHistory } from 'react-router';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';
import appHistory from './History';

/**
 * @description This file exports all the applications API
 */
module.exports = {
  signIn({ email, password }) {
    axios.post('/api/v1/signIn', { email, password })
      .then((response) =>  {
        const { username, userUid, message } = response.data;
        localStorage.setItem('userName', username);
        localStorage.setItem('userUid', userUid);
        appHistory.push('/home');
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  signUp({ email, password, username, phoneNumber }) {
    axios.post('/api/v1/signUp', { email, password, username, phoneNumber })
      .then((response) =>  {
        const { username, userUid, message } = response.data;
        localStorage.setItem('userName', username);
        localStorage.setItem('userUid', userUid);
        appHistory.push('/home');        
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  signOut() {
    axios.post('/api/v1/signOut')
      .then((response) =>  {
        appHistory.push('/');
        localStorage.clear();
        gapi.auth2.getAuthInstance().signOut();
        const { message } = response.data;
        toastr.success(message);
      }).catch((error) => {
        toastr.error(error);
      });
  },
  signInWithGoogle({ idToken }) {
    axios.post('/api/v1/signIn/google', { idToken })
      .then((response) =>  {
        const { username, userUid, message } = response.data;
        localStorage.setItem('userName', username);
        localStorage.setItem('userUid', userUid);
        appHistory.push('/home');        
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  }, 
  resetPassword({ email }) {
    axios.post('/api/v1/resetPassword', { email })
      .then((response) =>  {
        const { message } = response.data;
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },  
  addUser({ groupId, groupName, name, id }) {
    axios.post(`/api/v1/group/${groupId}/users`, { groupName, name, id })
      .then((response) =>  {
        const { message } = response.data;
        AppActions.addUserResponse();
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },  
  createGroup({ groupName, userUid, userName }) {
    axios.post('/api/v1/group', { groupName, userUid, userName })
      .then((response) => {
        const { message } = response.data;
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  getGroups({ userUid }) {
    axios.get(`/api/v1/getGroup/${userUid}`)
      .then((response) => {
        const { message, groups } = response.data;
        if (groups) {
          AppActions.receiveGroups(groups);
        } else {
          toastr.info(message);          
        }
      }).catch((error) => {
        toastr.error(error);
      });
  },
  getGroupUsers({ groupId }) {
    axios.get(`/api/v1/getGroupUsers/${groupId}`)
      .then((response) => {
        const { message, groupUser } = response.data;
        if (groupUser) {
          AppActions.receiveGroupUsers(groupUser);
        } else {
          toastr.info(message);
        }
      }).catch((error) => {
        toastr.error(error);
      });
  },
  getAllUsers({ groupId }) {
    axios.get(`/api/v1/notGroupUsers/${groupId}`)
      .then((response) => {
        const { message, allUsers } = response.data;
        if (allUsers) {
          AppActions.receiveAllUsers(allUsers);
        } else {
          toastr.info(message);
        }
      }).catch((error) => {
        toastr.error(error);
      });
  },
  postMessage({ groupId, message, priority, id, name }) {
    axios.post('/api/v1/message', { groupId, message, priority, id, name })
      .then((response) => {
        const { timeStamp } = response.data; // eslint-disable-line
        AppActions.updateMessageStore(id, message, name, priority, timeStamp);
      }).catch((error) => {
        toastr.error(error);
      });
  },
  getAllMessages({ groupId }) {
    axios.get(`/api/v1/getMessages/${groupId}`)
      .then((response) => {
        const { messages, message } = response.data;
        if (messages) {
          AppActions.receiveAllMessages(messages);
        } else {
          AppActions.resetMessageStore();
          toastr.info(message);
        }
      }).catch((error) => {
        toastr.error(error);
      });
  },
  
};
