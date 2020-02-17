import { Startups, mapStateToProps } from '../src/components/startups/Startups';
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import Adapter from 'enzyme-adapter-react-16';
import AddStartupBtn from '../src/components/layout/AddStartupBtn';
import StartupItem from '../src/components/startups/StartupItem';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

describe('<Startups />', () => {
  let startups;
  let loading;
  let getStartups;
  let store;
  let wrapper;

  beforeEach(() => {
    startups = [
      { id: 0, name: 'company1' },
      { id: 1, name: 'company2' }
    ];

    loading = false;
    getStartups = () => {};
    store = mockStore({});

    wrapper = mount(
      <Provider store={store}>
        <Startups startup={{ startups, loading }} getStartups={getStartups} />
      </Provider>
    );
  });

  it('should render the container component', () => {
    expect(wrapper.find(AddStartupBtn)).toHaveLength(1);
  });

  it('should contain two <StartupItem/> elements', () => {
    expect(wrapper.find(StartupItem)).toHaveLength(2);
    //const container = wrapper.find(LoginContainer);
    //expect(container.find(Login).length).to.equal(1);
    //expect(container.find(Login).props().auth).to.eql({ sport: 'BASKETBALL' });
  });
  it('should output an <h4> tag saying Loading if loading is true', () => {
    wrapper = mount(
      <Provider store={store}>
        <Startups
          startup={{ startups: null, loading }}
          getStartups={getStartups}
        />
      </Provider>
    );
    expect(wrapper.contains('Loading ...')).toBe(true);
    expect(wrapper.find('h4')).toHaveLength(1);
    expect(wrapper.find(StartupItem)).toHaveLength(0);
  });

  it('should output an <h4> tag saying Loading if loading is true', () => {
    wrapper = mount(
      <Provider store={store}>
        <Startups
          startup={{ startups: [], loading: false }}
          getStartups={getStartups}
        />
      </Provider>
    );
    expect(wrapper.contains('No logs to show...')).toBe(true);
    expect(wrapper.find('h5')).toHaveLength(1);
    expect(wrapper.find(StartupItem)).toHaveLength(0);
  });

  // it('should show previously rolled value', () => {
  //   // test that the state values were correctly passed as props
  //   expect(wrapper.props().startup).toBe(1);
  // });
});
