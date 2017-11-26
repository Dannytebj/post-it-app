import React from 'react';


const Landing = () => (
  <div>
    <div className="container-fluid">
      <h3 className="cover-heading">PostIt...Just Post IT</h3>
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <p className="well well-sm landings">
            PostIt is a simple application that allows 
              friends and colleagues create groups for notifications.
               This way one person can post notifications to everyone 
               by sending a message once.
               The application allows people create accounts,
                create groups and add registered users to the groups,
                 and then send messages out to these groups whenever they want.
          </p>
        </div>
        <div className="col-md-5" />
        <div className="col-md-2">
          <p className="lead">
            <a href="/login" className="btn btn-lg btn-default">Get Started</a>
          </p>
        </div>
      </div>

    </div>
  </div>
);
export default Landing;
