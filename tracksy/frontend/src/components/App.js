import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "../store";

//import "./App.css";
// import store from './store';
import Home from "./home/Home";
// import Login from "./components/auth/Login";

import Startups from "./startups/Startups";
import EditStartupModal from "./startups/EditStartupModal";
import AddStartupModal from "./startups/AddStartupModal";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";

import M from "materialize-css";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Navbar />
              <Alerts />
              <div className="container">
                <AddStartupModal />
                <EditStartupModal />
                <Switch>
                  <Route exact path="/" component={Startups} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
              <Footer />
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
