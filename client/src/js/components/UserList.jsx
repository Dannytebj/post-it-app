import React from 'react';
import PropTypes from 'prop-types';
import GroupUsers from './GroupUsers';

/**
 * @description This is a stateless component iterates through
 * the user
 * @param {*} userList 
 * @returns A list element
 */
const UserList = ({ userList }) => (
  <ul className="list-group">
    {
      userList.map((user, index) => (<GroupUsers user={user} key={index}/>))
    }
  </ul>

);

UserList.propTypes = {
  userList: PropTypes.array.isRequired,
};

export default UserList;
