import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <nav className="blue" style={{ marginBottom: '30px' }}>
      <div className="nav-wrapper cont">
        <a href="/" className="brand-logo">
          <i className="material-icons" style={{ marginLeft: '30px' }}>
            {icon}
          </i>
          {title}
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className="right">
            <Link to="/login">Login</Link>
          </li>
          <li className="right">
            <Link to="/">Home</Link>
          </li>
          <li className="right">
            <Link to="/startups">Overview</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: 'Tracksy',
  icon: 'cloud'
};

export default Navbar;
