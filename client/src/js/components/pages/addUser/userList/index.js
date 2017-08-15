import React from 'react';
import PropTypes from 'prop-types';
import User from './user';

const UserList = ({ userList }) => {
    return (<ul id="groups">
        {
            userList.map((user, index) => {
                return (<User user={user} key={index}/>);
            })
        }
    </ul>);
};

UserList.propTypes = {
    userList: PropTypes.array.isRequired
};

export default UserList;
