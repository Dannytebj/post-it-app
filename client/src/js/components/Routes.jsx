import React from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Home from '../components/Home';
import CreateGroup from '../components/CreateGroup';
import MessageBoard from '../components/MessageBoard';
import SignOut from '../components/SignOut';
import BroadCastGroup from '../components/BroadCastGroup';
import GroupsBoard from './GroupsBoard';
import GroupLayout from './GroupLayout';
import appHistory from '../utils/History';

/**
 * @description Contains Routes to all components
 */
const RequireAuth = () => {
  let isAuthenticated;
  isAuthenticated = false;
  const user = localStorage.getItem('userUid');
  if (!user) {
    return isAuthenticated;
  }
  isAuthenticated = true;
  return isAuthenticated;
};
const Routes = () => (
  <Router history={ appHistory } >
    <div>
      <Switch>
        <Route  path= "/home" render={() => (RequireAuth() ?
          (<Home/>) : <Redirect to='/'/>)} 
        />
        <Route  path= "/createGroup" render={() => (RequireAuth() ? 
          (<CreateGroup/>) : <Redirect to='/'/>)} 
        />
        <Route  path= "/message" render={() => (RequireAuth() ? 
          (<MessageBoard/>) : <Redirect to='/'/>)} 
        />
        <Route  path="/broadCastGroup/" render={() => (RequireAuth() ? 
          (<BroadCastGroup/>) : <Redirect to='/'/>)} 
        />
        <Route  path="/groups/" render={() => (RequireAuth() ? 
          (<GroupsBoard/>) : <Redirect to='/'/>)} 
        />
        <Route  path="/group" render={() => (RequireAuth() ? 
          (<GroupLayout/>) : <Redirect to='/'/>)} 
        />
        <Route  path= "/signOut" component={ SignOut } />
        <Route  path="/" component={ Login } />
        <Route  path ="/*" component ={ NotFound } />
      </Switch>
    </div>
  </Router>
);
export default Routes;
