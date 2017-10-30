import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewActions from '../actions/AppActions';
import MessageStore from '../stores/MessageStore';
import MessageList from './MessageList';
import MessageTextBox from '../utils/msgText';

const { getMessages, postMessage } = ViewActions;
class GroupMessages extends Component {
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
  componentWillMount() {
    MessageStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      messageList: MessageStore.getAllMessages(),
    });
  }
  showGroupMessages() {
    const { groupId, groupName } = this.props.group;
    localStorage.setItem('groupId', groupId);
    localStorage.setItem('groupName', groupName);
    getMessages(groupId);
  }

  sendMessage() {
    const { priority, message } = this.state;
    const groupId = localStorage.getItem('groupId');
    const id = localStorage.getItem('userUid');
    const name = localStorage.getItem('userName');
    postMessage(groupId, message, priority, id, name);
    this.setState({
      message: '',
    });
    // console.log(priority, message);
  }
  setPriorityUrgent() {
    this.setState({ priority: 'Urgent' });
  }
  setPriorityCritical() {
    this.setState({ priority: 'Critical' });
  }


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
                {(messageList === '') ? '' : <MessageList messageList={ messageList } />}
              </div>
              <div className="row msgBox">
                <div className="col-lg-6">
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
