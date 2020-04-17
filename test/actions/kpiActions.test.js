import * as types from "../../tracksy/frontend/src/actions/types";
import * as actions from "../../tracksy/frontend/src/actions/kpiActions";

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
  let token, store, error, startup, kpiNames;
  beforeEach(() => {
    token = "123456";
    store = mockStore({ auth: { token } });

    // Runs before each test in the suite
    startup = { id: 0, name: "Company1" };
    kpiNames = [{ name: "A" }, { name: "B" }];
    error = "ServerErrorReply";
    store.clearActions();
  });

  it("addKpiNames() should dispatch the correct action type and payload to the store", () => {
    mock.onPost(`/api/kpiNames/${startup.id}/`).reply(200, {
      added: kpiNames,
      errors: error,
    });

    store.dispatch(actions.addKpiNames(startup.id, kpiNames)).then(() => {
      let expectedActions = [
        {
          type: types.CREATE_MESSAGE,
          payload: { succ: "KPI names have been added/edited successfully" },
        },
        {
          type: types.GET_ERRORS,
          payload: { msg: error, status: null },
        },
        {
          type: types.ADD_KPI_NAMES,
          payload: { kpiNames, startupId: startup.id },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("addKpiNames() should send error type and payload to the store when getting errors from API ", () => {
    mock.onPost(`/api/kpiNames/${startup.id}/`).reply(404, {
      error,
    });

    store.dispatch(actions.addKpiNames(startup.id, kpiNames)).then(() => {
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

  it("deleteKpiName() should dispatch the correct action type and payload to the store", () => {
    mock.onDelete(`/api/kpiNames/${startup.id}/${kpiNames[0].id}/`).reply(200);

    store
      .dispatch(actions.deleteKpiName(startup.id, kpiNames[0].id))
      .then(() => {
        let expectedActions = [
          {
            type: types.CREATE_MESSAGE,
            payload: { succ: "KPI name deleted successfully" },
          },
          {
            type: types.DELETE_KPI_NAME,
            payload: { kpiNameId: kpiNames[0].id, startupId: startup.id },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("deleteKpiName() should send error type and payload to the store when getting errors from API ", () => {
    mock.onDelete(`/api/kpiNames/${startup.id}/${kpiNames[0].id}/`).reply(404, {
      error,
    });

    store
      .dispatch(actions.deleteKpiName(startup.id, kpiNames[0].id))
      .then(() => {
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
