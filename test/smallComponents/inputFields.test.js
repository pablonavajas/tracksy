import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import {
  SelectField,
  CommentsField,
  DateField,
  CurrencyFormattedField,
} from "../../tracksy/frontend/src/components/smallComponents/inputFields";

describe("Upon firing onChange event in the  ", () => {
  let mockFn, mockEvent, id, name, trueValue, options;

  beforeAll(() => {
    mockFn = jest.fn().mockImplementation((s) => s);
    mockEvent = {
      target: {
        name: "description",
        value: "test",
      },
    };
    id = "testId";
    name = "Some Name";
    trueValue = "";
    options = ["test", "test1", "test2"];
  });

  it("SelectField component, mockFunciton is called with correct params", () => {
    const wrapper = shallow(
      <SelectField
        id={id}
        name={name}
        trueValue={trueValue}
        setFunction={mockFn}
        options={options}
      />
    );

    wrapper.find("select").simulate("change", mockEvent);
    expect(mockFn).toHaveBeenCalledWith("test");
  });

  it("DateField component, mockFunciton is called with correct params", () => {
    const wrapper = shallow(
      <DateField
        id={id}
        name={name}
        trueValue={trueValue}
        setFunction={mockFn}
      />
    );

    wrapper.find("input").simulate("change", mockEvent);
    expect(mockFn).toHaveBeenCalledWith("test");
  });

  it("CommentsField compnent, mockFunciton is called with correct params", () => {
    const wrapper = shallow(
      <CommentsField
        id={id}
        name={name}
        trueValue={trueValue}
        setFunction={mockFn}
      />
    );

    wrapper.find("textarea").simulate("change", mockEvent);
    expect(mockFn).toHaveBeenCalledWith("test");
  });
});
