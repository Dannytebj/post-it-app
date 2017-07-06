import React from 'react';
import PropTypes from 'prop-types';
import Group from './group.js';

const GroupList = ({ groupList }) => {
    return (<ul id="myDiv">
        {
            groupList.map((group, index) => {
                return (<Group group={group} key={index}/>);
            })
        }
    </ul>);
};

GroupList.propTypes = {
    groupList: PropTypes.array.isRequired
};

export default GroupList;
