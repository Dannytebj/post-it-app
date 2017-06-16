import React from 'react';
import { Link } from 'react-router';

const Navigator = () => (
    <div className="app-navigator">
        <div className="navigator">
            <Link to={'home'}>Home</Link>
            <Link to={'groups'}>Groups</Link>
            <Link to={'addUser'}>Add User</Link>
        </div>
    </div>
);

export default Navigator;