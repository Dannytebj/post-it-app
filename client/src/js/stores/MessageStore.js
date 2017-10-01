import { EventEmitter } from 'events';
import superagent from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  ADD_NEW_MESSAGE,
  GET_ALL_MESSAGES,
} from '../constants/messageConstants';

let allMessages = [];
let statusMessage = '';
// let messages = [];
class MessageStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(
      this.dispatcherCallback.bind(this));
  }

  getStatusMessage() {
    return statusMessage;
  }
  // getMessages() {
  //   return messages;
  // }
  allGroupMessages() {
    return allMessages;
  }

  postMessage({ message, groupId, priority }) {
    // console.log('message posting...');
    const userId = localStorage.getItem('uid');
    const userName = localStorage.getItem('userName');
    allMessages.push({
      id: userId,
      messages: message,
      name: userName,
    });
    superagent
      .post('/message')
      .send({ message, priority, groupId, userId })
      .end((error, response) => {
        if (error) {
          statusMessage = error;
          return;
        }
        statusMessage = JSON.parse(response.text);
        // console.log(`your message has been posted!`);
      });
    this.emitChange();
  }
  getGroupMessages({ groupId }) {
    // console.log('Getting all group Messages!');
    superagent
      .get(`/getMessages/${groupId}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          statusMessage = JSON.parse(error);
          // return statusMessage;
        } else {
          allMessages = JSON.parse(response.text);
          this.emit('updateStore');
        }            
      });  
  }
    

  emitChange() {
    this.emit('change');
  }
  addChangeListener(callback) {
    this.on('change', callback);
    this.on('updateStore', callback);
  }
  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
    this.removeListener('updateStore', callback);
  }
  dispatcherCallback({ action }) {
    switch (action.type) {
      case ADD_NEW_MESSAGE:
        this.postMessage(action.payload);
        break;
      case GET_ALL_MESSAGES:
        this.getGroupMessages(action.payload);
        break;
      default:
        break;
    }
    return true;
  }
}
export default new MessageStore();
