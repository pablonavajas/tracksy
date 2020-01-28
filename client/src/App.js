import React, { Fragment, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/auth/Home';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';
import './App.css';

const App = () => {
  useEffect(() => {
    //Initialize Materialize JS
    M.AutoInit();

    function docReady(fn) {
      // see if DOM is already available
      if (
        document.readyState === 'complete' ||
        document.readyState === 'interactive'
      ) {
        // call on next available tick
        setTimeout(fn, 1);
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }

    docReady(function() {
      // Init Slider
      document.getElementsByClassName('slider').slider({
        indicators: false,
        height: 500,
        transition: 500,
        interval: 6000
      });
    });
  });
  return (
    <div>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>
          {/* <Login /> */}
          <Footer />
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
