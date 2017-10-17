import React from 'react';
import PropTypes from 'prop-types';
import AllUsers from './AllUsers.jsx';

const AllUserList = ({ allUserList }) => {
  return (
    <ul className="list-group">
      {
        allUserList.map((user, index) => {
          return (<AllUsers user={user} key={index}/>);
        })
      }
    </ul>

  );
};

AllUserList.propTypes = {
  allUserList: PropTypes.array.isRequired,
};

export default AllUserList;
