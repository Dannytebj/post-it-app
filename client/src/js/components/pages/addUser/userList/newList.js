import React from 'react';
import PropTypes from 'prop-types';
import User from './user';

const NewList = ({ newList }) => {
    return (<ul>
        {
            newList.map((user, index) => {
                return (<User user={user} key={index}/>);
            })
        }
    </ul>);
};

NewList.propTypes = {
    newList: PropTypes.array.isRequired
};

export default NewList;
