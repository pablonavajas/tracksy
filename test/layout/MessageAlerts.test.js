import React from "react";
import { shallow, mount } from "enzyme";
import { MessageAlerts } from "../../tracksy/frontend/src/components/layout/MessageAlerts";
import ConnectedMessageAlerts from "../../tracksy/frontend/src/components/layout/MessageAlerts";
import toJson from "enzyme-to-json";
import "../setupTests";

//store needed for testing mapStateToProps
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

describe("MessageAlerts", () => {
  let wrapper, alert;
  class Alert {
    error = jest.fn();
    success = jest.fn();
  }

  beforeEach(() => {
    alert = new Alert();
  });

  it("renders correctly", () => {
    const message = {};
    wrapper = shallow(<MessageAlerts message={message} alert={alert} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("if the message is a success message, correct alert pops up", () => {
    const message = {
      succ: "succ test message",
    };

    wrapper = mount(<MessageAlerts message={message} alert={alert} />);
    expect(alert.success).toHaveBeenCalledWith(message.succ);
  });

  it("if the message is a fail message, error alert pops up", () => {
    const message = {
      fail: "fail test message",
    };

    wrapper = mount(<MessageAlerts message={message} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(message.fail);
  });

  it("if the message is empty no alert pops up", () => {
    const message = {};
    wrapper = mount(<MessageAlerts message={message} alert={alert} />);
    expect(alert.error).not.toHaveBeenCalled();
    expect(alert.success).not.toHaveBeenCalled();
  });
});

// Testing MapStateToProps
describe("MessageAlerts ", () => {
  let message, store, wrapper;

  beforeAll(() => {
    message = { succ: "succ test message" };
    store = mockStore({ messages: message });
    wrapper = shallow(<ConnectedMessageAlerts store={store} />);
  });

  it("should show the message value imported from store", () => {
    expect(wrapper.props().children.props.message).toEqual(message);
  });
});
