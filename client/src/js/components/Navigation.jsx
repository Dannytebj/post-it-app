import React from 'react';
import { Link } from 'react-router';

const MyNavigator = () => (
  <ul className="nav navbar-nav">         
    <li>
      <Link to={'home'}>
        <p className="menu">Home</p>
      </Link>
    </li>
    <li>
      <Link to={'group'}>
        <p className="menu">Group</p>
      </Link>
    </li>
    <li>
      <Link to={'message'}>
        <p className="menu">Message Board</p>
      </Link>
    </li>
    <li>
      <Link to={'signOut'}>
        <p className="menu">Sign Out</p>
      </Link>
    </li>
  </ul>
);
export default MyNavigator;
