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

import { loadUser } from "../actions/authActions";

import "./App.css";

import Home from "./home/Home";
import Startups from "./startups/Startups";
import EditStartupModal from "./startups/EditStartupModal";
import AddStartupModal from "./startups/AddStartupModal";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";

import M from "materialize-css";
import StartupForm from "./startupForm/StartupForm";
import AddInvestmentModal from "./startups/AddInvestmentModal";
import AddKpiNamesModal from "./startups/AddKpiNamesModal";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    M.AutoInit();
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <div className="page-flexbox-wrapper">
              <main>
                <Navbar />
                <Alerts />
                <div className="container">
                  <AddStartupModal />
                  <EditStartupModal />
                  <AddInvestmentModal />
                  <AddKpiNamesModal />
                  <Switch>
                    <PrivateRoute exact path="/" component={Startups} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/form" component={StartupForm} />
                  </Switch>
                </div>
              </main>
              <Footer />
            </div>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
