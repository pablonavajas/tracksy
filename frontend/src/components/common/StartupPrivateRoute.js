import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Preloader from "../layout/Preloader";

export const StartupPrivateRoute = ({
  component: Component,
  auth,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <Preloader />;
      } else if (!auth.isAuthenticated && !localStorage.token) {
        return <Redirect to="/login" />;
      } else if (auth.isStartup === false && auth.isLoading === false) {
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(StartupPrivateRoute);
