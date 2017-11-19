import React from 'react';
import PropTypes from 'prop-types';
// import Group from './Group';
import Groups from './Groups';

/**
 * @description Receives an array of Object(groups)
 * and creates a list element
 * 
 * @returns a unordered list element
 * 
 * @param {Array} groupList 
 */
const GroupList = ({ groupList }) => (
  <div id="wrapper">
    <div id = "sidebar-wrapper">
      <ul id="sidebar-nav">
        {
          groupList.map(group => 
            (<Groups group={group} key={group.groupId}/>))
        }
      </ul>
    </div>
  </div>
);

GroupList.propTypes = {
  groupList: PropTypes.array.isRequired,
};

export default GroupList;
