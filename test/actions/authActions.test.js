import * as types from "../../tracksy/frontend/src/actions/types";
import * as actions from "../../tracksy/frontend/src/actions/authActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//creating a mock instance from the MockAdapter of axios
const mock = new MockAdapter(axios);

// TESTING GETTING STARTUPS FROM DATABASE ACTION
describe("In auth actions", () => {
  let token, store, error, user;
  beforeEach(() => {
    token = "123456";
    store = mockStore({ auth: { token } });
    user = { id: 0, username: "a" };
    error = "ServerErrorReply";
    store.clearActions();
  });

  it("loadUser() should dispatch the correct action type and payload to the store", () => {
    mock.onGet(`/api/auth/user`).reply(200, user);

    store.dispatch(actions.loadUser()).then(() => {
      let expectedActions = [
        {
          type: types.USER_LOADING,
        },
        {
          type: types.USER_LOADED,
          payload: user,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("loadUser() should send error type and payload to the store when getting errors from API ", () => {
    mock.onGet(`/api/auth/user`).reply(404, { error });

    store.dispatch(actions.loadUser()).then(() => {
      let expectedActions = [
        {
          type: types.USER_LOADING,
        },
        {
          type: types.GET_ERRORS,
          payload: {
            msg: { error },
            status: 404,
          },
        },
        {
          type: types.AUTH_ERROR,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("login() should dispatch the correct action type and payload to the store", () => {
    mock.onPost(`/api/auth/login`).reply(200, user);

    store.dispatch(actions.login()).then(() => {
      let expectedActions = [
        {
          type: types.LOGIN_SUCCESS,
          payload: user,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("login() should send error type and payload to the store when getting errors from API ", () => {
    mock.onPost(`/api/auth/login`).reply(404, { error });

    store.dispatch(actions.login()).then(() => {
      let expectedActions = [
        {
          type: types.GET_ERRORS,
          payload: {
            msg: { error },
            status: 404,
          },
        },
        {
          type: types.LOGIN_FAIL,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("logout() should dispatch the correct action type and payload to the store", () => {
    mock.onPost(`/api/auth/logout`).reply(200);

    store.dispatch(actions.logout()).then(() => {
      let expectedActions = [
        {
          type: types.LOGOUT_SUCCESS,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("logout() should send error type and payload to the store when getting errors from API ", () => {
    mock.onPost(`/api/auth/logout`).reply(404, { error });

    store.dispatch(actions.logout()).then(() => {
      let expectedActions = [
        {
          type: types.GET_ERRORS,
          payload: {
            msg: { error },
            status: 404,
          },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("register() should dispatch the correct action type and payload to the store", () => {
    mock.onPost(`/api/auth/register`).reply(200, user);

    store
      .dispatch(
        actions.register({
          username: "a",
          email: "a@a.com",
          password: "123456",
        })
      )
      .then(() => {
        let expectedActions = [
          {
            type: types.REGISTER_SUCCESS,
            payload: user,
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("register() should send error type and payload to the store when getting errors from API ", () => {
    mock.onPost(`/api/auth/register`).reply(404, { error });

    store
      .dispatch(
        actions.register({
          username: "a",
          email: "a@a.com",
          password: "123456",
        })
      )
      .then(() => {
        let expectedActions = [
          {
            type: types.GET_ERRORS,
            payload: {
              msg: { error },
              status: 404,
            },
          },
          {
            type: types.REGISTER_FAIL,
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
