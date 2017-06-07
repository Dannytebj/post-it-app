import React from 'react';
import Welcome from './main';
import './style.scss';

class MainTray extends Welcome {


    render() {
        return (
        <div className="tray">
            <h1>Show Whatchu Gat!!</h1>
        </div>
        );
    }
}
export default MainTray;