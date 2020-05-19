import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Preloader from "../layout/Preloader";

export const VCPrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <Preloader />;
      } else if (!auth.isAuthenticated && !localStorage.token) {
        return <Redirect to="/login" />;
      } else if (auth.isStartup) {
        // console.log(auth.isStartup);
        return <Redirect to="/startupPage" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(VCPrivateRoute);
