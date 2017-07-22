import React from 'react';
import { Link } from 'react-router';
import '../../../index.scss';
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
);

export default Navigator;