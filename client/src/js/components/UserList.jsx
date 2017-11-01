import React from 'react';
import PropTypes from 'prop-types';
import GroupUsers from './GroupUsers.jsx';

const UserList = ({ userList }) => {
  return (
    <ul className="list-group">
      {
        userList.map((user, index) => {
          return (<GroupUsers user={user} key={index}/>);
        })
      }
    </ul>

  );
};

UserList.propTypes = {
  userList: PropTypes.array.isRequired,
};

export default UserList;
