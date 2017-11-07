import axios from 'axios';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';

/**
 * @description This file exports all the applications API
 */
module.exports = {
  signIn({ email, password }) {
    axios.post('/signIn', { email, password })
      .then((response) =>  {
        const { username, userUid, message } = response.data;
        localStorage.setItem('userName', username);
        localStorage.setItem('userUid', userUid);
        browserHistory.push('home');
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  signUp({ email, password, username, phoneNumber }) {
    axios.post('/signUp', { email, password, username, phoneNumber })
      .then((response) =>  {
        const { username, userUid, message } = response.data;
        localStorage.setItem('userName', username);
        localStorage.setItem('userUid', userUid);
        browserHistory.push('home');        
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  signOut() {
    axios.post('/signOut')
      .then((response) =>  {
        browserHistory.push('/');
        const { message } = response.data;
        gapi.auth2.getAuthInstance().signOut();
        localStorage.clear();
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response;
        toastr.error(message);
      });
  },
  signInWithGoogle({ idToken }) {
    axios.post('/signIn/google', { idToken })
      .then((response) =>  {
        const { username, userUid, message } = response.data;
        localStorage.setItem('userName', username);
        localStorage.setItem('userUid', userUid);
        browserHistory.push('home');        
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  }, 
  resetPassword({ email }) {
    axios.post('/resetPassword', { email })
      .then((response) =>  {
        const { message } = response.data;
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },  
  addUser({ groupId, groupName, name, id }) {
    axios.post(`/group/${groupId}/users`, { groupName, name, id })
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
    axios.post('/group', { groupName, userUid, userName })
      .then((response) => {
        const { message } = response.data;
        toastr.success(message);
      }).catch((error) => {
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  getGroups({ userUid }) {
    axios.get(`/getGroup/${userUid}`)
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
    axios.get(`/getGroupUsers/${groupId}`)
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
    axios.get(`/notGroupUsers/${groupId}`)
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
    axios.post('/message', { groupId, message, priority, id, name })
      .then((response) => {
        const { message } = response.data; // eslint-disable-line
      }).catch((error) => {
        toastr.error(error);
      });
  },
  getAllMessages({ groupId }) {
    axios.get(`/getMessages/${groupId}`)
      .then((response) => {
        const { messages, message } = response.data;
        if (messages) {
          AppActions.receiveAllMessages(messages);
        } else {
          toastr.info(message);
          AppActions.resetMessageStore();
        }
      }).catch((error) => {
        toastr.error(error);
      });
  },
  
};
