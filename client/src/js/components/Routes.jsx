import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Home from '../components/Home';
import Groups from '../components/GroupBoard';
import MessageBoard from '../components/MessageBoard';
import SignOut from '../components/SignOut';


/**
 * @description Contains Routes to all components
 */
const RequireAuth = (nextState, replace) => {
  const user = localStorage.getItem('userUid');
  if (!user) {
    replace({
      pathname: '/',
    });
  }
};
const Routes = () => (
  <Router history={ browserHistory }>
    <Route  path="/" component={ Login } />
    <Route  path= "home" component={ Home } onEnter= {RequireAuth}/>
    <Route  path= "group" component={ Groups } onEnter= {RequireAuth}/>
    <Route  path= "message" component={ MessageBoard } onEnter= {RequireAuth}/>
    <Route  path= "signOut" component={ SignOut } />
    <Route  path ="/*" component ={ NotFound } />
  </Router>
);
export default Routes;
