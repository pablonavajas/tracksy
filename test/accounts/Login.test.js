import React from "react";
import { shallow, mount } from "enzyme";
import { Login } from "../../tracksy/frontend/src/components/accounts/Login";
import ConnectedLogin from "../../tracksy/frontend/src/components/accounts/Login";
import toJson from "enzyme-to-json";
import "../setupTests";
import { HashRouter as Router } from "react-router-dom";

//store needed for testing mapStateToProps
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

//only VC Funds can register
describe("Register", () => {
  let isAuthenticated, wrapper, login, createMessage, preventDefault;

  beforeEach(() => {
    preventDefault = jest.fn();
    login = jest.fn();
    createMessage = jest.fn();
  });

  const mockEvent = {
    target: {
      name: "description",
      value: "test",
    },
  };

  it("redirects to home page if isAuthenticated is true ", () => {
    isAuthenticated = true;
    wrapper = shallow(
      <Login isAuthenticated={isAuthenticated} login={login} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("shows the login form ", () => {
    isAuthenticated = false;
    wrapper = shallow(
      <Login isAuthenticated={isAuthenticated} login={login} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("calls login function with correct params", () => {
    wrapper = mount(
      <Router>
        <Login isAuthenticated={isAuthenticated} login={login} />
      </Router>
    );

    wrapper.find("#username").at(1).simulate("change", mockEvent);
    wrapper.find("#password").at(1).simulate("change", mockEvent);
    wrapper.find("form").simulate("submit", { preventDefault });
    expect(login).toHaveBeenCalledWith("test", "test");
  });
});

// Testing MapStateToProps
describe("Loging ", () => {
  let store, wrapper;
  const login = jest.fn();

  beforeAll(() => {
    store = mockStore({ auth: { isAuthenticated: false } });
    wrapper = shallow(<ConnectedLogin store={store} login={login} />);
  });

  it("should show the error value imported from store", () => {
    expect(wrapper.props().children.props.isAuthenticated).toBe(false);
  });
});
