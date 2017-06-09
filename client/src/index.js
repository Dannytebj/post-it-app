import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Login from './js/components/login';
import Welcome from './js/components/main/main';

ReactDOM.render(
  <Router history={ browserHistory }>
      <Route path="login" component={ Login } />
      <Route path= "main" component={ Welcome } />
  </Router>,
  document.getElementById('main-container'),
  document.getElementById('tray')
);
