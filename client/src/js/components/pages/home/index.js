import React, { Component } from 'react';
import Navigator from '../../navigation';

class Home extends Component {
    render() {
        const user = localStorage.getItem('userName');
        return (<div className="page">
            <Navigator/>
            <div className="page-content">
                Welcome {user}
            </div>
        </div>);
    }
}

export default Home;
