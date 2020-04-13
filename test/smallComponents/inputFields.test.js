import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import {
  CommentsField,
  DateField,
  CurrencyFormattedField,
} from "../../tracksy/frontend/src/components/smallComponents/inputFields";

it("will display the dateField correctly", () => {
  const mockFn = jest.fn().mockImplementation((s) => s);
  const mockEvent = {
    target: {
      name: "description",
      value: "test",
    },
  };

  const wrapper = shallow(
    <DateField
      id={"testId"}
      name={"Test Name"}
      trueValue={"01/01/2000"}
      setFunction={mockFn}
    />
  );

  wrapper.find("input").simulate("change", mockEvent);
  expect(mockFn).toHaveBeenCalledWith("test");
});

it("will display the dateField correctly", () => {
  const mockFn = jest.fn().mockImplementation((s) => s);
  const mockEvent = {
    target: {
      name: "description",
      value: "test",
    },
  };

  const wrapper = shallow(
    <CommentsField
      id={"testId"}
      name={"Test Name"}
      trueValue={"01/01/2000"}
      setFunction={mockFn}
    />
  );

  wrapper.find("textarea").simulate("change", mockEvent);
  expect(mockFn).toHaveBeenCalledWith("test");
});
