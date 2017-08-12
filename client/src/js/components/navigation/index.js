import React from 'react';
import { Link } from 'react-router';
import '../../../index.scss';
<<<<<<< HEAD

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
=======
// import './style.scss';


const Navigator = () => (

    <div className="app-navigator">
        
            <ul>
            <li><Link to={'home'}>Home</Link></li>
            <li><Link to={'group'}>Groups</Link></li>
            <li><Link to={'message'}>Message Board</Link></li>
            <li><Link to={'signOut'}>Sign Out</Link></li>
            </ul>
    </div>
>>>>>>> 6ea970e1ca388c19e6d58ae1ef7e62fac43a3ecf
);

export default Navigator;