import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { createMessage } from "../../actions/messageActions";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password != password2) {
      this.props.createMessage({ passwordsNotMatch: "Password do not match" });
    } else {
      const newUser = {
        username,
        email,
        password
      };
      this.props.register(newUser);
    }
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div>
        <section className="section section-login">
          <div className="form-container">
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="card-panel login blue white-text center">
                  <h2>Register</h2>
                  <form onSubmit={this.onSubmit}>
                    <div className="input-field">
                      <i className="material-icons prefix">account_box</i>
                      <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.onChange}
                        required
                      />
                      <label className="white-text">Username</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">email</i>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        required
                      />
                      <label className="white-text">Email Address</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">lock</i>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        required
                        minLength="6"
                      />
                      <label className="white-text">Password</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">lock</i>
                      <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={this.onChange}
                        required
                        minLength="6"
                      />
                      <label className="white-text">Password</label>
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
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, createMessage })(Register);