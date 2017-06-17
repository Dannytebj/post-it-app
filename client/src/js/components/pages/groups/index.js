import React, { Component } from 'react';
import Navigator from '../../navigation';
import '../../../../index.scss';

class Groups extends Component {
    render() {
        return (<div className="page">
            <Navigator/>
            <div className="page-content">
                <h1>Welcome to Groups</h1>
                <p>My name is Daniel Atebije</p>
            </div>
        </div>);
    }
}

export default Groups;
