import React from 'react';
import PropTypes from 'prop-types';

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
GroupUsers.propTypes = {
  user: PropTypes.object.isRequired,
};
export default GroupUsers;

