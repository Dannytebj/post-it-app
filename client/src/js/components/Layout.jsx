import React from 'react';
import MyNavigator from './Navigation';
/**
 * @description Stateless component that renders layout
 * contains navigator
 */     
const Layout = () => {
  const user = localStorage.getItem('userName');
  return (<nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" 
          className="navbar-toggle collapsed" 
          data-toggle="collapse" 
          data-target="#my-navbar-collapse" 
          aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href="#">Welcome, {user}</a>
      </div>
      <div className="collapse navbar-collapse" id="my-navbar-collapse">
        <MyNavigator/>
      </div>
    </div>
  </nav>);
};

export default Layout;  
