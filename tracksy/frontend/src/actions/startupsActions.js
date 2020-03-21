import {
  GET_STARTUPS,
  UPDATE_STARTUP,
  SET_LOADING,
  STARTUPS_ERROR,
  ADD_STARTUP,
  DELETE_STARTUP,
  SET_CURRENT,
  CLEAR_CURRENT
} from "./types";
import axios from "axios";

//returns an async fucntion which fetches dispatches at the same time

//Getting All Startups
export const getStartups = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get("/api/startups");

    dispatch({
      type: GET_STARTUPS,
      payload: res.data
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
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    setLoading();
    const res = await axios.post("/api/startups/", startup, config);

    dispatch({
      type: ADD_STARTUP,
      payload: res.data
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

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `/api/startups/${startup.id}/`,
      startup,
      config
    );
    dispatch({
      type: UPDATE_STARTUP,
      payload: res.data
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

    await axios.delete(`/api/startups/${id}/`);

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
