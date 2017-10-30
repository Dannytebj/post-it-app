import React from 'react';
import PropTypes from 'prop-types';


const GroupUsers = ({ user }) => (
  <li className="list-group-item">
    { user.name }
  </li>
);
GroupUsers.propTypes = {
  user: PropTypes.object.isRequired,
};
export default GroupUsers;

