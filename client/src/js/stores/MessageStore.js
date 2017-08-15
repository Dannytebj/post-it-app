import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import superagent from 'superagent';
import {
    ADD_NEW_MESSAGE,
    GET_ALL_MESSAGES
} from '../constants/messageConstants';

class MessageStore extends EventEmitter {
 constructor() {
        super();
        this.messages = [];
        this.state = {
            messageList:[],
            statusMessage:'',
            fetchMessage:''
        },
        this.dispatchToken = AppDispatcher.register(
            this.dispatcherCallback.bind(this));
            // this.getState=this.getState.bind(this);
            this.addMessage=this.addMessage.bind(this);
            this.getMessages = this.getMessages.bind(this);
            this.getGroupMessages = this.getGroupMessages.bind(this);
            this.allGroupMessages = this.allGroupMessages.bind(this);
    }
        getMessages(){
        console.log('get new message');
        return this.messages;
    }
    allGroupMessages(){
        const messageList = this.state;
        return messageList;
    }
    addMessage(message, groupId){
        this.messages.push(
            message,
            groupId
        );
            this.emit('NewMessage');
            console.log(this.messages);
        }

    postMessage({message, groupId}){
        console.log('message posting...');
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
    getGroupMessages({groupId}){
        console.log(groupId);
        superagent
            .get(`https://postitdanny.herokuapp.com/getMessages/${groupId}`)
            .set('Accept', 'application/json')
            .end((error, response)=> {
                if(error) {
                    // this.setState({
                    //     fetchMessage:'Failed to get Messages'
                    // });
                    return;
                }
                    // this.setState({
                    //     fetchMessage:'Successfully fetched messages',
                    //     messageList: JSON.parse(response.text)
                    // });
                    // console.log(messageArray);
                    console.log(response);
            });
            this.emitChange();

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
            case ADD_NEW_MESSAGE:
                this.postMessage(action.payload);
                break;
            case GET_ALL_MESSAGES:
                this.getGroupMessages(action.payload)
                break;
            default:
                console.log('default', action);
                break;
        }
        return true;
    }
}
const storages = new MessageStore;
window.storages = storages;
export default new MessageStore();
