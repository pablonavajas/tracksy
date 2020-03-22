import React from 'react';
import { Caption, Slide, Slider } from 'react-materialize';

const Home = props => {
  return (
    <Slider
      fullscreen={false}
      options={{
        duration: 500,
        height: 700,
        indicators: true,
        interval: 6000
      }}
    >
      <Slide
        image={
          <img
            alt=""
            src="https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80"
          />
        }
      >
        <Caption placement="center">
          <h3>The right place</h3>
          <h5 className="light grey-text text-lighten-3">
            To manage relationships with your portfolio companies.
          </h5>
        </Caption>
      </Slide>
      <Slide
        image={
          <img
            alt=""
            src="https://images.unsplash.com/photo-1570470767483-286963cb60cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
          />
        }
      >
        <Caption placement="left">
          <h3>Left Aligned Caption</h3>
          <h5 className="light grey-text text-lighten-3">
            Here's our small slogan.
          </h5>
        </Caption>
      </Slide>
      <Slide
        image={
          <img
            alt=""
            src="https://images.unsplash.com/photo-1581196598638-2aa9cba1432a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80"
          />
        }
      >
        <Caption placement="right">
          <h3>Right Aligned Caption</h3>
          <h5 className="light grey-text text-lighten-3">
            Here's our small slogan.
          </h5>
        </Caption>
      </Slide>
      <Slide
        image={
          <img
            alt=""
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2291&q=80"
          />
        }
      >
        <Caption placement="center">
          <h3>This is our big Tagline!</h3>
          <h5 className="light grey-text text-lighten-3">
            Here's our small slogan.
          </h5>
        </Caption>
      </Slide>
    </Slider>
  );
};

export default Home;
