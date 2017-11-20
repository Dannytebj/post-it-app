import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.object.isRequired,
};
/**
 * @description Helper component that Receives props from (Object)
 * 
 * @returns a list element
 * 
 * @param {Object} user 
 */
const GroupUsers = ({ user }) => (
  <li className="list-group-item">
    { user.name }
  </li>
);
GroupUsers.propTypes = propTypes;

export default GroupUsers;

