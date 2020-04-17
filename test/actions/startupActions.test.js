import * as types from "../../tracksy/frontend/src/actions/types";
import * as actions from "../../tracksy/frontend/src/actions/startupsActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//creating a mock instance from the MockAdapter of axios
const mock = new MockAdapter(axios);

// TESTING GETTING STARTUPS FROM DATABASE ACTION
describe("In startup actions", () => {
  let token, store, error, startup, startups;
  beforeEach(() => {
    token = "123456";
    store = mockStore({ auth: { token } });

    // Runs before each test in the suite
    startup = [{ id: 0, name: "Company1" }];
    error = "ServerErrorReply";
    store.clearActions();
  });

  it("getStartups() should dispatch the correct action type and payload to the store", () => {
    mock.onGet("/api/startups/").reply(200, {
      data: [
        { id: 0, name: "Company1" },
        { id: 1, name: "Company2" },
      ],
    });

    store.dispatch(actions.getStartups()).then(() => {
      let expectedActions = [
        {
          type: types.GET_STARTUPS,
          payload: {
            data: [
              { id: 0, name: "Company1" },
              { id: 1, name: "Company2" },
            ],
          },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("getStartups() should send error type and payload to the store when getting errors from API ", () => {
    mock.onGet("/api/startups/").reply(404, {
      error,
    });

    store.dispatch(actions.getStartups()).then(() => {
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

  it("addStartup() should dispatch correct payload and action type", () => {
    mock.onPost("/api/startups/").reply(200, {
      data: startup,
    });

    store.dispatch(actions.addStartup()).then(() => {
      let expectedActions = [
        {
          type: types.CREATE_MESSAGE,
          payload: { succ: "Startup has been added" },
        },
        {
          type: types.SET_CURRENT,
          payload: { data: startup },
        },
        {
          type: types.ADD_STARTUP,
          payload: { data: startup },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("addStartup() should send error type and payload to the store when getting errors from API ", () => {
    mock.onPost("/api/startups/").reply(404, {
      error,
    });

    store.dispatch(actions.addStartup()).then(() => {
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

  it("updateStartup() should dispatch correct payload and action type", () => {
    mock.onPut("/api/startups/0/").reply(200, {
      data: startup,
    });

    store.dispatch(actions.updateStartup(startup[0])).then(() => {
      let expectedActions = [
        {
          type: types.CREATE_MESSAGE,
          payload: { succ: "Startup information has been updated" },
        },
        {
          type: types.UPDATE_STARTUP,
          payload: { data: startup },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("updateStartup() should send error type and payload to the store when getting errors from API ", () => {
    mock.onPut("/api/startups/0/").reply(404, {
      error,
    });

    store.dispatch(actions.updateStartup(startup[0])).then(() => {
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

  it("deleteStartup() should dispatch correct payload and action type", () => {
    mock.onDelete("/api/startups/0/").reply(200);

    store.dispatch(actions.deleteStartup(startup[0].id)).then(() => {
      let expectedActions = [
        {
          type: types.CREATE_MESSAGE,
          payload: { succ: "Startup has been deleted" },
        },
        {
          type: types.DELETE_STARTUP,
          payload: startup[0].id,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("deleteStartup() should send error type and payload to the store when getting errors from API ", () => {
    mock.onDelete("/api/startups/0/").reply(404, {
      error,
    });

    store.dispatch(actions.deleteStartup(startup[0].id)).then(() => {
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

  it("setCurrent() should return type SET_CURRENT type", () => {
    const res = actions.setCurrent();
    expect(res).toEqual({ type: types.SET_CURRENT });
  });
});