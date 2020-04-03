import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";

function Login({ isAuthenticated, login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = e => {
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
                  <div className="input-field">
                    <i className="material-icons prefix">account_box</i>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="username" className="white-text">
                      Username
                    </label>
                  </div>
                  <div className="input-field">
                    <i className="material-icons prefix">lock</i>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength="6"
                    />
                    <label htmlFor="password" className="white-text">
                      Password
                    </label>
                  </div>

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
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
