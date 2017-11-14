import React, { Component } from 'react';
import GroupStore from '../stores/GroupStore';
import GroupUsers from './GroupUsers';

/**
 * 
 * 
 * @class UserList
 * @extends {Component}
 */
class UserList extends Component {
  /**
   * Creates an instance of UserList.
   * @param {any} props 
   * @memberof UserList
   */
  constructor(props) {
    super(props);
    this.state = {
      userList: GroupStore.getUsers(),
      groupId: props.match.params.groupId,  // eslint-disable-line
    };
    this._onChange = this._onChange.bind(this);
  }
  /**
   * @description Adds a change listener to the
   * MessageStore just before the component is mounted
   * 
   * @memberof UserList
   */
  componentWillMount() {
    GroupStore.addChangeListener(this._onChange);
  }
  /**
     * @description Removes change listener just before 
     * the component unmounts
     * 
     * @memberof UserList
     */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onChange);
  }
  /**
   * 
   * 
   * @memberof UserList
   */
  componentWillReceiveProps(newProps) {
    GroupStore.addChangeListener(this._onChange);
    this.setState({
      groupId: newProps.match.params.groupId,
    });
  }
  /**
   * @description This method is passed to the change listeners
   * to update the state of the component when there is a 
   * change in the store
   * 
   * @memberof GroupMessages
   */
  _onChange() {
    this.state.userList = GroupStore.getUsers();
  }

  /**
   * 
   * 
   * @returns 
   * @memberof UserList
   */
  render() {
    const { userList } = this.state;

    return (
      <ul className="list-group">
        {
          userList.map((user, index) => 
            (<GroupUsers user={user} key={index}/>))
        }
      </ul>
    );
  }
}
export default UserList;
