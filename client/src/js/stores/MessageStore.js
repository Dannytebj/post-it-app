import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import superagent from 'superagent';
import {
  ADD_NEW_MESSAGE,
  GET_ALL_MESSAGES
} from '../constants/messageConstants';

let allMessages = [];
let errorMessage = '';
let messages = [];
class MessageStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(
      this.dispatcherCallback.bind(this));
  }

  getError(){
    return errorMessage;
  }
  getMessages(){
    return messages;
  }
  allGroupMessages(){
    return allMessages;
  }

  postMessage({message, groupId, priority}){
    console.log('message posting...');
    const userId = localStorage.getItem('uid');
    const userName = localStorage.getItem('userName');
    allMessages.push({
      id: userId,
      messages: message,
      name: userName
    });
    // superagent
    //     .post(`https://postitdanny.herokuapp.com/message/${groupId}`)
    //     .send({message: message})
    //     .end((error, response) => {
    //         if(error){
    //             this.setState({
    //                 fetchMessage: 'Error Posting Message',
    //                 isPostingData:false
    //             });
    //             return;
    //         }
    console.log(`your message has been posted!: ${message}, ${groupId}`);
    // this.setState({
    //     fetchMessage:'Successfully posted message',
    //     messagePosted: true,
    //     // statusMessage: JSON.parse(response.text)
    // });
  }
  // this.emitChange();

  // }
  getGroupMessages({groupId}) {
    console.log('Getting all group Messages!');
    superagent
      .get(`https://postitdanny.herokuapp.com/getMessages/${groupId}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          errorMessage = JSON.parse(error);
          return errorMessage;
        } 
        allMessages = JSON.parse(response.text);
        this.emit('updateStore');
      });
                

    // this.emitChange();

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
    this.removeChangeListener('updateStore', callback);
  }
  dispatcherCallback({ action }) {
    switch (action.type) {
      case ADD_NEW_MESSAGE:
        this.postMessage(action.payload);
        break;
      case GET_ALL_MESSAGES:
        this.getGroupMessages(action.payload)
        break;
      default:
        break;
    }
    return true;
  }
}
export default new MessageStore();
