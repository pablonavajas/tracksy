import React, { Fragment, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    //Initialize Materialize JS
    M.AutoInit();
  });
  return (
    <div>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Login />
          </div>
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
