import { configure, mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import regeneratorRuntime from "regenerator-runtime";

import Adapter from "enzyme-adapter-react-16";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { addStartup } from "../tracksy/frontend/src/actions/startupsActions";
import AddStartupModal from "../tracksy/frontend/src/components/startups/AddStartupModal";

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

describe("onChange for ", () => {
  let startup;
  let store;
  let wrapper;

  beforeEach(() => {
    startup = { id: 0, name: "company1" };
    store = mockStore({});
    wrapper = mount(
      <Provider store={store}>
        <AddStartupModal addStartup={addStartup} />
      </Provider>
    );
    // Runs before each test in the suite
    store.clearActions();
  });

  it("name should store it in its input field", () => {
    //console.log(wrapper.find('#name').debug());
    wrapper
      .find("#name_add")
      .simulate("change", { target: { value: "test name" } });
    expect(wrapper.find("#name_add").prop("value")).toEqual("test name");
  });

  it("website should store it in its input field", () => {
    wrapper
      .find("#website_add")
      .simulate("change", { target: { value: "test website" } });
    expect(wrapper.find("#website_add").prop("value")).toEqual("test website");
  });

  it("ownership should store it in its input field", () => {
    wrapper
      .find("#ownership_add")
      .simulate("change", { target: { value: "test ownership" } });
    expect(wrapper.find("#ownership_add").prop("value")).toEqual(
      "test ownership"
    );
  });

  it("investment_1 should store it in its input field", () => {
    wrapper
      .find("#investment_1_add")
      .simulate("change", { target: { value: "test investment_1" } });
    expect(wrapper.find("#investment_1").prop("value")).toEqual(
      "test investment_1"
    );
  });

  it("investment_2 should store it in its input field", () => {
    wrapper
      .find("#investment_2_add")
      .simulate("change", { target: { value: "test investment_2" } });
    expect(wrapper.find("#investment_2_add").prop("value")).toEqual(
      "test investment_2"
    );
  });

  it("type_1 should store it in its input field", () => {
    wrapper
      .find("#type_1_add")
      .simulate("change", { target: { value: "test type_1" } });
    expect(wrapper.find("#type_1_add").prop("value")).toEqual("test type_1");
  });

  it("type_2 should store it in its input field", () => {
    wrapper
      .find("#type_2_add")
      .simulate("change", { target: { value: "test type_2" } });
    expect(wrapper.find("#type_2_add").prop("value")).toEqual("test type_2");
  });

  it("date_1 should store it in its input field", () => {
    wrapper
      .find("#date_1_add")
      .simulate("change", { target: { value: "test date_1" } });
    expect(wrapper.find("#date_1_add").prop("value")).toEqual("test date_1");
  });

  it("date_2 should store it in its input field", () => {
    wrapper
      .find("#date_2_add")
      .simulate("change", { target: { value: "test date_2" } });
    expect(wrapper.find("#date_2_add").prop("value")).toEqual("test date_2");
  });

  it("board should store it in its input field", () => {
    wrapper
      .find("#board_add")
      .simulate("change", { target: { value: "test board" } });
    expect(wrapper.find("#board_add").prop("value")).toEqual("test board");
  });
});

describe("Clicking Submit will ", () => {
  let startup;
  let store;
  let wrapper;

  beforeEach(() => {
    startup = { id: 0, name: "company1" };
    store = mockStore({});
    wrapper = mount(
      <Provider store={store}>
        <AddStartupModal addStartup={addStartup} />
      </Provider>
    );
    // Runs before each test in the suite
    store.clearActions();
  });
  it('set all the values to "" in the modal', () => {
    wrapper
      .find("#name")
      .simulate("change", { target: { value: "test name" } });

    wrapper
      .find("#website")
      .simulate("change", { target: { value: "test website" } });

    wrapper
      .find("#ownership")
      .simulate("change", { target: { value: "test ownership" } });

    wrapper
      .find("#investment_1")
      .simulate("change", { target: { value: "test investment_1" } });

    wrapper
      .find("#investment_2")
      .simulate("change", { target: { value: "test investment_2" } });

    wrapper
      .find("#type_1")
      .simulate("change", { target: { value: "test type_1" } });

    wrapper
      .find("#type_2")
      .simulate("change", { target: { value: "test type_2" } });

    wrapper
      .find("#date_1")
      .simulate("change", { target: { value: "test date_1" } });

    wrapper
      .find("#date_2")
      .simulate("change", { target: { value: "test date_2" } });

    wrapper
      .find("#board")
      .simulate("change", { target: { value: "test board" } });

    wrapper.find("a").simulate("click");
    expect(wrapper.find("#board").prop("value")).toEqual("");
  });
});
