import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppAPI from '../utils/AppAPI';

/**
 * This Store Handles Sign In, SignIn(Google)
 * Sign Out, Create Group, and SignOut.
 * @param {string} message - Initialized empty string to 
 * hold status messages from server
 * @param {object} received - Initialized empty object to 
 * hold response data from server
 * @param {array} userArray - Holds an array of Users from dataBase
 */
let groupArray = [];
let messageArray = [];

function setMessages(payload) {
  const { messages } = payload;
  messageArray = messages;
}
function setGroups(payload) {
  const { groups } = payload;
  // console.log(groups, '======> groupStore');
  groupArray = groups;
}
function updateMessages(payload) {
  const {id, message, name } = payload;
  // const messages = { id, message, name };
  messageArray.push({ id, message, name });
  console.log(messageArray, '===> updated messages');
}
function clearMessageArray() {
  messageArray = [];
}
class MessageStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(
      this.dispatcherCallback.bind(this));
  }
  
  getGroups() {
    return groupArray;
  }

  getAllMessages() {
    return messageArray;
  }
  emitChange() {
    this.emit('change');
  }
  addChangeListener(callback) {
    this.on('change', callback);
  }

  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  dispatcherCallback({ action }) {
    switch (action.type) {
      case AppConstants.GET_GROUPS:
        AppAPI.getGroups(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_GROUPS:
        setGroups(action.payload);
        this.emitChange();
        break;
      case AppConstants.POST_MESSAGE:
        AppAPI.postMessage(action.payload);
        this.emitChange();
        break;
      case AppConstants.GET_ALL_MESSAGES:
        clearMessageArray();
        AppAPI.getAllMessages(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_ALL_MESSAGES:
        setMessages(action.payload);
        this.emitChange();
        break;
      case AppConstants.UPDATE_MESSAGE_STORE:
        updateMessages(action.payload);
        // console.log(action.payload, '===> Message store !!');
        this.emitChange();
        break;
      case AppConstants.RESET_STORE:
        clearMessageArray();
        this.emitChange();
        break;
      default:
        break;
    }
    return true;
  }
}
export default new MessageStore();
