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
import { createMessage } from "./messageActions";

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
      type: GET_ERRORS,
      payload: err.response.data
    });
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
    console.log(err.response.data);
    const errors = {
      msg: err.response.data,
      status: err.response.status
    };
    dispatch({
      type: GET_ERRORS,
      payload: errors
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

    dispatch(
      createMessage({ startupUpdated: "Startup information has been updated" })
    );
    dispatch({
      type: UPDATE_STARTUP,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
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
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
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
