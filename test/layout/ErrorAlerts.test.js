import React from "react";
import { shallow, mount } from "enzyme";
import { ErrorAlerts } from "../../tracksy/frontend/src/components/layout/ErrorAlerts";
import ConnectedErrorAlerts from "../../tracksy/frontend/src/components/layout/ErrorAlerts";
import toJson from "enzyme-to-json";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

import "../setupTests";

describe("ErrorAlerts", () => {
  let wrapper, alert;
  class Alert {
    error = jest.fn();
  }

  beforeEach(() => {
    alert = new Alert();
  });

  it("renders correctly", () => {
    const error = {};
    wrapper = shallow(<ErrorAlerts error={error} alert={alert} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("if the error is related to the name", () => {
    const errorName = "error with the name";
    const error = {
      msg: {
        name: [errorName],
      },
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(`Name: ${errorName}`);
  });

  it("if the error is related to the ownership", () => {
    const errorName = "error with the ownership";
    const error = {
      msg: {
        ownership: [errorName],
      },
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(`Ownership: ${errorName}`);
  });

  it("if the error is related to the website url", () => {
    const errorName = "error with the website url";
    const error = {
      msg: {
        website: [errorName],
      },
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(`Website: ${errorName}`);
  });

  it("if the error is related to the startup email", () => {
    const errorName = "error with the startup email";
    const error = {
      msg: {
        startupEmail: [errorName],
      },
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(`Startup Email: ${errorName}`);
  });

  it("if the error is related to the revenue", () => {
    const errorName = "error with the revenue";
    const error = {
      msg: {
        revenue: [errorName],
      },
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(`Revenue: ${errorName}`);
  });

  it("if the error is related to the cash balance", () => {
    const errorName = "error with the cash balance";
    const error = {
      msg: {
        cashBalance: [errorName],
      },
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(`Cash Balance: ${errorName}`);
  });

  it("if the error is related to monthly burn", () => {
    const errorName = "error with the monthly burn";
    const error = {
      msg: {
        monthlyBurn: [errorName],
      },
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(`Monthly Burn: ${errorName}`);
  });

  it("if the error is related non_field_errors (e.g. wrong login details)", () => {
    const errorName = "error with non_field_errors";
    const error = {
      msg: {
        non_field_errors: [errorName],
      },
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(errorName);
  });

  it("if the error is related username ", () => {
    const errorName = "error with username";
    const error = {
      msg: {
        username: [errorName],
      },
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(errorName);
  });

  it("if the error is related date ", () => {
    const errorName = "error with date";
    const error = {
      msg: [{ date: errorName }],
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(errorName);
  });

  it("if the error is related to other server errors ", () => {
    const errorName = "other error";
    const error = {
      msg: [errorName],
    };

    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).toHaveBeenCalledWith(errorName);
  });

  it("if there is no error alert doesn't get called", () => {
    const error = { msg: {}, status: null };
    wrapper = mount(<ErrorAlerts error={error} alert={alert} />);
    expect(alert.error).not.toHaveBeenCalled();
  });
});

// Testing MapStateToProps
describe("ErrorAlerts ", () => {
  let error, store, wrapper;

  beforeAll(() => {
    error = { msg: { name: "invalid value" }, status: 400 };
    store = mockStore({ errors: error });
    wrapper = shallow(<ConnectedErrorAlerts store={store} />);
  });

  it("should show the error value imported from store", () => {
    expect(wrapper.props().children.props.error).toEqual(error);
  });
});
