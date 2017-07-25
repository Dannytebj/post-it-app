import React, { Component } from 'react';
import superagent from 'superagent';
// import Button from './button.js';
import TextBox from '../../commons/textbox.js';

class Messages extends Component{
     constructor(props) {
        super(props);
        this.state = {
            message:'',
            isPostingData: false,
            fetchMessage:'',
            messagePosted: false
        };
        this._onChange = this._onChange.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    _onChange() {
        this.forceUpdate();
    }
    postMessage(){
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
                console.log(`your message has been posted!: ${message}`);
                    this.setState({
                        fetchMessage:'Successfully posted message',
                        messagePosted: true,
                        message:''
                    });
                })
            }
    
    render() {
        const { message }= this.state;
        return (
            <div className="messages">
                <TextBox
                onChange={(value) => { this.setState({ message: value }); }}
                label="Username"
                currentValue={message}
                /> <button id="sendButton" onClick={this.postMessage}>Send</button>
                
            </div>
        )
    }
}
module.exports = Messages;