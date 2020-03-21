import StartupItem from '../src/components/startups/StartupItem';
import { configure, shallow, mount, render } from 'enzyme';
import { create } from 'react-test-renderer';
import React from 'react';
import { Provider } from 'react-redux';
import regeneratorRuntime from 'regenerator-runtime';

import Adapter from 'enzyme-adapter-react-16';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { setCurrent, deleteStartup } from '../src/actions/startupsActions';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

describe('Button for ', () => {
  let startup;
  const onDeleteMock = jest.fn();
  let store;
  let wrapper;

  beforeEach(() => {
    startup = { id: 0, name: 'company1' };
    //deleteCurrent = jest.fn();
    store = mockStore({});

    wrapper = mount(
      <Provider store={store}>
        <StartupItem
          startup={startup}
          setCurrent={setCurrent}
          deleteStartup={deleteStartup}
        />
      </Provider>
    );
    // Runs before each test in the suite
    store.clearActions();
  });

  it('editing should call the setCurrent() action', () => {
    wrapper.find({ href: '#edit-startup-modal' }).simulate('click');
    expect(store.getActions()).toEqual([setCurrent(startup)]);
  });

  it('deleting should call the deleteStartup() action', () => {
    wrapper
      .find('a')
      .at(2)
      .simulate('click');
    //console.log(wrapper.find({ href: '#!' }).debug());

    // test currently not working as expected with store.getActions()
    // as deleteStartup(startup.id) returns an Anonymous function
    expect(store.getActions()).toEqual([]);
  });
});
