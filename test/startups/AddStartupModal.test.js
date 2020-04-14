import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import { AddStartupModal } from "../../tracksy/frontend/src/components/startups/AddStartupModal";

configure({ adapter: new Adapter() });

const testStartup = {
  name: "test",
  website: "test",
  ownership: "test",
  board: "test",
  startupEmail: "test",
};

//Snapshot Test
describe("AddStartupModal ", () => {
  const mockFn = jest.fn();

  it("renders correctly", () => {
    const wrapper = shallow(<AddStartupModal addStartup={mockFn} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

//Logic Test
describe("When all fields are filled in, in the AddStartupModal", () => {
  let wrapper;
  const mockFn = jest.fn();
  const mockEvent = {
    target: {
      name: "description",
      value: "test",
    },
  };

  beforeEach(() => {
    wrapper = mount(<AddStartupModal addStartup={mockFn} />);

    // fill in the input fields
    wrapper.find("#addStartupName").at(1).simulate("change", mockEvent);
    wrapper.find("#addWebsiteUrl").at(1).simulate("change", mockEvent);
    wrapper.find("#addOwnership").at(1).simulate("change", mockEvent);
    wrapper.find("#addStartupEmail").at(1).simulate("change", mockEvent);
    wrapper.find("#addBoard").at(1).simulate("change", mockEvent);
  });

  it("the props for all values have been correctly set to expected values", () => {
    expect(wrapper.find("#addStartupName").at(1).prop("value")).toEqual("test");
    expect(wrapper.find("#addWebsiteUrl").at(1).prop("value")).toEqual("test");
    expect(wrapper.find("#addOwnership").at(1).prop("value")).toEqual("test");
    expect(wrapper.find("#addStartupEmail").at(1).prop("value")).toEqual(
      "test"
    );
    expect(wrapper.find("#addBoard").at(1).prop("value")).toEqual("test");
  });

  it("and submit button clicked, props for all fields are reset to be empty", () => {
    wrapper.find("a").simulate("click");
    expect(wrapper.find("#addStartupName").at(1).prop("value")).toEqual("");
    expect(wrapper.find("#addWebsiteUrl").at(1).prop("value")).toEqual("");
    expect(wrapper.find("#addOwnership").at(1).prop("value")).toEqual("");
    expect(wrapper.find("#addStartupEmail").at(1).prop("value")).toEqual("");
    expect(wrapper.find("#addBoard").at(1).prop("value")).toEqual("");
  });

  it("and  submit button clicked, addStartup function is called with correct values", () => {
    wrapper.find("a").simulate("click");
    expect(mockFn).toHaveBeenCalledWith(testStartup);
  });
});
