import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const Navbar = ({ title, icon, auth, logout }) => {
  const { isAuthenticated, username, isStartup } = auth;
  const vcLinks = (
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <span className="mr-3">
        <strong>{username ? `Welcome ${username}` : ""}</strong>
      </span>
      <li className="right">
        <a onClick={logout}>Logout</a>
      </li>
    </ul>
  );

  const startupLinks = (
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li>
        <span className="mr-3">
          <strong>{username ? `Welcome ${username}` : ""}</strong>
        </span>
      </li>
      <li className="right">
        <a onClick={logout}>Logout</a>
      </li>
      <li className="right">
        <Link to="/startupPage">History</Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li className="right">
        <Link to="/login">Login</Link>
      </li>
      <li className="right">
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );

  return (
    <nav className="blue" style={{ marginBottom: "30px" }}>
      <div className="nav-wrapper cont">
        <a href="/" className="brand-logo">
          <i className="material-icons" style={{ marginLeft: "30px" }}>
            {icon}
          </i>
          {title}
        </a>
        {isAuthenticated ? (isStartup ? startupLinks : vcLinks) : guestLinks}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  title: "Tracksy",
  icon: "cloud"
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
