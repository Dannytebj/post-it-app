import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import ViewActions from '../actions/AppActions';
import MessageStore from '../stores/MessageStore';
import MessageList from './MessageList';
import MessageTextBox from '../utils/msgText';

// const port = process.env.PORT || 9999;


const { getMessages, postMessage, updateMessageStore } = ViewActions;
const socket = io('http://localhost:9999'); // This Link is required on local machine
// const socket = io('https://postitdanny.herokuapp.com'); // This Link is required for hosted app


/**
 * 
 * 
 * @class GroupMessages
 * @extends {Component}
 */
class GroupMessages extends Component {
  /**
   * Creates an instance of GroupMessages.
   * @constructor
   * @param {any} props 
   * @memberof GroupMessages
   */
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      showMessages: false,
      priority: 'Normal',
      message: '',
    };
    this.showGroupMessages = this.showGroupMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  /**
   * @description Adds a change listener to the
   * MessageStore just before the component is mounted
   * 
   * @memberof GroupMessages
   */
  componentWillMount() {
    MessageStore.addChangeListener(this._onChange);
  }
  /**
 * 
 * 
 * @memberof GroupMessages
 */
  componentDidMount() {
    const groupId = localStorage.getItem('groupId');        
    socket.on(`newMessage${groupId}`, (payload) => {
      const { id, message, name } = payload;
      updateMessageStore(id, message, name);
    });
  }
  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof GroupMessages
   */
  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
  }
  /**
 * @description This method is passed to the change listeners
 * to update the state of the component when there is a 
 * change in the store
 * 
 * @memberof GroupMessages
 */
  _onChange() {
    this.setState({
      messageList: MessageStore.getAllMessages(),
    });
  }
  /**
   * @description When called this method takes the groupId
   * and groupName and  passes it to the getMessages action
   * 
   * @memberof GroupMessages
   */
  showGroupMessages() {
    const { groupId, groupName } = this.props.group;
    localStorage.setItem('groupId', groupId);
    localStorage.setItem('groupName', groupName);
    getMessages(groupId);
  }
  /**
 * @description When called this method triggers the
 * postMessage action
 * 
 * @memberof GroupMessages
 */
  sendMessage() {
    const { priority, message } = this.state;
    const groupId = localStorage.getItem('groupId');
    const id = localStorage.getItem('userUid');
    const name = localStorage.getItem('userName');
    postMessage(groupId, message, priority, id, name);
    this.setState({
      message: '',
    });
  }
  /**
   * @description set the priority of messages
   * 
   * @memberof GroupMessages
   */
  setPriority(event) {
    this.setState({ priority: event.target.value });
  }

  /**
 * 
 * 
 * @returns 
 * @memberof GroupMessages
 */
  render() {
    const { group } = this.props;
    const groupId = localStorage.getItem('groupId');
    const { messageList, message } = this.state;
    return (
      <div className="groups">
        <div className="row">
          <div className="col-md-3 groupPane">
            <li className="groupList" onClick ={this.showGroupMessages}>
              <a className="groupName">{group.groupName}</a>
            </li>
          </div>
          {(group.groupId !== groupId) ? '' :
            <div className="col-md-6 messageArea">
              <div>
                {(messageList.length === 0) ?
                  <span className="center"><h4> No Group Selected</h4></span> :
                  <div className="messageTray">
                    <MessageList messageList={ messageList } />
                  </div>}
              </div>
              {(group.groupId !== groupId) ? '' : <div>
                <div className="row msgBox">
                  <div className="col-lg-12">
                    <div className="input-group">
                      <MessageTextBox className='msgText'
                        onChange={(value) => { 
                          this.setState({ message: value });
                        }}
                        currentValue={message}
                      />
                      <span className="input-group-btn">
                        <button className="btn btn-default send-msg" 
                          type="button" onClick={this.sendMessage}>send</button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="radio" onChange={this.setPriority.bind(this)}>
                  <label className="radio-inline">
                    <input type="radio" value="Normal" name="priority" 
                      defaultChecked = {true} /> 
                  Normal
                  </label>
                  <label className="radio-inline">
                    <input type="radio" value="Urgent" name="priority"/> 
                  Urgent
                  </label>
                  <label className="radio-inline">
                    <input type="radio" value="Critical" name="priority"/> 
                  Critical
                  </label>           
                </div>
              </div>}
            </div>
          }
        </div>
      </div>
    );
  }
}

GroupMessages.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupMessages;
