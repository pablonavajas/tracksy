import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { createMessage } from "../../actions/messageActions";
import { InputFieldWithIconPrefix } from "../smallComponents/inputFields";

export const Register = ({ isAuthenticated, register, createMessage }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (password != password2) {
      createMessage({ fail: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        email,
        password,
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
                  <InputFieldWithIconPrefix
                    id="username"
                    type="text"
                    name="User Name"
                    value={username}
                    setFunction={setUsername}
                    required={true}
                    iconName="account_box"
                  />
                  <InputFieldWithIconPrefix
                    id="email"
                    type="email"
                    name="Email Address"
                    value={email}
                    setFunction={setEmail}
                    required={true}
                    iconName="email"
                  />
                  <InputFieldWithIconPrefix
                    id="password"
                    type="password"
                    name="Password"
                    value={password}
                    setFunction={setPassword}
                    required={true}
                    minLength="6"
                    iconName="lock"
                  />
                  <InputFieldWithIconPrefix
                    id="password2"
                    type="password"
                    name="Password"
                    value={password2}
                    setFunction={setPassword2}
                    required={true}
                    minLength="6"
                    iconName="lock"
                  />
                  <button
                    id="registerSubmitButton"
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
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
