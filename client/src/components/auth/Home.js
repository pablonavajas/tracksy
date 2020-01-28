import React, { useState, useContext, useEffect } from 'react';
import Footer from '../layout/Footer';

const Home = props => {
  return (
    <div>
      <section className="slider">
        <ul className="slides">
          <li>
            <img src="../../img/background.jpg" alt="" />
            <div className="caption center-align darken-2 blue-text">
              <h2>Relationship Management</h2>
              <h5 className="darken-2 blue-text text-lighten-3 hide-on-small-only">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio
                itaque similique dolores quam et!
              </h5>
              <a
                href="login.html"
                className="btn btn-large blue darken-2 white-text"
              >
                Learn More
              </a>
            </div>
          </li>
        </ul>
      </section>

      <script
        type="text/javascript"
        src="https://code.jquery.com/jquery-3.2.1.min.js"
      >
        setTimeout(function(){' '}
        {$(document).ready(function() {
          // Init Slider
          $('.slider').slider({
            indicators: false,
            height: 500,
            transition: 500,
            interval: 6000
          });
        })}
        , 1000);
      </script>
    </div>
  );
};

export default Home;
