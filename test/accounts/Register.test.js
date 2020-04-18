import React from "react";
import { shallow, mount } from "enzyme";
import { Register } from "../../tracksy/frontend/src/components/accounts/Register";
import ConnectedRegister from "../../tracksy/frontend/src/components/accounts/Register";
import toJson from "enzyme-to-json";
import "../setupTests";
import { HashRouter as Router } from "react-router-dom";

//store needed for testing mapStateToProps
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

//only VC Funds can register
describe("Register", () => {
  let isAuthenticated, wrapper, register, createMessage, preventDefault;

  beforeEach(() => {
    preventDefault = jest.fn();
    register = jest.fn();
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
      <Register isAuthenticated={isAuthenticated} register={register} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("shows the reigstration form ", () => {
    isAuthenticated = false;
    wrapper = shallow(
      <Register isAuthenticated={isAuthenticated} register={register} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("calls register function", () => {
    wrapper = mount(
      <Router>
        <Register isAuthenticated={isAuthenticated} register={register} />
      </Router>
    );

    wrapper.find("#username").at(1).simulate("change", mockEvent);
    wrapper.find("#email").at(1).simulate("change", mockEvent);
    wrapper.find("#password").at(1).simulate("change", mockEvent);
    wrapper.find("#password2").at(1).simulate("change", mockEvent);
    wrapper.find("form").simulate("submit", { preventDefault });
    expect(register).toHaveBeenCalledWith({
      username: "test",
      email: "test",
      password: "test",
    });
  });

  it("creates warning message that passwords don't match", () => {
    const preventDefault = jest.fn();
    wrapper = mount(
      <Router>
        <Register
          isAuthenticated={isAuthenticated}
          register={register}
          createMessage={createMessage}
        />
      </Router>
    );

    wrapper.find("#username").at(1).simulate("change", mockEvent);
    wrapper.find("#email").at(1).simulate("change", mockEvent);
    wrapper.find("#password").at(1).simulate("change", mockEvent);
    wrapper
      .find("#password2")
      .at(1)
      .simulate("change", { target: { name: "description", value: "test1" } });
    wrapper.find("form").simulate("submit", { preventDefault });
    expect(register).not.toHaveBeenCalled();
    expect(createMessage).toHaveBeenCalledWith({
      fail: "Passwords do not match",
    });
  });
});

// Testing MapStateToProps
describe("Register ", () => {
  let store, wrapper;
  const register = jest.fn();
  const createMessage = jest.fn();

  beforeAll(() => {
    store = mockStore({ auth: { isAuthenticated: false } });
    wrapper = shallow(
      <ConnectedRegister
        store={store}
        register={register}
        createMessage={createMessage}
      />
    );
  });

  it("should show the error value imported from store", () => {
    expect(wrapper.props().children.props.isAuthenticated).toBe(false);
  });
});
