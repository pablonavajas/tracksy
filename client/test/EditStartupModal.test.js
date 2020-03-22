import { configure, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import regeneratorRuntime from 'regenerator-runtime';

import Adapter from 'enzyme-adapter-react-16';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { updateStartup } from '../src/actions/startupsActions';
import EditStartupModal from '../src/components/startups/EditStartupModal';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

describe('onChange for ', () => {
  let current;
  let store;
  let wrapper;

  beforeEach(() => {
    current = {
      id: 0,
      name: 'company1'
    };
    store = mockStore({
      startup: {
        startups: [],
        current: null,
        loading: false,
        error: null
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <EditStartupModal current={current} updateStartup={updateStartup} />
      </Provider>
    );
    // Runs before each test in the suite
    store.clearActions();
  });

  it('name should store it in its input field', () => {
    wrapper
      .find('#name')
      .simulate('change', { target: { value: 'test name' } });
    expect(wrapper.find('#name').prop('value')).toEqual('test name');
  });

  it('website should store it in its input field', () => {
    wrapper
      .find('#website')
      .simulate('change', { target: { value: 'test website' } });
    expect(wrapper.find('#website').prop('value')).toEqual('test website');
  });

  it('ownership should store it in its input field', () => {
    wrapper
      .find('#ownership')
      .simulate('change', { target: { value: 'test ownership' } });
    expect(wrapper.find('#ownership').prop('value')).toEqual('test ownership');
  });

  it('investment_1 should store it in its input field', () => {
    wrapper
      .find('#investment_1')
      .simulate('change', { target: { value: 'test investment_1' } });
    expect(wrapper.find('#investment_1').prop('value')).toEqual(
      'test investment_1'
    );
  });

  it('investment_2 should store it in its input field', () => {
    wrapper
      .find('#investment_2')
      .simulate('change', { target: { value: 'test investment_2' } });
    expect(wrapper.find('#investment_2').prop('value')).toEqual(
      'test investment_2'
    );
  });

  it('type_1 should store it in its input field', () => {
    wrapper
      .find('#type_1')
      .simulate('change', { target: { value: 'test type_1' } });
    expect(wrapper.find('#type_1').prop('value')).toEqual('test type_1');
  });

  it('type_2 should store it in its input field', () => {
    wrapper
      .find('#type_2')
      .simulate('change', { target: { value: 'test type_2' } });
    expect(wrapper.find('#type_2').prop('value')).toEqual('test type_2');
  });

  it('date_1 should store it in its input field', () => {
    wrapper
      .find('#date_1')
      .simulate('change', { target: { value: 'test date_1' } });
    expect(wrapper.find('#date_1').prop('value')).toEqual('test date_1');
  });

  it('date_2 should store it in its input field', () => {
    wrapper
      .find('#date_2')
      .simulate('change', { target: { value: 'test date_2' } });
    expect(wrapper.find('#date_2').prop('value')).toEqual('test date_2');
  });

  it('board should store it in its input field', () => {
    wrapper
      .find('#board')
      .simulate('change', { target: { value: 'test board' } });
    expect(wrapper.find('#board').prop('value')).toEqual('test board');
  });
});

describe('Clicking Submit will ', () => {
  let current;
  let store;
  let wrapper;

  beforeEach(() => {
    current = {
      id: 0,
      name: 'company1'
    };
    store = mockStore({
      startup: {
        startups: [],
        current: {
          id: 0,
          name: '',
          website: '',
          ownership: '',
          board: '',
          investment_1: '',
          investment_2: '',
          type_1: '',
          type_2: '',
          date_1: '',
          date_2: ''
        },
        loading: false,
        error: null
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <EditStartupModal current={current} updateStartup={updateStartup} />
      </Provider>
    );
    // Runs before each test in the suite
    store.clearActions();
  });

  it('set all the values to "" in the modal', () => {
    wrapper
      .find('#name')
      .simulate('change', { target: { value: 'test name' } });

    wrapper
      .find('#website')
      .simulate('change', { target: { value: 'test website' } });

    wrapper
      .find('#ownership')
      .simulate('change', { target: { value: 'test ownership' } });

    wrapper
      .find('#investment_1')
      .simulate('change', { target: { value: 'test investment_1' } });

    wrapper
      .find('#investment_2')
      .simulate('change', { target: { value: 'test investment_2' } });

    wrapper
      .find('#type_1')
      .simulate('change', { target: { value: 'test type_1' } });

    wrapper
      .find('#type_2')
      .simulate('change', { target: { value: 'test type_2' } });

    wrapper
      .find('#date_1')
      .simulate('change', { target: { value: 'test date_1' } });

    wrapper
      .find('#date_2')
      .simulate('change', { target: { value: 'test date_2' } });

    wrapper
      .find('#board')
      .simulate('change', { target: { value: 'test board' } });

    wrapper.find('a').simulate('click');
    expect(wrapper.find('#board').prop('value')).toEqual('');
  });
});
