import Navbar from '../src/components/layout/Navbar';
import React from 'react';
import { configure, shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  it('should render three navigation items', () => {
    expect(wrapper.find('li')).toHaveLength(3);
  });

  it('Login tab is rendered', () => {
    expect(wrapper.contains(<Link to="/login">Login</Link>)).toBe(true);
  });

  it('Overview tab is rendered', () => {
    expect(wrapper.contains(<Link to="/startups">Overview</Link>)).toBe(true);
  });

  it('Home tab is rendered', () => {
    expect(wrapper.contains(<Link to="/">Home</Link>)).toBe(true);
  });
});
