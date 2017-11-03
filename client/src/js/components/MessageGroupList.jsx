import React from 'react';
import PropTypes from 'prop-types';
import GroupMessages from './GroupMessages';

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
