import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Login from './js/components/login';
import Home from './js/components/pages/home';
import Groups from './js/components/pages/groups';
import SignOut from './js/components/pages/signOut';
import MessageBoard from './js/components/pages/messageBoard';
import NotFound from '../src/js/components/notFound';
import './index.scss';

/**
 * Contains Routes to all my components
 */
const RequireAuth = (nextState, replace) => {
    const user = localStorage.getItem('userName');
  if (!user) {
    replace({
      pathname: '/'
    });
  }
}
ReactDOM.render(
  <Router history={ browserHistory }>
      <Route exact path="/" component={ Login } />
      <Route  path= "home" component={ Home } onEnter= {RequireAuth}/>
      <Route  path= "group" component={ Groups } onEnter= {RequireAuth} />
      <Route  path= "message" component={ MessageBoard } onEnter= {RequireAuth} />
      <Route  path= "signOut" component={ SignOut } />
      <Route  path ="/*" component ={ NotFound } />
  </Router>,
  document.getElementById('app')
);
