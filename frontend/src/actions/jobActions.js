import {
  SET_LATEST_JOB_RETRIEVED_FROM_ANGEL_LIST,
  SET_CURRENTLY_SELECTED_JOB,
  ADD_JOB,
  DELETE_JOB,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors, createMessage } from "./messageActions";
import axios from "axios";

//Add Job
export const addJob = (startupId, job) => async (dispatch, getState) => {
  try {
    // setLoading();
    const res = await axios.post(
      `/api/job/${startupId}/`,
      job,
      tokenConfig(getState)
    );

    dispatch(createMessage({ succ: "Job added successfully" }));
    dispatch({ type: ADD_JOB, payload: { job: res.data, startupId } });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// Delete Job
export const deleteJob = (startupId, jobId) => async (dispatch, getState) => {
  try {
    await axios.delete(
      `/api/job/${startupId}/${jobId}/`,
      tokenConfig(getState)
    );

    dispatch(createMessage({ succ: "Job deleted successfully" }));
    dispatch({
      type: DELETE_JOB,
      payload: { jobId, startupId },
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// Get Job Description
export const getJobDescription = (url) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `/api/jobDescription/`,
      url,
      tokenConfig(getState)
    );

    dispatch(createMessage({ succ: "Job info retrieved successfully" }));
    dispatch({
      type: SET_LATEST_JOB_RETRIEVED_FROM_ANGEL_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Set current job
export const setCurrentJob = (job) => {
  return {
    type: SET_CURRENTLY_SELECTED_JOB,
    payload: job,
  };
};
