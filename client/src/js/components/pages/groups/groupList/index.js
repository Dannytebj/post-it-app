import React from 'react';
import PropTypes from 'prop-types';
import Group from './group.js';

const GroupList = ({ groupList }) => {
    return (<ul id="myDiv">
        {
            Object.keys(groupList).map((key, index) =>{
                console.log(groupList[index]);
                return (<Group group ={groupList[key]} key={index} />)
            })
            /*groupList.map((group, index) => {
                return (<Group group={groups} key={index}/>);
            })*/
        }
    </ul>);
};

GroupList.propTypes = {
    groupList: PropTypes.object.isRequired
};

export default GroupList;
