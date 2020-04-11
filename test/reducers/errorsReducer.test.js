import reducer from "../../tracksy/frontend/src/reducers/errorsReducer";
import * as types from "../../tracksy/frontend/src/actions/types";

const initialState = {
  msg: {},
  status: null,
};

describe("Errors reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_ERRORS", () => {
    const res = reducer(initialState, {
      type: types.GET_ERRORS,
      payload: { msg: "Page Not Found", status: 404 },
    });

    expect(res).toEqual({ msg: "Page Not Found", status: 404 });
  });
});
