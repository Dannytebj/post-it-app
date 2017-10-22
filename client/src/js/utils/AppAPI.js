import axios from 'axios';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';

// import AppActions from '../actions/AppActions';

module.exports = {
  signIn({ email, password }) {
    axios.post('/signIn', { email, password })
      .then((response) =>  {
        const { userName, userUid, message } = response.data;
        localStorage.setItem('userName', userName);
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
        browserHistory.push('home');
        const { userName, userUid, message } = response.data;
        localStorage.setItem('userName', userName);
        localStorage.setItem('userUid', userUid);
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
        const { message } = error.response.data;
        toastr.error(message);
      });
  },
  signInWithGoogle({ idToken }) {
    axios.post('/signIn/google', { idToken })
      .then((response) =>  {
        browserHistory.push('home');
        const { userName, userUid, message } = response.data;
        localStorage.setItem('userName', userName);
        localStorage.setItem('userUid', userUid);
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
  createGroup({ groupName, userId, userName }) {
    axios.post('/group', { groupName, userId, userName })
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
        AppActions.receiveGroups(groups);
        toastr.success(message);
      }).catch((error) => {
        // const { message } = error.response.data;
        toastr.error(error);
      });
  },
  getGroupUsers({ groupId }) {
    axios.get(`/getGroupUsers/${groupId}`)
      .then((response) => {
        const { message, groupUser } = response.data;
        AppActions.receiveGroupUsers(groupUser);
        toastr.success(message);
      }).catch((error) => {
        toastr.error(error);
      });
  },
  getAllUsers({ groupId }) {
    axios.get(`/notGroupUsers/${groupId}`)
      .then((response) => {
        const { message, allUsers } = response.data;
        // console.log(allUsers,'====> From AppAPI');
        AppActions.receiveAllUsers(allUsers);
        toastr.success(message);
      }).catch((error) => {
        toastr.error(error);
      });
  },
  postMessage({ groupId, message, priority, id, name }) {
    axios.post('/message', { groupId, message, priority, id, name })
      .then(() => {
        // const { message } = response.data;
        const messages = { id, message, name };
        console.log(messages, "=====> ApppApi");
        AppActions.updateMessageStore(id, message, name);
      }).catch((error) => {
        toastr.error(error);
      });
  },
  getAllMessages({ groupId }) {
    axios.get(`/getMessages/${groupId}`)
      .then((response) => {
        const { messages } = response.data;
        if (messages) {
          AppActions.receiveAllMessages(messages);
        } else {
          const { message } = response.data;
          toastr.info(message);
          AppActions.resetMessageStore();
        }
      }).catch((error) => {
        toastr.error(error);
      });
  },
  
};
