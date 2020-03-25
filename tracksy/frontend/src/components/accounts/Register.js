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
    password2: "",
    is_staff: "" // is VC_fund?
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2, is_staff } = this.state;
    if (password != password2) {
      this.props.createMessage({ passwordsNotMatch: "Password do not match" });
    } else {
      const newUser = {
        username,
        email,
        password,
        is_staff
      };
      this.props.register(newUser);
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRadioChange = e => {
    console.log(e.target.name);
    console.log(e.target.value);

    this.setState({ [e.target.name]: e.target.value });
    const { is_staff } = this.state;
    console.log(is_staff);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2, is_staff } = this.state;
    return (
      <div>
        <section className="section section-login">
          <div className="form-container">
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="card-panel login blue white-text center">
                  <h2>Register</h2>
                  <form>
                    <label>
                      <input
                        name="is_staff"
                        className="with-gap"
                        type="radio"
                        value={true}
                        onChange={this.onChange}
                      />
                      <span className="white-text">VC Fund</span>
                    </label>

                    <label className="radio-buttons-container">
                      <input
                        name="is_staff"
                        className="with-gap"
                        type="radio"
                        value={false}
                        onChange={this.onChange}
                      />
                      <span className="white-text">Startup</span>
                    </label>
                  </form>

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
                      <label for="username" className="white-text">
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
                        onChange={this.onChange}
                        required
                      />
                      <label for="email" className="white-text">
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
                        onChange={this.onChange}
                        required
                        minLength="6"
                      />
                      <label for="password" className="white-text">
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
                        onChange={this.onChange}
                        required
                        minLength="6"
                      />
                      <label for="password2" className="white-text">
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
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, createMessage })(Register);
