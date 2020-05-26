import { GET_CONNECTIONS } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";

//Getting All Startups
export const getConnections = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/connections", tokenConfig(getState));
    dispatch({
      type: GET_CONNECTIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
