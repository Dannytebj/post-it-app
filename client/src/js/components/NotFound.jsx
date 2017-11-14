import React from 'react';
import { NavLink } from 'react-router-dom';
import Img from 'react-image';
/**
 * @description This component is rendered when an invalid route is hit
 */
const NotFound = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-4 col-md-offset-3">
        <Img 
      src="http://media02.hongkiat.com/funny-creative-error-404/37-error-404-page.jpg" //eslint-disable-line
        />
      </div>
    </div>
    <div className="row">
      <div className="col-md-4 col-md-offset-3">
        <ul className="nav navbar-nav">         
          <li>
            <NavLink to={'/home'}>
        Back to Safety
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
export default NotFound;
