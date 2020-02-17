import reducer from './startupsReducer';
import * as types from '../actions/types';

const initialState = {
  startups: [],
  current: null,
  loading: false,
  error: null
};

const two_startups = [
  { id: 0, name: 'Company1' },
  { id: 1, name: 'Company2' }
];

const stateWithTwoElements = {
  ...initialState,
  startups: two_startups
};

describe('Startup reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      startups: null,
      current: null,
      loading: false,
      error: null
    });
  });

  it('should handle ADD_STARTUP', () => {
    expect(
      reducer(stateWithTwoElements, {
        type: types.ADD_STARTUP,
        payload: {
          id: 2,
          name: 'Company3'
        }
      })
    ).toEqual({
      ...stateWithTwoElements,
      startups: [
        ...stateWithTwoElements.startups,
        {
          id: 2,
          name: 'Company3'
        }
      ]
    });
  });

  it('should handle GET_STARTUPS', () => {
    const red = reducer(initialState, {
      type: types.GET_STARTUPS,
      payload: two_startups
    });

    expect(red).toEqual(stateWithTwoElements);
  });

  it('should handle UPDATE_STARTUPS', () => {
    const red = reducer(stateWithTwoElements, {
      type: types.UPDATE_STARTUP,
      payload: {
        id: 0,
        name: 'UpdatedCompany1'
      }
    });

    expect(red).toEqual({
      ...stateWithTwoElements,
      startups: [
        {
          id: 0,
          name: 'UpdatedCompany1'
        },
        {
          id: 1,
          name: 'Company2'
        }
      ]
    });
  });
});
