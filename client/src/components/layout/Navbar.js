import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <nav className="blue" style={{ marginBottom: '30px' }}>
      <div className="nav-wrapper cont">
        <a href="#" class="brand-logo">
          <i class="material-icons" style={{ marginLeft: '30px' }}>
            {icon}
          </i>
          {title}
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className="right">
            <Link to="/register">Register</Link>
          </li>
          <li className="right">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
    /*
    <Fragment>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </Fragment>
    */
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
