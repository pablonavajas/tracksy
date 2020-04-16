import React from "react";
import { mount, shallow } from "enzyme";
import "../setupTests";
import toJson from "enzyme-to-json";
import { EditStartupModal } from "../../tracksy/frontend/src/components/startups/EditStartupModal";
import ConnectedEditStartupModal from "../../tracksy/frontend/src/components/startups/EditStartupModal";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

const testStartup = {
  id: 1,
  name: "test",
  website: "test",
  ownership: "test",
  board: "test",
  startupEmail: "test",
};

// Testing MapStateToProps
describe("EditStartupModal ", () => {
  const mockFn = jest.fn();
  const current = {
    id: 1,
    name: "test",
  };

  const initialState = {
    startup: { current },
  };

  const store = mockStore(initialState);
  const wrapper = shallow(
    <ConnectedEditStartupModal updateStartup={mockFn} store={store} />
  );

  it("should show the current value imported from store", () => {
    expect(wrapper.props().children.props.current).toEqual(current);
  });
});

//Snapshot Component Test
describe("EditStartupModal ", () => {
  const mockFn = jest.fn();

  it("renders correctly", () => {
    const wrapper = shallow(<EditStartupModal updateStartup={mockFn} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

//Logic Component Test
describe("When all fields are filled in, in the EditStartupModal", () => {
  let wrapper;
  const mockFn = jest.fn();
  const mockEvent = {
    target: {
      name: "description",
      value: "test",
    },
  };

  beforeEach(() => {
    wrapper = mount(
      <EditStartupModal updateStartup={mockFn} current={testStartup} />
    );
    // fill in the input fields
    wrapper.find("#editStartupName").at(1).simulate("change", mockEvent);
    wrapper.find("#editWebsiteUrl").at(1).simulate("change", mockEvent);
    wrapper.find("#editOwnership").at(1).simulate("change", mockEvent);
    wrapper.find("#editStartupEmail").at(1).simulate("change", mockEvent);
    wrapper.find("#editBoard").at(1).simulate("change", mockEvent);
  });

  it("the props for all values have been correctly set to expected values", () => {
    expect(wrapper.find("#editStartupName").at(1).prop("value")).toEqual(
      "test"
    );
    expect(wrapper.find("#editWebsiteUrl").at(1).prop("value")).toEqual("test");
    expect(wrapper.find("#editOwnership").at(1).prop("value")).toEqual("test");
    expect(wrapper.find("#editStartupEmail").at(1).prop("value")).toEqual(
      "test"
    );
    expect(wrapper.find("#editBoard").at(1).prop("value")).toEqual("test");
  });

  it("and  submit button clicked, editStartup function is called with correct values", () => {
    wrapper.find("a").simulate("click");
    expect(mockFn).toHaveBeenCalledWith(testStartup);
  });
});
