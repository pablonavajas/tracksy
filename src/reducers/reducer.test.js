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
    const red = reducer(stateWithTwoElements, {
      type: types.ADD_STARTUP,
      payload: {
        id: 2,
        name: 'Company3'
      }
    });
    expect(red).toEqual({
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

  it('should handle DELETE_STARTUP', () => {
    const red = reducer(stateWithTwoElements, {
      type: types.DELETE_STARTUP,
      payload: 0
    });

    expect(red).toEqual({
      ...stateWithTwoElements,
      startups: [{ id: 1, name: 'Company2' }]
    });
  });

  it('should handle SET_CURRENT', () => {
    const red = reducer(stateWithTwoElements, {
      type: types.SET_CURRENT,
      payload: {
        id: 0,
        name: 'Company1'
      }
    });

    expect(red).toEqual({
      ...stateWithTwoElements,
      current: { id: 0, name: 'Company1' }
    });
  });

  it('should handle CLEAR_CURRENT', () => {
    const red = reducer(
      { ...stateWithTwoElements, current: { id: 0, name: 'Company1' } },
      {
        type: types.CLEAR_CURRENT,
        payload: {
          id: 0,
          name: 'Company1'
        }
      }
    );

    expect(red).toEqual(stateWithTwoElements);
  });

  it('should handle SET_LOADING', () => {
    const red = reducer(stateWithTwoElements, {
      type: types.SET_LOADING
    });

    expect(red).toEqual({
      ...stateWithTwoElements,
      loading: true
    });
  });

  it('should handle STARTUPS_ERROR', () => {
    const red = reducer(stateWithTwoElements, {
      type: types.STARTUPS_ERROR,
      payload: 'some error'
    });

    expect(red).toEqual({
      ...stateWithTwoElements,
      error: 'some error'
    });
  });
});
