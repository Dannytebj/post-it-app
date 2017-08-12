import React, { Component } from 'react';
import superagent from 'superagent';
// import Button from './button.js';
import MessageList from './messageList/';
import TextBox from '../../commons/textbox.js';

class Messages extends Component{
     constructor(props) {
        super(props);
        this.state = {
            message:'',
            isPostingData: false,
            fetchMessage:'',
            messagePosted: false,
            messageList:[]
        };
        this._onChange = this._onChange.bind(this);
        this.postMessage = this.postMessage.bind(this);
        this.getGroupMessages = this.getGroupMessages.bind(this);
    }

    _onChange() {
        this.forceUpdate();
    }
    postMessage(){
        this.getGroupMessages();
        const { message } = this.state;
        const groupId = localStorage.getItem('groupId');
        superagent
            .post(`https://postitdanny.herokuapp.com/message/${groupId}`)
            .send({message: message})
            .end((error, response) => {
                if(error){
                    this.setState({
                        fetchMessage: 'Error Posting Message',
                        isPostingData:false
                    });
                    return;
                }
                console.log(`your message has been posted!: ${message}, ${groupId}`);
                    this.setState({
                        fetchMessage:'Successfully posted message',
                        messagePosted: true,
                        message:''
                    });
                })
            }
    getGroupMessages(){
        const groupId = localStorage.getItem('groupId');
        superagent
            .get(`https://postitdanny.herokuapp.com/getMessages/${groupId}`)
            .set('Accept', 'application/json')
            .end((error, response)=> {
                if(error) {
                    this.setState({
                        fetchMessage:'Failed to get Messages'
                    });
                    return;
                }
                    this.setState({
                        fetchMessage:'Successfully fetched messages',
                        messageList: JSON.parse(response.text)
                    });
                    console.log(messageArray);
            });
    }
    
    render() {
        const { message, fetchMessage, messageList }= this.state;
        return (
            <div className="messages">
                <div className="displayMessages">
                    <MessageList receivedMessage = {messageList} />
                </div>
                <TextBox
                onChange={(value) => { this.setState({ message: value }); }}
                label=""
                currentValue={message}
                /> <button id="sendButton" onClick={this.postMessage}>Send</button>
            </div>
            // {fetchMessage}
        )
    }
}
// Group.propTypes = {
//     group: PropTypes.object.isRequired
// }
module.exports = Messages;