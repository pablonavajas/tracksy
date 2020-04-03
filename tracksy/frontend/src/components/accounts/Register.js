import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { createMessage } from "../../actions/messageActions";

function Register({ isAuthenticated, register, createMessage }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (password != password2) {
      createMessage({ fail: "Password do not match" });
    } else {
      const newUser = {
        username,
        email,
        password
      };
      register(newUser);
    }
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
                <h2>Register</h2>
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
                    <i className="material-icons prefix">email</i>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="email" className="white-text">
                      Email Address
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
                  <div className="input-field">
                    <i className="material-icons prefix">lock</i>
                    <input
                      id="password2"
                      type="password"
                      name="password2"
                      value={password2}
                      onChange={e => setPassword2(e.target.value)}
                      required
                      minLength="6"
                    />
                    <label htmlFor="password2" className="white-text">
                      Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn  #546e7a blue-grey darken-1 waves-effect waves-light"
                  >
                    Register
                  </button>
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#FFF" }}>
                      Login
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

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, createMessage })(Register);
