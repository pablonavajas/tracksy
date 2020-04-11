import reducer from "../../tracksy/frontend/src/reducers/authReducer";
import * as types from "../../tracksy/frontend/src/actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  username: "",
  email: "",
  isStartup: null,
};

const user = {
  username: "user1",
  email: "user1@user1.com",
  isStartup: false,
};

describe("Auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle USER_LOADING", () => {
    const res = reducer(initialState, {
      type: types.USER_LOADING,
    });

    expect(res).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle USER_LOADED", () => {
    const res = reducer(initialState, {
      type: types.USER_LOADED,
      payload: user,
    });

    expect(res).toEqual({
      ...initialState,
      ...user,
      isAuthenticated: true,
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    const res = reducer(initialState, {
      type: types.LOGIN_SUCCESS,
      payload: { ...user, token: "123456" },
    });

    expect(res).toEqual({
      ...initialState,
      ...user,
      isAuthenticated: true,
      token: "123456",
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    const res = reducer(initialState, {
      type: types.LOGOUT_SUCCESS,
    });

    expect(res).toEqual({ ...initialState, isAuthenticated: false });
  });
});
