import React, { Component } from 'react';
import { browserHistory } from "react-router";
import Navigator from '../../navigation';

class Home extends Component {
    render() {
        const user = localStorage.getItem('userName');
        if (user === null) {
            window.location.reload();
            browserHistory.push('/');  
        } else {
        return (<div className="page">
            <Navigator/>
            <div className="page-content">
                Welcome {user}
            </div>
        </div>);
        }
    }
}

export default Home;
