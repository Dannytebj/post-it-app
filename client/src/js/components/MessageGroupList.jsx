import React from 'react';
import PropTypes from 'prop-types';
import GroupMessages from './GroupMessages';

/**
 * @description Receives an array of Object(groupList)
 * and creates a list element
 * 
 * @returns a list element
 * 
 * @param {Array} groupList 
 */
const MessageGroupList = ({ groupList }) => (
  <ul id="groups">
    {
      groupList.map((group, index) => 
        (<GroupMessages group={group} key={index}/>))
    }
  </ul>);

MessageGroupList.propTypes = {
  groupList: PropTypes.array.isRequired,
};

export default MessageGroupList;
