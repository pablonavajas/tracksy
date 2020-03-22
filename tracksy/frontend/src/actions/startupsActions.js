import {
  GET_ERRORS,
  GET_STARTUPS,
  UPDATE_STARTUP,
  SET_LOADING,
  STARTUPS_ERROR,
  ADD_STARTUP,
  DELETE_STARTUP,
  SET_CURRENT,
  CLEAR_CURRENT,
  CREATE_MESSAGE
} from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";

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
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Add New Startup
export const addStartup = startup => async dispatch => {
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    setLoading();
    const res = await axios.post("/api/startups/", startup, config);

    dispatch(createMessage({ startupAdded: "Startup has been added" }));

    dispatch({
      type: ADD_STARTUP,
      payload: res.data
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
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

    dispatch(
      createMessage({ startupUpdated: "Startup information has been updated" })
    );
    dispatch({
      type: UPDATE_STARTUP,
      payload: res.data
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Delete Startup
export const deleteStartup = id => async dispatch => {
  try {
    setLoading();

    await axios.delete(`/api/startups/${id}/`);

    dispatch(createMessage({ startupDeleted: "Startup has been deleted" }));
    dispatch({
      type: DELETE_STARTUP,
      payload: id
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
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
