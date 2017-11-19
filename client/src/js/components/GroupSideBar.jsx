import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ViewActions from '../actions/AppActions';


const { getMessages, resetMessageStore } = ViewActions;

/**
 * 
 * 
 * @class GroupSideBar
 * @extends {Component}
 */
class GroupSideBar extends Component {
  /**
     * Creates an instance of GroupSideBar.
     * @param {any} props 
     * @memberof GroupSideBar
     */
  constructor(props) {
    super(props);
    this.setGroupId = this.setGroupId.bind(this);
  }

  /**
   * 
   * 
   * @memberof GroupSideBar
   */
  setGroupId() {
    const { groupId, groupName } = this.props.group;
    localStorage.setItem('groupId', groupId);
    localStorage.setItem('groupName', groupName);
    resetMessageStore();
    getMessages(groupId);
  }

  /**
   * 
   * 
   * @returns 
   * @memberof GroupSideBar
   */
  render() {
    const { groupId, groupName } = this.props.group;

    return (
      <li>
        <NavLink to={`/broadCastGroup/${groupId}/${groupName}`} >
          <p onClick={this.setGroupId}>{groupName}</p>
        </NavLink>      
      </li>


    );
  }
}

GroupSideBar.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupSideBar;
