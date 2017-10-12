import React from 'react';
import { Link } from 'react-router';

const MyNavigator = () => (
  <ul className="nav navbar-nav">         
    <li>
      <Link to={'home'}>
        <span className="glyphicon glyphicon-home" aria-hidden="true"/>
        <p className="menu">Home</p>
      </Link>
    </li>
    <li>
      <Link to={'group'}>
        <span className="glyphicon glyphicon-bullhorn" aria-hidden="true"/>
        <p className="menu">Group</p>
      </Link>
    </li>
    <li>
      <Link to={'message'}>
        <span className="glyphicon glyphicon-blackboard" aria-hidden="true"/>
        <p className="menu">Message Board</p>
      </Link>
    </li>
    <li>
      <Link to={'signOut'}>
        <span className="glyphicon glyphicon-log-out" aria-hidden="true"/>
        <p className="menu">Sign Out</p>
      </Link>
    </li>
  </ul>
);
export default MyNavigator;
