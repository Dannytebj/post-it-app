import React from 'react';
import Layout from './Layout';
/**
 * @description stateless component that renders the home page
 */
const Home = () => (
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
export default Home;
