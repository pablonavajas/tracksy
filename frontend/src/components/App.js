import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";

import AlertTemplate from "react-alert-template-basic";
import M from "materialize-css";

import "./App.css";

import StartupOverview from "./startups/StartupOverview";
import JobConnections from "./startups/JobConnections";
import TotalConnections from "./startups/TotalConnections";
import Hiring from "./startups/Hiring";
import store from "../store";
import { loadUser } from "../actions/authActions";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Startups from "./startups/Startups";
import EditStartupModal from "./startups/EditStartupModal";
import AddStartupModal from "./startups/AddStartupModal";
import MessageAlerts from "./layout/MessageAlerts";
import ErrorAlerts from "./layout/ErrorAlerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import VCPrivateRoute from "./common/VCPrivateRoute";
import StartupPrivateRoute from "./common/StartupPrivateRoute";
import StartupForm from "./startupForm/StartupForm";
import AddInvestmentModal from "./startups/AddInvestmentModal";
import AddKpiNamesModal from "./startups/AddKpiNamesModal";
import StartupPage from "./startupForm/StartupPage";
import AddJobModal from "./jobs/AddJobModal";
import ReviewIntrosModal from "./jobs/ReviewIntrosModal";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center",
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
                <MessageAlerts />
                <ErrorAlerts />
                <div className="container">
                  <AddStartupModal />
                  <EditStartupModal />
                  <AddInvestmentModal />
                  <AddKpiNamesModal />
                  <AddJobModal />
                  <ReviewIntrosModal />
                  <Switch>
                    <VCPrivateRoute exact path="/" component={Startups} />
                    <StartupPrivateRoute
                      exact
                      path="/startupPage"
                      component={StartupPage}
                    />
                    <StartupPrivateRoute
                      exact
                      path="/startupForm"
                      component={StartupForm}
                    />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <VCPrivateRoute
                      exact
                      path="/startup-overview"
                      component={StartupOverview}
                    />
                    <VCPrivateRoute exact path="/hiring" component={Hiring} />
                    <VCPrivateRoute exact path="/job-connections" component={JobConnections} />
                    <VCPrivateRoute exact path="/total-connections" component={TotalConnections} />
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

export default App;
