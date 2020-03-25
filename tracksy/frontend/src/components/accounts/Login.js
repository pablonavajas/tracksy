import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
    return (
      <div>
        <section className="section section-login">
          <div className="form-container">
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="card-panel login blue white-text center">
                  <h2>Tracksy Login</h2>
                  <form onSubmit={this.onSubmit}>
                    <div className="input-field">
                      <i className="material-icons prefix">account_box</i>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.onChange}
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
                        onChange={this.onChange}
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
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
