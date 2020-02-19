import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';
import store from './store';
import Navbar from './components/layout/Navbar';
import Home from './components/auth/Home';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';
import Startups from './components/startups/Startups';
import EditStartupModal from './components/startups/EditStartupModal';
import AddStartupModal from './components/startups/AddStartupModal';

// Single Page Application Component App (contains all other components)
const App = () => {
  useEffect(() => {
    //Initialize Materialize JS Automatically
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <Fragment>
        {/* flex-box-wrapper allows for sticky footer */}
        <div className="page-flexbox-wrapper">
          <Router>
            <main>
              <Navbar />
              <AddStartupModal />
              <EditStartupModal />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/startups" component={Startups} />
              </Switch>
            </main>
            <Footer />
          </Router>
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;
