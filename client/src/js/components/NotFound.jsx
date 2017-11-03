import React from 'react';
import { Link } from 'react-router';
import Img from 'react-image';

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
            <Link to={'home'}>
        Back to Safety
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
export default NotFound;
