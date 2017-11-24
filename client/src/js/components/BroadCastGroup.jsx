import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import io from 'socket.io-client';
import $ from 'jquery';
import MessageStore from '../stores/MessageStore';
import ViewActions from '../actions/AppActions';
import MessageBoard from './MessageBoard';
import MessageList from './MessageList';
import MessageTextBox from '../utils/msgText';
import appHistory from '../utils/History';

const { postMessage, updateMessageStore } = ViewActions;
let socket;
if (process.env.NODE_ENV === 'production') {
  socket = io('https://postitdanny.herokuapp.com');
} else {
  socket = io('http://localhost:9999');
}


/**
 * @description This class handles the realtime mesaging
 * 
 * @class BroadCastGroup
 * @extends {Component}
 */
class BroadCastGroup extends Component {
  /**
     * @description Creates an instance of BroadCastGroup.
     * @param {any} props 
     * @memberof BroadCastGroup
     */
  constructor(props) {
    super(props);
    this.state = {
      priority: 'Normal',
      message: '',
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setPriority = this.setPriority.bind(this);
  }

  /**
   * @description Unsets the groupName and groupId from localstorage
   * on reload
   * 
   * @memberof BroadCastGroup
   */
  componentWillMount() {

  }
  /**
   * @description Adds a change listener to the
   * MessageStore once the component is mounted
   * 
   * @memberof BroadCastGroup
   */
  componentDidMount() {
    MessageStore.addChangeListener(this.onChange);
    const groupId = localStorage.getItem('groupId');        
    socket.on(`newMessage${groupId}`, (payload) => {
      const { id, message, name, priority, timeStamp } = payload;
      updateMessageStore(id, message, name, priority, timeStamp);
    });
  }

  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof BroadCastGroup
   */
  componentWillUnmount() {
    MessageStore.removeChangeListener(this.onChange);
  }
  /**
 *   @description This method is passed to the change listeners
 * to update the state of the component when there is a 
 * change in the store
 * 
 * @memberof BroadCastGroup
 */
  onChange() {
    this.forceUpdate();
  }
  /**
 * @description When called this method triggers the
 * postMessage action
 * 
 * @memberof BroadCastGroup
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
     * @memberof BroadCastGroup
     */
  setPriority(event) {
    this.setState({ priority: event.target.value });
  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof BroadCastGroup
   */
  render() {
    const {  message } = this.state;
    return (
      <div className="container-fluid" >
        <div className="row">
          <MessageBoard/>
          <Router history = { appHistory }>
            <div className="messageContainer">
              <div className="col-md-10  messageTray">
                <Switch>
                  <Route path='/broadcastGroup/:groupId/:groupName' 
                    component={groupProps => (
                      <MessageList {...groupProps} />
                    )} />
                </Switch>
              </div>  
              <div>
                <div className="row">
                  <div className="col-md-10 msgBox">
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
                  <label>Select Priority Level:</label><br/>
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
              </div> 
            </div>       
          </Router>
        </div>
      </div>

    );
  }
}
export default BroadCastGroup;
