import React from 'react';
import { Link } from 'react-router';
// import '../../../index.scss';


const Navigator = () => (

    <div className="app-navigator">
        <div className="navigator">
            <Link to={'home'}>Home</Link>
            <Link to={'group'}>Groups</Link>
            <Link to={'addUser'}>Add User</Link>
            <Link to={'signOut'}>Sign Out</Link>
        </div>
    </div>
);

export default Navigator;