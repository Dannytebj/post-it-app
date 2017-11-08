import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewActions from '../actions/AppActions';
import GroupStore from '../stores/GroupStore';
import UserList from './UserList';
import AddUser from './AddUser';

const { getGroupUsers, getAllUsers } = ViewActions;
/**
 * 
 * 
 * @class Group
 * @extends {Component}
 */
class Group extends Component {
  /**
   * Creates an instance of Group.
   * @param {any} props 
   * @memberof Group
   */
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      showMessages: false,
    };
    this.showGroupUsers = this.showGroupUsers.bind(this);
    this.showAllUsers = this.showAllUsers.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  /**
   * @description Adds a change listener to the
   * Groupstore just before the component is mounted
   * 
   * @memberof Group
   */
  componentWillMount() {
    GroupStore.addChangeListener(this._onChange);
  }
  /**
   *  @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof Group
   */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onChange);
  }
  /**
 * @description This method is passed to the change listeners
   * to update the state of the component when there is a 
   * change in the store
 * 
 * @memberof Group
 */
  _onChange() {
    this.setState({
      userList: GroupStore.getUsers(),
    });
  }
  /**
   * @description this method calls the getGroupUsers action
   * which populates the userList array
   * 
   * @memberof Group
   */
  showGroupUsers() {
    const { groupId, groupName } = this.props.group;
    localStorage.setItem('groupId', groupId);
    localStorage.setItem('groupName', groupName);
    getGroupUsers(groupId);
  }
  /**
   * @description This method calls the getallUsers action
   * when clicked
   * 
   * @memberof Group
   */
  showAllUsers() {
    const groupId = localStorage.getItem('groupId');
    getAllUsers(groupId);
  }
  /**
   * 
   * 
   * @returns jsx component for group users
   * @memberof Group
   */
  render() {
    const { group } = this.props;
    const groupId = localStorage.getItem('groupId');
    const { userList } = this.state;
    return (
      <div className="groups">
        <div className="row">
          <div className="col-md-3 groupPane">
            <li className="groupList" onClick ={this.showGroupUsers}>
              <a className="groupName">{group.groupName}</a>
            </li>
          </div>
          {(group.groupId !== groupId) ? '' :
            <div className="col-md-3 groupUsers">
              {(userList.length === 0) ? 
                <span>Please select a group<br/> </span> : 
                <UserList userList={ userList } /> }
              {(group.isAdmin) ? <div><button type="button" 
                className="btn-primary btn-md" 
                data-toggle="modal"
                onClick = {this.showAllUsers} 
                data-target=".addUser">Add User</button> 
              </div> : '' }
              <AddUser/>
            </div>
          }   
        </div>
      </div>
    );
  }
}

Group.propTypes = {
  group: PropTypes.object.isRequired,
};

export default Group;
