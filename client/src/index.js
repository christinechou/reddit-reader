import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';
import App from './components/App.jsx';
import User from './components/User.jsx';
require("babel-register")

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      
    </Router>
  ), document.getElementById('app'));
});
