import * as types from "../../tracksy/frontend/src/actions/types";
import * as actions from "../../tracksy/frontend/src/actions/connectionsActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//creating a mock instance from the MockAdapter of axios
const mock = new MockAdapter(axios);

// TESTING GETTING STARTUPS FROM DATABASE ACTION
describe("In connections actions", () => {
  let token, store, error, connections;
  beforeEach(() => {
    token = "123456";
    store = mockStore({ auth: { token } });
    connections = [
      { id: 0, name: "A" },
      { id: 1, name: "B" },
    ];
    error = "ServerErrorReply";
    store.clearActions();
  });

  it("getConnections() should dispatch the correct action type and payload to the store", () => {
    mock.onGet(`/api/connections`).reply(200, connections);

    store.dispatch(actions.getConnections()).then(() => {
      let expectedActions = [
        {
          type: types.GET_CONNECTIONS,
          payload: connections,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("addInvestments() should send error type and payload to the store when getting errors from API ", () => {
    mock.onGet(`/api/connections`).reply(404, { error });

    store.dispatch(actions.getConnections()).then(() => {
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
});
