import React from 'react';
import PropTypes from 'prop-types';
import AllUsers from './AllUsers';

const propTypes = {
  allUserList: PropTypes.array.isRequired,
};

/**
 * @description Receives an array of Object(allUser)
 * and creates a list element
 * 
 * @returns a list element
 * 
 * @param {Array} allUserList 
 */
const AllUserList = ({ allUserList }) => (
  <ul className="list-group">
    {
      allUserList.map(user => 
        (<AllUsers user={user} key={user.id}/>))
    }
  </ul>
);

AllUserList.propTypes = propTypes;

export default AllUserList;
