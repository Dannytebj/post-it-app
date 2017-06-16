import React, { Component } from 'react';
import Navigator from '../../navigation';

class Home extends Component {
    render() {
        return (<div className="page">
            <Navigator/>
            <div className="page-content">
                Welcome to Home
            </div>
        </div>);
    }
}

export default Home;
