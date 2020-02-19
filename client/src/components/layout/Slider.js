import React, { Fragment, useContext } from 'react';
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom';

const slideImages = ['"../../img/background.jpg'];

const Slider = () => {
  return (
    // <footer className="footer-class section blue white-text center page-footer">
    //   <div className="container">
    //     <p>Tracksy Copyright &copy; 2020</p>
    //   </div>
    // </footer>

    <footer className="page-footer blue">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">
              You can use rows and columns here to organize your footer content.
            </p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">© 2020 Tracksy Copyright</div>
      </div>
    </footer>
  );
};

export default Footer;
