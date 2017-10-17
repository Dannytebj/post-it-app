import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewActions from '../actions/AppActions';
import GroupStore from '../stores/GroupStore';
import UserList from './UserList.jsx';
import AddUser from './AddUser.jsx';

const { getGroupUsers, getAllUsers } = ViewActions;
class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: GroupStore.getUsers(),
      showMessages: false,
    };
    this.showGroupUsers = this.showGroupUsers.bind(this);
    this.showAllUsers = this.showAllUsers.bind(this);
    this.showMessageBoard = this.showMessageBoard.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    GroupStore.on('updateGroupUsers', () => {
      this.setState({
        userList: GroupStore.getUsers(),
      });
    });
  }
  componentWillUnmount() {
    GroupStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.forceUpdate();
  }
  showGroupUsers() {
    const { groupId, groupName } = this.props.group;
    localStorage.setItem('groupId', groupId);
    localStorage.setItem('groupName', groupName);
    getGroupUsers(groupId);
  }
  showMessageBoard() {
    this.setState({
      showMessages: true,
    });
  }
  showAllUsers() {
    const groupId = localStorage.getItem('groupId');
    console.log(groupId);
    getAllUsers(groupId);
  }
  render() {
    const { group } = this.props;
    const groupId = localStorage.getItem('groupId');
    const { userList, showMessages } = this.state;
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
              <UserList userList={ userList } /> 
              {(group.isAdmin) ? <div><a className=".btn-success" 
                data-toggle="modal"
                onClick = {this.showAllUsers} 
                data-target=".addUser">Add User</a> <a onClick={this.showMessageBoard}>MessageBoard</a></div> : '' }
              <AddUser/>
            </div>
          } 
          { (showMessages) ? 
            <div className="col-md-3">
             MessageBoard
            </div> : ''  
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
