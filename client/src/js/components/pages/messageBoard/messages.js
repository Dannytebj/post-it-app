import React, { Component } from 'react';
// import superagent from 'superagent';
// import AppDispatcher from '../../../dispatcher/AppDispatcher';
import MessageActions from '../../../actions/MessageActions';
import MessageStore from '../../../stores/MessageStore';
import MessageList from './messageList/';
import TextBox from '../../commons/textbox.js';

const { addMessage } = MessageActions
// const { postMessage} = MessageActions;
const { getGroupMessages} = MessageActions;

class Messages extends Component{
     constructor(props) {
        super(props);
        this.state = {
            message:'',
            isPostingData: false,
            fetchMessage:'',
            messagePosted: false,
            messages: MessageStore.getMessages(),
            messageList:MessageStore.allGroupMessages()
        };
        this._onChange = this._onChange.bind(this);
        // this.addMessage = this.addMessage.bind(this);
        this.doPostMessage = this.doPostMessage.bind(this);
        this.doGetGroupMessages = this.doGetGroupMessages.bind(this);
    }
    componentWillMount(){
        MessageStore.on('NewMessage', ()=> {
            this.setState({
                messages:MessageStore.getMessages()
            });
        });
    }
    componentDidMount(){
        MessageStore.addChangeListener(this._onChange);

    }
    componentWillUnmount() {
        MessageStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.forceUpdate();
    }
    doPostMessage(){
        // this.getGroupMessages();
        const { message } = this.state;
        const groupId = localStorage.getItem('groupId');
        addMessage(message, groupId);
            console.log(`your message has been posted!: 
            ${message}, ${groupId}`);
                this.setState({
                    fetchMessage:'Successfully posted message',
                    messagePosted: true,
                    message:'',
                    messages:MessageStore.getMessages()
                });
                }
    doGetGroupMessages(){
        const groupId = localStorage.getItem('groupId');
        getGroupMessages(groupId);
    }
    
    render() {
        const { message, messages, messageList }= this.state;
        console.log(messages);
        return (
            <div className="messages">
                <div className="displayMessages">
                    {/* <MessageList receivedMessage = {messageList} /> */}
                </div>
                <TextBox
                onChange={(value) => { this.setState({ message: value }); }}
                label=""
                currentValue={message}
                /> 
            <button id="sendButton" onClick={this.doPostMessage}>Send</button>
            </div>
            // {fetchMessage}
        )
    }
}
// Group.propTypes = {
//     group: PropTypes.object.isRequired
// }
module.exports = Messages;