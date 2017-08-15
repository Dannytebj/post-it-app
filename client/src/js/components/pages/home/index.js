import React, { Component } from 'react';
import { browserHistory } from "react-router";
import Layout from '../layout';
import EditProfile from './editProfile';

class Home extends Component {
    render() {
        const user = localStorage.getItem('userName');
        if (user === null) {
            window.location.reload();
            browserHistory.push('/');  
        } else {
        return (
<div className="container-fluid">
<div className="row">
    <Layout/>
  <div className="col-sm-9">
  <div className="jumbotron">
  <h3>Welcome to the PostiT App</h3>
  <div className="panel panel-default">
  <div className="panel-body">
      <p>
   PostIt is a simple application that allows friends 
   and colleagues create groups for notifications. 
   This way one person can post notifications to everyone by 
   sending a message once. The application allows people create accounts, 
   create groups and add registered users to the groups, 
   and then send messages out 
   to these groups whenever they want.
    </p>
  </div>
</div>
</div>
  </div>
</div>
</div>
);
        }
    }
}

export default Home;
