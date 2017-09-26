import React, { Component } from 'react';
import { Link } from 'react-router';
import Img from 'react-image';

const NotFound = () => 
    <div>
        <Img src="http://media02.hongkiat.com/funny-creative-error-404/37-error-404-page.jpg" />
        <ul className="nav navbar-nav">         
    <li>
    <Link to={'home'}>
        Go back Home
    </Link>
    </li>
    </ul>

    </div>
export default NotFound;
