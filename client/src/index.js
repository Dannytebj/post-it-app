import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Login from './js/components/login';
import Home from './js/components/pages/home';
import Groups from './js/components/pages/groups';
import SignOut from './js/components/pages/signOut';
import MessageBoard from './js/components/pages/messageBoard';
import './index.scss';
/**
 * Contains Routes to all my components
 */
ReactDOM.render(
  <Router history={ browserHistory }>
      <Route path="/" component={ Login } />
      <Route path= "home" component={ Home } />
      <Route path= "group" component={ Groups } />
      <Route path= "message" component={ MessageBoard } />
      <Route path= "signOut" component={ SignOut } />
  </Router>,
  document.getElementById('main-container')
);
