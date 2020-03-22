import React from 'react';

const Login = props => {
  // const onSubmit = e => {};
  // const onChange = e => {};

  // const email = '';
  // const password = '';

  return (
    <div>
      <section className="section section-login">
        <div className="form-container">
          <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="card-panel login blue white-text center">
                <h2>Tracksy Login</h2>
                <form action="index.html">
                  <div className="input-field">
                    <i className="material-icons prefix">email</i>
                    <input type="email" id="email" required />
                    <label className="white-text">Email</label>
                  </div>
                  <div className="input-field">
                    <i className="material-icons prefix">lock</i>
                    <input
                      type="password"
                      id="password"
                      required
                      minLength="6"
                    />
                    <label className="white-text">Password</label>
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
  );
};

export default Login;
