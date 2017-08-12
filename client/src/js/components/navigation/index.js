import React from 'react';
import { Link } from 'react-router';
import '../../../index.scss';

const Navigator = () => (
<ul className="nav navbar-nav">         
    <li>
    <Link to={'home'}>
    <span className="glyphicon glyphicon-home" aria-hidden="true"/>   Home
    </Link>
    </li>
    <li>
    <Link to={'group'}>
    <span className="glyphicon glyphicon-bullhorn" aria-hidden="true"/> Groups
    </Link>
    </li>
    <li>
    <Link to={'message'}>
    <span className="glyphicon glyphicon-blackboard" aria-hidden="true"/>  
    Message Board
    </Link>
    </li>
    <li>
        <Link to={'signOut'}>
        <span className="glyphicon glyphicon-log-out" aria-hidden="true"/> 
        Sign Out
        </Link>
    </li>
</ul>
);

export default Navigator;