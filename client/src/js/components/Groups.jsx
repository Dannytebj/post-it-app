import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ViewActions from '../actions/AppActions';


const { getGroupUsers } = ViewActions;

/**
 * 
 * 
 * @class Groups
 * @extends {Component}
 */
class Groups extends Component {
  /**
     * Creates an instance of Groups.
     * @param {any} props 
     * @memberof Groups
     */
  constructor(props) {
    super(props);
    this.setGroupId = this.setGroupId.bind(this);
  }

  /**
   * 
   * 
   * @memberof Groups
   */
  setGroupId() {
    const { groupId, isAdmin, groupName } = this.props.group;
    localStorage.setItem('groupId', groupId);
    localStorage.setItem('groupName', groupName);
    if (isAdmin) {
      localStorage.setItem('isAdmin', 'isAdmin');
    } else {
      localStorage.setItem('isAdmin', 'notAdmin');
    }
    getGroupUsers(groupId);
  }

  /**
   * 
   * 
   * @returns 
   * @memberof Groups
   */
  render() {
    const { groupId, groupName } = this.props.group;

    return (
      <li >
        <NavLink to={`/groups/${groupId}/${groupName}`}>
          <p onClick={this.setGroupId}>{groupName}</p>
        </NavLink>      
      </li>

    );
  }
}

Groups.propTypes = {
  group: PropTypes.object.isRequired,
};

export default Groups;
