import React, { Component } from 'react';
// import superagent from 'superagent';
import Button from './button.js';
import TextBox from '../../commons/textbox.js';

class Messages extends Component{
     constructor(props) {
        super(props);
        this.state = {
            message:'',
            isPostingData: false,
            fetchMessage:''
        };
        this._onChange = this._onChange.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    _onChange() {
        this.forceUpdate();
    }
    postMessage(){
        const { message } = this.state;
        console.log(`your message has been posted!: ${message}`);
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