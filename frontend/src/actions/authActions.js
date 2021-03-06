import axios from "axios";

import { returnErrors } from "./messageActions";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./types";

// CHECK TOKEN AND LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  try {
    // User Loading
    dispatch({ type: USER_LOADING });

    const res = await axios.get("/api/auth/user", tokenConfig(getState));

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// LOGIN USER
export const login = (username, password) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({
    username: username,
    password: password,
  });

  try {
    const res = await axios.post("/api/auth/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// LOGOUT USER
export const logout = () => async (dispatch, getState) => {
  try {
    await axios.post("/api/auth/logout", null, tokenConfig(getState));
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// REGISTER USER
export const register = ({ username, email, password }) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({
    username: username,
    email: email,
    password: password,
    // only VC Funds can register
    // startups will be sent login details via email
    isStartup: false,
  });

  try {
    const res = await axios.post("/api/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state (comes from local storage)
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config (like postman)
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
