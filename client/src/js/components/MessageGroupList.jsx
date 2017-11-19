import React from 'react';
import PropTypes from 'prop-types';
import GroupSideBar from './GroupSideBar';

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
        {
          groupList.map(group => 
            (<GroupSideBar group={group} key={group.groupId}/>))
        }
      </ul>
    </div>
  </div>
);

MessageGroupList.propTypes = {
  groupList: PropTypes.array.isRequired,
};

export default MessageGroupList;
