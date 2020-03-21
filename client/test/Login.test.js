import React from 'react';
import { Slide } from 'react-materialize';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

import Login from '../src/components/auth/Login';
configure({ adapter: new Adapter() });

describe('<Login/> compnent', () => {
  it('should render a an h2 tag asying Tracksy Login', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.contains(<h2>Tracksy Login</h2>)).toBe(true);
    //expect(wrapper.find('h2')).toHaveLength(1);
  });
});
