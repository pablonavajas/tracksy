import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

import { Provider } from "react-redux";
import store from "../store";

//import "./App.css";
// import store from './store';
import Home from "./home/Home";
// import Login from "./components/auth/Login";

import Startups from "./startups/Startups";
// import EditStartupModal from './components/startups/EditStartupModal';
// import AddStartupModal from './components/startups/AddStartupModal';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Navbar />
          <Startups />
          <Footer />
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
