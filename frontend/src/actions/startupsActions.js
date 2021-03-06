import {
  GET_STARTUPS,
  UPDATE_STARTUP,
  SET_LOADING,
  ADD_STARTUP,
  DELETE_STARTUP,
  SET_CURRENT,
} from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";

//returns an async fucntion which fetches dispatches at the same time

//Getting All Startups
export const getStartups = () => async (dispatch, getState) => {
  try {
    setLoading();

    const res = await axios.get("/api/startups/", tokenConfig(getState));

    dispatch({
      type: GET_STARTUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Add New Startup
export const addStartup = (startup) => async (dispatch, getState) => {
  try {
    setLoading();
    const res = await axios.post(
      "/api/startups/",
      startup,
      tokenConfig(getState)
    );
    dispatch(createMessage({ succ: "Startup has been added" }));
    dispatch({ type: SET_CURRENT, payload: res.data });
    dispatch({ type: ADD_STARTUP, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Update Startup
export const updateStartup = (startup) => async (dispatch, getState) => {
  try {
    setLoading();

    const res = await axios.put(
      `/api/startups/${startup.id}/`,
      startup,
      tokenConfig(getState)
    );

    dispatch(createMessage({ succ: "Startup information has been updated" }));
    dispatch({
      type: UPDATE_STARTUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Delete Startup
export const deleteStartup = (id) => async (dispatch, getState) => {
  try {
    setLoading();

    await axios.delete(`/api/startups/${id}/`, tokenConfig(getState));

    dispatch(createMessage({ succ: "Startup has been deleted" }));
    dispatch({
      type: DELETE_STARTUP,
      payload: id,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Set current startup
export const setCurrent = (startup) => {
  return {
    type: SET_CURRENT,
    payload: startup,
  };
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
