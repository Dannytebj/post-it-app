import React, { Component } from 'react';
import $ from 'jquery';
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
    this.onChange = this.onChange.bind(this);
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
    MessageStore.addChangeListener(this.onChange);
  }

  /**
   * 
   * 
   * @memberof MessageBoard
   */
  componentDidMount() {
    $("#menu-toggle").click((e) => {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }
  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof MessageBoard
   */
  componentWillUnmount() {
    MessageStore.removeChangeListener(this.onChange);
  }
  /**
 *   @description This method is passed to the change listeners
 * to update the state of the component when there is a 
 * change in the store
 * 
 * @memberof MessageBoard
 */
  onChange() {
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
        <MessageGroupList groupList= {groupList}/>
        <a href="#menu-toggle" className="btn btn-default toggler"
          id="menu-toggle">Toggle Groups</a>


      </div>
    );
  }
}

export default MessageBoard;
