import {
  GET_CONNECTIONS,
} from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";

//Getting All Startups
export const getConnections = () => async (dispatch, getState) => {
  try {

    const res = await axios.get("/api/connections", tokenConfig(getState));
    
    console.log("GET CONNECTIONS CONSOLE LOG")
    console.log(res)


    dispatch({
      type: GET_CONNECTIONS,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERRORS IN CONNECTIONS ACTIONS")
    console.log(err)
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};