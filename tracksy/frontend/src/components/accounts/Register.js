import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("submit");
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, email, password, password2 } = this.state;
    return (
      <div>
        <section className="section section-login">
          <div className="form-container">
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="card-panel login blue white-text center">
                  <h2>Register</h2>
                  <form>
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

                    <a className="btn  #546e7a blue-grey darken-1 waves-effect waves-light">
                      Login
                    </a>
                    <p>
                      Don't have an account?{" "}
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

export default Register;
