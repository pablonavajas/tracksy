import React, { useState, useContext, useEffect } from 'react';
import Footer from '../layout/Footer';

const Login = props => {
  const onSubmit = e => {};
  const onChange = e => {};

  const email = '';
  const password = '';

  return (
    <div>
      <section className="section section-login">
        <div className="form-container">
          <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="card-panel login blue white-text center">
                <h2>Tracksy Login</h2>
                <form action="index.html" onSubmit={onSubmit}>
                  <div className="input-field">
                    <i className="material-icons prefix">email</i>
                    <input
                      type="email"
                      id="email"
                      onChange={onChange}
                      required
                    />
                    <label className="white-text" for="email">
                      Email
                    </label>
                  </div>
                  <div className="input-field">
                    <i className="material-icons prefix">lock</i>
                    <input
                      type="password"
                      id="password"
                      onChange={onChange}
                      required
                      minLength="6"
                    />
                    <label className="white-text" for="password">
                      Password
                    </label>
                  </div>
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-large btn-extended grey lighten-4 black-text"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    // <div className="form-container">
    //   <h1>
    //     Account <span className="text-primary">Login</span>
    //   </h1>

    //   <form onSubmit={onSubmit}>
    //     <div>
    //       <label htmlFor="email">Email Address</label>
    //       <input
    //         type="email"
    //         name="email"
    //         //value={email}
    //         onChange={onChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         //value={password}
    //         onChange={onChange}
    //         required
    //         minLength="6"
    //       />
    //     </div>
    //     <input
    //       type="submit"
    //       value="Login"
    //       className="btn btn-primary btn-block"
    //     />
    //   </form>
    // </div>
  );
};

export default Login;
