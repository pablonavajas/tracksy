import {
  GET_STARTUPS,
  UPDATE_STARTUP,
  SET_LOADING,
  STARTUPS_ERROR,
  ADD_STARTUP,
  DELETE_STARTUP,
  SET_CURRENT,
  CLEAR_CURRENT
} from './types';

//returns an async fucntion which fetches dispatches at the same time

//Getting All Startups
export const getStartups = () => async dispatch => {
  try {
    setLoading();

    const res = await fetch('/startups');
    const data = await res.json();

    dispatch({
      type: GET_STARTUPS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: STARTUPS_ERROR,
      payload: err.response.statusText
    });
  }
};

//Add New Startup
export const addStartup = startup => async dispatch => {
  try {
    setLoading();

    const res = await fetch('/startups', {
      method: 'POST',
      body: JSON.stringify(startup),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();

    dispatch({
      type: ADD_STARTUP,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: STARTUPS_ERROR,
      payload: err.response.statusText
    });
  }
};

//Update Startup
export const updateStartup = startup => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`/startups/${startup.id}`, {
      method: 'PUT',
      body: JSON.stringify(startup),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    console.log(data);
    dispatch({
      type: UPDATE_STARTUP,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: STARTUPS_ERROR,
      payload: err.response.statusText
    });
  }
};

//Delete Startup
export const deleteStartup = id => async dispatch => {
  try {
    setLoading();

    await fetch(`/startups/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_STARTUP,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: STARTUPS_ERROR,
      payload: err.response.statusText
    });
  }
};

//Set current startup
export const setCurrent = startup => {
  return {
    type: SET_CURRENT,
    payload: startup
  };
};

//Clear current startup
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
