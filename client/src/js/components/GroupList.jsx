import React from 'react';
import PropTypes from 'prop-types';
import Group from './Group';

/**
 * @description Receives an array of Object(groups)
 * and creates a list element
 * 
 * @returns a unordered list element
 * 
 * @param {Array} groupList 
 */
const GroupList = ({ groupList }) => (
  <ul id="groups">
    {
      groupList.map((group, index) => 
        (<Group group={group} key={index}/>))
    }
  </ul>);

GroupList.propTypes = {
  groupList: PropTypes.array.isRequired,
};

export default GroupList;
