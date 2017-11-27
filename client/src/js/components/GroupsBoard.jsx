import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import GroupStore from '../stores/GroupStore';
import ViewActions from '../actions/AppActions';
import GroupLayout from './GroupLayout';
import UserList from './UserList';
import AddUser from './AddUser';
import appHistory from '../utils/History';

const { getAllUsers } = ViewActions;
/**
 * 
 * 
 * @class GroupsBoard
 * @extends {Component}
 */
class GroupsBoard extends Component {
  /**
     * @description Creates an instance of BroadCastGroup.
     * @param {any} props 
     * @memberof GroupsBoard
     */
  constructor(props) {
    super(props);
    this.state = {
      priority: 'Normal',
      message: '',
    };
    this.onChange = this.onChange.bind(this);
    this.showAllUsers = this.showAllUsers.bind(this);
  }
  /**
   * @description Adds a change listener to the
   * GroupStore when the component is mounted
   * 
   * @memberof GroupsBoard
   */
  componentDidMount() {
    GroupStore.addChangeListener(this.onChange);
  }
  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof GroupsBoard
   */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this.onChange);
  }
  /**
 *   @description This method is passed to the change listeners
 * to update the state of the component when there is a 
 * change in the store
 * 
 * @memberof GroupsBoard
 */
  onChange() {
    this.forceUpdate();
  }
  /**
   * @description This method calls the getallUsers action
   * when clicked
   * 
   * @memberof GroupsBoard
   */
  showAllUsers() {
    const groupId = localStorage.getItem('groupId');
    getAllUsers(groupId);
  }
  /**
   * 
   * 
   * @returns {void}
   * @memberof GroupsBoard
   */
  render() {
    const isAdmin = localStorage.getItem('isAdmin');
    return (
      <div className="container-fluid" >
        <div className="row">
          <GroupLayout/>
          <Router history = { appHistory }>
            <div className="group-Users">
              <div className="col-md-8 ">
                <Switch>
                  <Route path='/groups/:groupId/:groupName' 
                    component={groupProps => (
                      <UserList {...groupProps} />
                    )} />
                </Switch>
              </div>
              {(isAdmin === 'isAdmin') ? <div><button type="button" 
                className="btn-primary btn-md" 
                data-toggle="modal"
                onClick ={this.showAllUsers} 
                data-target=".addUser">Add User</button> 
              </div> : '' }
            </div>
          </Router>
          <AddUser/>

        </div>
      </div>
    );
  }
}
export default GroupsBoard;
