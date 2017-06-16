import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Match } from 'react-router-dom';
import Login from './components/login/index';
import {BrowserRouter as Router, Route } from 'react-router-dom';
// import './index.scss';

class App extends Component {

    render(){
return(
<Router> 
    <div>
        <h1>Welcome to PostIt...</h1><br/>
        Click<a><Link to="/login">Login</Link></a> to Begin...
        <Match pattern="/login" component={ Login } />
    </div>
</Router>
        );
    };
}
module.exports = App;
 