import React from "react";
import { shallow } from "enzyme";
import "../setupTests";
import toJson from "enzyme-to-json";
import { StartupItem } from "../../tracksy/frontend/src/components/startups/StartupItem";

// Several Investments passed in and no financials
describe("StartupItem ", () => {
  let wrapper;
  const mockDelete = jest.fn();
  const mockSetCurrent = jest.fn();
  const preventDefault = jest.fn();
  let startup = {
    id: 0,
    name: "company1",
    investments: [
      {
        id: 0,
        value: 666,
        currency: "$",
        date: "1900-04-04",
      },
      {
        id: 1,
        value: 100,
        currency: "$",
        date: "2010-04-04",
      },
    ],
    financials: [],
  };

  beforeEach(() => {
    wrapper = shallow(
      <StartupItem
        startup={startup}
        deleteStartup={mockDelete}
        setCurrent={mockSetCurrent}
      />
    );
  });

  it("renders correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("when delete clicked deleteStartup function is called with correct id", () => {
    wrapper.find("#deleteIcon").simulate("click", { preventDefault });
    expect(mockDelete).toHaveBeenCalledWith(startup.id);
  });

  it("when delete clicked deleteStartup function is called with correct id", () => {
    wrapper.find("#deleteIcon").simulate("click", { preventDefault });
    expect(mockDelete).toHaveBeenCalledWith(startup.id);
  });

  it("doesn't contain the grey unclickable button for kpis", () => {
    expect(
      wrapper.contains(<i className="material-icons grey-text">insert_chart</i>)
    ).toBe(false);
  });
});

// one financial passed in
describe("StartupItem, when there are no fincancials", () => {
  let wrapper;
  const mockDelete = jest.fn();
  const mockSetCurrent = jest.fn();
  const preventDefault = jest.fn();
  const startup = {
    id: 0,
    name: "company1",
    investments: [],
    financials: [
      {
        id: 0,
        revenue: 10,
      },
    ],
  };

  beforeEach(() => {
    wrapper = shallow(
      <StartupItem
        startup={startup}
        deleteStartup={mockDelete}
        setCurrent={mockSetCurrent}
      />
    );
  });

  it("contains a clickable grey button (which means it is no longer clickable)", () => {
    expect(
      wrapper.contains(<i className="material-icons grey-text">insert_chart</i>)
    ).toBe(true);
  });

  it("upon the click on the grey button no function should be called", () => {
    wrapper.find("#unclickableIcon").simulate("click", { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(mockDelete).not.toHaveBeenCalled();
    expect(mockSetCurrent).not.toHaveBeenCalled();
  });
});
