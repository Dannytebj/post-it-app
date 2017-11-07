import React, { Component } from 'react';
import ViewActions from '../actions/AppActions';
import MessageStore from '../stores/MessageStore';
import MessageGroupList from './MessageGroupList';
import Layout from './Layout';

const { getGroups } = ViewActions;


/**
 * @description This class is the Parent of the message components
 * 
 * @class MessageBoard
 * @extends {Component}
 */
class MessageBoard extends Component {
  /**
   * @constructor
   * Creates an instance of MessageBoard.
   * @param {any} props 
   * @memberof MessageBoard
   */
  constructor(props) {
    super(props);

    this.state = {
      groupList: MessageStore.getGroups(),
      isFetchingData: false,
      fetchMessage: '',
    };
    this._onChange = this._onChange.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
  }
  /**
   * @description Adds a change listener to the
   * MessageStore just before the component is mounted
   * 
   * @memberof MessageBoard
   */
  componentWillMount() {
    this.fetchGroups();
    MessageStore.addChangeListener(this._onChange);
  }
  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof MessageBoard
   */
  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
  }
  /**
 *   @description This method is passed to the change listeners
 * to update the state of the component when there is a 
 * change in the store
 * 
 * @memberof MessageBoard
 */
  _onChange() {
    this.setState({
      groupList: MessageStore.getGroups(),
    });
  }
  /**
 * @description this method when called triggers the getgroups actions
 * 
 * @memberof MessageBoard
 */
  fetchGroups() {
    const userUid = localStorage.getItem('userUid');
    getGroups(userUid);
  }
  /**
   * 
   * 
   * @returns 
   * @memberof MessageBoard
   */
  render() {
    const { groupList } = this.state;
    return (
      <div>
        <Layout/>
        <div className="exTab1 container">
          <ul className="nav nav-pills">
            <li className="active">
              <a href="" onClick = {this.fetchGroups}  
                data-target=".1a" data-toggle="tab">Message Board</a>
            </li>
          </ul>
          <div className="tab-content clearfix">
            <div className="tab-pane active 1a" id="1a" aria-hidden="true">
              <h3>Your Groups</h3>
              <MessageGroupList groupList= {groupList}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
