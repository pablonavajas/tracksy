import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { InputFieldWithIconPrefix } from "../smallComponents/inputFields";

export const Login = ({ isAuthenticated, login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <div>
      <section className="section section-login">
        <div className="form-container">
          <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="card-panel login blue white-text center">
                <h2>Tracksy Login</h2>
                <form onSubmit={onSubmit}>
                  <InputFieldWithIconPrefix
                    id="username"
                    type="text"
                    name="Username"
                    value={username}
                    setFunction={setUsername}
                    required={true}
                    iconName="account_box"
                  />
                  <InputFieldWithIconPrefix
                    id="password"
                    type="password"
                    name="Password"
                    value={password}
                    setFunction={setPassword}
                    required={true}
                    iconName="lock"
                  />
                  <button
                    className="btn #546e7a blue-grey darken-1 waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Login
                  </button>
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#FFF" }}>
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
