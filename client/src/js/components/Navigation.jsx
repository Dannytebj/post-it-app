import React from 'react';
// import { Link } from 'react-router';
import { NavLink } from 'react-router-dom';


/**
 * @description This is a stateless component that returns
 * an unordered list of navigation elements
 * 
 */
const MyNavigator = () => (
  <ul className="nav navbar-nav">         
    <li>
      <NavLink to={'/home'}>
        <p className="menu">Home</p>
      </NavLink>
    </li>
    <li>
      <NavLink to={'/createGroup'}>
        <p className="menu"> Create Group</p>
      </NavLink>
    </li>
    <li>
      <NavLink to={'/group'}>
        <p className="menu">Groups</p>
      </NavLink>
    </li>
    <li>
      <NavLink to={'/message'}>
        <p className="menu">Message Board</p>
      </NavLink>
    </li>
    <li>
      <NavLink to={'/signOut'}>
        <p className="menu">Sign Out</p>
      </NavLink>
    </li>
  </ul>
);
export default MyNavigator;
