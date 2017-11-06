import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewActions from '../actions/AppActions';
import GroupStore from '../stores/GroupStore';

const { addUser } = ViewActions;
/**
 * @description This class handles adding a user
 * 
 * @class AllUsers
 * @extends {Component}
 */
class AllUsers extends Component {
  /**
   * 
   * Creates an instance of AllUsers.
   * @param {any} props 
   * @memberof AllUsers
   */
  constructor(props) {
    super(props);
    this.state = {
      isAddingUser: false,
      userAdded: false,
    };
    this.addUser = this.addUser.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  /**
   * @description Adds a change listener to the
   * Groupstore just before the component is mounted
   * 
   * @memberof AllUsers
   */
  componentWillMount() {
    GroupStore.addChangeListener(this._onChange);
  }
  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof AllUsers
   */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onChange);
  }
  /**
   *  @description This method is passed to the change listeners
   * to update the state of the component when there is a 
   * change in the store
   * 
   * @memberof AllUsers
   */
  _onChange() {
    this.setState({
      userAdded: false,
    });
  }
  /**
   * @description This method is called when the add user 
   * button is clicked, triggers the addUser action
   * 
   * @memberof AllUsers
   */
  addUser() {
    this.setState({
      isAddingUser: true,
    });
    const groupId  = localStorage.getItem('groupId');
    const groupName = localStorage.getItem('groupName');
    const { name, id } = this.props.user;
    addUser(groupId, groupName, name, id);
  }
  /**
 * 
 * 
 * @param {boolean} isAddingUser 
 * @returns {boolean}
 * @memberof AllUsers
 */
  createAddButton(isAddingUser) {
    return isAddingUser ? '' : <span onClick={this.addUser}
      className="add glyphicon glyphicon-plus" aria-hidden="true"/>;
  }
  /**
 * 
 * 
 * @returns Jsx component that list out users and an add button
 * @memberof AllUsers
 */
  render() {
    const { user } = this.props;
    const { userAdded, isAddingUser } = this.state;
    return (
      <li className="list-group-item">
        { user.name } {(!userAdded) ? this.createAddButton(isAddingUser) : '' }
      </li>

    );
  }
}
AllUsers.propTypes = {
  user: PropTypes.object.isRequired,
};
export default AllUsers;

