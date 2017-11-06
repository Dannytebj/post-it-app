import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import ViewActions from '../actions/AppActions';
import MessageStore from '../stores/MessageStore';
import MessageList from './MessageList';
import MessageTextBox from '../utils/msgText';

// const port = process.env.PORT || 9999;


const { getMessages, postMessage, updateMessageStore } = ViewActions;
// const socket = io('http://localhost:9999');
const socket = io('https://postitdanny.herokuapp.com');


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
    this.setPriorityUrgent = this.setPriorityUrgent.bind(this);
    this.setPriorityCritical = this.setPriorityCritical.bind(this);
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
    const groupId = localStorage.getItem('groupId');        
    socket.on(`newMessage${groupId}`, (payload) => {
      const { id, message, name } = payload;
      updateMessageStore(id, message, name);
    });

    MessageStore.addChangeListener(this._onChange);
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
   * @description set the priority of the message to Urgent
   * 
   * @memberof GroupMessages
   */
  setPriorityUrgent() {
    this.setState({ priority: 'Urgent' });
  }
  /**
   * @description set the priority of messages to crititcal
   * 
   * @memberof GroupMessages
   */
  setPriorityCritical() {
    this.setState({ priority: 'Critical' });
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
              <div className="messageTray">
                {(messageList === '') ? '' :
                  <MessageList messageList={ messageList } />}
              </div>
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
              <div className="dropdown">
                <button className="btn btn-default dropdown-toggle" 
                  type="button" id="dropdownMenu1" 
                  data-toggle="dropdown" aria-haspopup="true" 
                  aria-expanded="true">
                        Priority
                  <span className="caret" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li onClick ={this.setPriorityUrgent}>Urgent</li>
                  <li onClick ={this.setPriorityCritical}>Critical</li>
                </ul>
              </div>
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
