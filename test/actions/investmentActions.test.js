import * as types from "../../tracksy/frontend/src/actions/types";
import * as actions from "../../tracksy/frontend/src/actions/investmentsActions";

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
  let token, store, error, startup, investments;
  beforeEach(() => {
    token = "123456";
    store = mockStore({ auth: { token } });

    // Runs before each test in the suite
    startup = { id: 0, name: "Company1" };
    investments = [
      { id: 0, investmentType: "A", value: 10 },
      { id: 1, investmentType: "A", value: 10 },
    ];
    error = "ServerErrorReply";
    store.clearActions();
  });

  it("addInvestments() should dispatch the correct action type and payload to the store", () => {
    mock.onPost(`/api/investments/${startup.id}/`).reply(200, {
      added: investments,
      errors: error,
    });

    store.dispatch(actions.addInvestments(startup.id, investments)).then(() => {
      let expectedActions = [
        {
          type: types.CREATE_MESSAGE,
          payload: { succ: "Investments added/edited successfully" },
        },
        {
          type: types.GET_ERRORS,
          payload: { msg: error, status: null },
        },
        {
          type: types.ADD_INVESTMENTS,
          payload: { investments, startupId: startup.id },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("addInvestments() should send error type and payload to the store when getting errors from API ", () => {
    mock.onPost(`/api/investments/${startup.id}/`).reply(404, {
      error,
    });

    store.dispatch(actions.addInvestments(startup.id, investments)).then(() => {
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

  it("deleteInvestment() should dispatch the correct action type and payload to the store", () => {
    mock
      .onDelete(`/api/investments/${startup.id}/${investments[0].id}/`)
      .reply(200);

    store
      .dispatch(actions.deleteInvestment(startup.id, investments[0].id))
      .then(() => {
        let expectedActions = [
          {
            type: types.CREATE_MESSAGE,
            payload: { succ: "Investment deleted successfully" },
          },
          {
            type: types.DELETE_INVESTMENT,
            payload: { investmentId: investments[0].id, startupId: startup.id },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("deleteInvestments() should send error type and payload to the store when getting errors from API ", () => {
    mock
      .onDelete(`/api/investments/${startup.id}/${investments[0].id}/`)
      .reply(404, {
        error,
      });

    store
      .dispatch(actions.deleteInvestment(startup.id, investments[0].id))
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
