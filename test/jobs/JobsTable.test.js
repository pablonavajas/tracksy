import React from "react";
import { shallow } from "enzyme";
import { JobsTable } from "../../tracksy/frontend/src/components/jobs/JobsTable";
import "../setupTests";
import toJson from "enzyme-to-json";

//only VC Funds can register
describe("JobsTableItem", () => {
  let startup, wrapper;

  beforeEach(() => {
    startup = {
      startups: [{ id: 0, jobs: [{ id: 0, title: "testJobName" }] }],
      loading: false,
    };
  });

  it("renders correctly", () => {
    wrapper = shallow(<JobsTable startup={startup} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the preloader when loading is true", () => {
    startup.loading = true;
    wrapper = shallow(<JobsTable startup={startup} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
