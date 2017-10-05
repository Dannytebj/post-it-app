import React, { Component } from 'react';
import MessageActions from '../../../actions/MessageActions';
import MessageStore from '../../../stores/MessageStore';
import MessageList from './messageList/';
import TextBox from '../../commons/textbox.js';

// const { postMessage} = MessageActions;
const { getGroupMessages, addMessage} = MessageActions;

class Messages extends Component{
     constructor(props) {
        super(props);
        this.state = {
            message:'',
            isPostingData: false,
            fetchMessage:'',
            messagePosted: false,
            messageList: MessageStore.allGroupMessages(),
            priority:'Normal'
        };
        this._onChange = this._onChange.bind(this);
        this.doPostMessage = this.doPostMessage.bind(this);
        this.doGetGroupMessages = this.doGetGroupMessages.bind(this);
        this.setPriorityUrgent = this.setPriorityUrgent.bind(this);
        this.setPriorityCritical = this.setPriorityCritical.bind(this);
    }

 
    componentWillMount(){
        MessageStore.on('updateStore', ()=> {
            this.setState({
                messageList: MessageStore.allGroupMessages()
            });
        })
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
    setPriorityUrgent(){
        this.setState({priority: 'Urgent'});

    }
    setPriorityCritical(){
        this.setState({priority: 'Critical'});
    }
    doPostMessage(){
        // this.getGroupMessages();
        const { message, priority } = this.state;
        const groupId = localStorage.getItem('groupId');

        addMessage(message, groupId, priority);
            console.log(`your message has been posted!`);
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
        const { message, messageList}= this.state;
        
        return (
            <div>
                <div className="displayMessages">
                      <MessageList receivedMessage = {messageList} />  
                </div>
                <div className="input-group">
                    <TextBox
                        onChange={(value) => { 
                            this.setState({ message: value }); }}
                        label="message"
                        currentValue={message}
                    />
                        <div className="input-group-btn">
                            <button className="btn btn-default" type="button" 
                            onClick ={this.doPostMessage}>Send!</button>
                                
                        </div>
                    </div>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Priority
                            <span className="caret" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick ={this.setPriorityUrgent}>Urgent</li>
                        <li onClick ={this.setPriorityCritical}>Critical</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Messages;
