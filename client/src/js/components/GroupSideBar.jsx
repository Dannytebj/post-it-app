import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ViewActions from '../actions/AppActions';


const { getMessages, resetMessageStore } = ViewActions;

const propTypes = {
  group: PropTypes.object.isRequired,
};
/**
 * 
 * 
 * @class GroupSideBar
 * @extends {Component}
 */
class GroupSideBar extends Component {
  /**
     * @description Creates an instance of GroupSideBar.
     * @param {any} props 
     * @memberof GroupSideBar
     */
  constructor(props) {
    super(props);
    this.setGroupId = this.setGroupId.bind(this);
  }

  /**
   * @description When called sets the current group's groupId and
   * passes it to the getMessages action. It also calls the resetMessageStore
   * action
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
   * @returns {void}
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
GroupSideBar.propTypes = propTypes;
export default GroupSideBar;
