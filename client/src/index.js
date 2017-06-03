import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Login from './js/components/login';

ReactDOM.render(
  <Router history={ browserHistory }>
      <Route path="login" component={ Login } />
  </Router>,
  document.getElementById('main-container')
);
