import React, { Component } from 'react';
import Navigator from '../navigation';

class Layout extends Component {
    render(){
        const user = localStorage.getItem('userName');
        return(
<div className="col-sm-3">
    <div className="sidebar-nav">
      <div className="navbar navbar-default" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" 
          data-toggle="collapse" data-target=".sidebar-navbar-collapse">

            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <span className="visible-xs navbar-brand">PostiT Menu</span>
        </div>
        <div className="navbar-collapse collapse sidebar-navbar-collapse">
          <ul className="nav navbar-nav">
        <h4 >Welcome &nbsp;    
             <span className="label label-primary">{user}</span></h4> 
              <Navigator/>
            </ul>
        </div>
        {/* nav-collapse */}
      </div>
    </div>
  </div>
        )
    }
}
export default Layout;