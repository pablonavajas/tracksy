import reducer from "../../tracksy/frontend/src/reducers/messagesReducer";
import * as types from "../../tracksy/frontend/src/actions/types";

const initialState = {};

describe("Message reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle CREATE_MESSAGE", () => {
    const res = reducer(initialState, {
      type: types.CREATE_MESSAGE,
      payload: { succ: "Something Updated Correctly" },
    });

    expect(res).toEqual({ succ: "Something Updated Correctly" });
  });
});
