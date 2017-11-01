import React from 'react';
import PropTypes from 'prop-types';
import AllUsers from './AllUsers';

const AllUserList = ({ allUserList }) => (
  <ul className="list-group">
    {
      allUserList.map((user, index) => 
        (<AllUsers user={user} key={index}/>))
    }
  </ul>
);

AllUserList.propTypes = {
  allUserList: PropTypes.array.isRequired,
};

export default AllUserList;
