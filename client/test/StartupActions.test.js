import * as types from '../src/actions/types';
import * as actions from '../src/actions/startupsActions';
import regeneratorRuntime from 'regenerator-runtime';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//creating a mock instance from the MockAdapter of axios
const mock = new MockAdapter(axios);
const store = mockStore({});

// TESTING GETTING STARTUPS FROM DATABASE ACTION
describe('getStartups() action', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  it('should get get all teh startups', () => {
    mock.onGet('/startups').reply(200, {
      data: [
        { id: 0, name: 'Company1' },
        { id: 1, name: 'Company2' }
      ]
    });

    store.dispatch(actions.getStartups()).then(() => {
      let expectedActions = [
        {
          type: types.GET_STARTUPS,
          payload: {
            data: [
              { id: 0, name: 'Company1' },
              { id: 1, name: 'Company2' }
            ]
          }
        }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

// TESTING ADD STARTUPS ACTIONS
describe('addStartup() action', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  it('should add a startup', () => {
    mock.onPost('/startups').reply(200, {
      data: [{ id: 0, name: 'Company1' }]
    });

    store.dispatch(actions.addStartup()).then(() => {
      let expectedActions = [
        {
          type: types.ADD_STARTUP,
          payload: {
            data: [{ id: 0, name: 'Company1' }]
          }
        }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

// TESTING UPDATE STARTUP ACTIONS
describe('updateStartup() action', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  it('update a startup', () => {
    mock.onPut('/startups/0').reply(200, {
      data: [{ id: 0, name: 'Company1' }]
    });

    store
      .dispatch(actions.updateStartup({ id: 0, name: 'Company1' }))
      .then(() => {
        let expectedActions = [
          {
            type: types.UPDATE_STARTUP,
            payload: {
              data: [{ id: 0, name: 'Company1' }]
            }
          }
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

// TESTING DELETE STARTUP ACTION
describe('deleteStartup() action', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  it('deletes a startup', () => {
    mock.onDelete('/startups/0').reply(200);

    store.dispatch(actions.deleteStartup(0)).then(() => {
      let expectedActions = [
        {
          type: types.DELETE_STARTUP,
          payload: 0
        }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('setLoading()', () => {
  it('should return type SET_LOADING type', () => {
    const res = actions.setLoading();
    expect(res).toEqual({ type: types.SET_LOADING });
  });
});

describe('setCurrent()', () => {
  it('should return type SET_CURRENT type', () => {
    const res = actions.setCurrent();
    expect(res).toEqual({ type: types.SET_CURRENT });
  });
});

describe('clearCurrent()', () => {
  it('should return type CLEAR_CURRENT type', () => {
    const res = actions.clearCurrent();
    expect(res).toEqual({ type: types.CLEAR_CURRENT });
  });
});
