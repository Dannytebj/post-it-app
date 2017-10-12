import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Login from '../src/js/components/Login.jsx';
import NotFound from './js/components/NotFound.jsx';
import Home from './js/components/Home.jsx';
import Groups from './js/components/Groups.jsx';
import SignOut from './js/components/SignOut.jsx';
import './scss/index.scss';

/**
 * Contains Routes to all my components
 */
const RequireAuth = (nextState, replace) => {
  const user = localStorage.getItem('userUid');
  if (!user) {
    replace({
      pathname: '/',
    });
  }
};
ReactDOM.render(
  <Router history={ browserHistory }>
    <Route  path="/" component={ Login } />
    <Route  path= "home" component={ Home } onEnter= {RequireAuth}/>
    <Route  path= "group" component={ Groups } onEnter= {RequireAuth}/>
    <Route  path= "signOut" component={ SignOut } />
    <Route  path ="/*" component ={ NotFound } />
  </Router>,
  document.getElementById('app'));
