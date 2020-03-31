import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const VCPrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading) {
        return (
          <div className="progress">
            <div className="indeterminate" />
          </div>
        );
      } else if (!auth.isAuthenticated && !localStorage.token) {
        return <Redirect to="/login" />;
      } else if (auth.isStartup) {
        // console.log(auth.isStartup);
        return <Redirect to="/startupForm" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(VCPrivateRoute);
