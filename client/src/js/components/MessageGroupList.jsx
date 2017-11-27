import React from 'react';
import PropTypes from 'prop-types';
import GroupSideBar from './GroupSideBar';

const propTypes = { 
  groupList: PropTypes.array.isRequired,
};
/**
 * @description Receives an array of Object(groupList)
 * and creates a list element
 * 
 * @returns a list element
 * 
 * @param {Array} groupList 
 */
const MessageGroupList = ({ groupList }) => (
  <div id="wrapper">
    <div id = "sidebar-wrapper">
      <ul id="sidebar-nav">
        <h4 className="headers">Groups</h4>
        {
          groupList.map(group => 
            (<GroupSideBar group={group} key={group.groupId}/>))
        }
      </ul>
    </div>
  </div>
);

MessageGroupList.propTypes = propTypes;

export default MessageGroupList;
