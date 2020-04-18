import React from "react";
import { shallow } from "enzyme";
import { JobsTableItem } from "../../tracksy/frontend/src/components/jobs/JobsTableItem";
import "../setupTests";
import toJson from "enzyme-to-json";

//only VC Funds can register
describe("JobsTableItem", () => {
  let setCurrentJob, deleteJob, job, wrapper, preventDefault;

  beforeEach(() => {
    setCurrentJob = jest.fn();
    deleteJob = jest.fn();
    preventDefault = jest.fn();
    job = {
      id: 0,
      startupId: 0,
      title: "Job Title",
      salary: "£100k",
    };
    wrapper = shallow(
      <JobsTableItem
        job={job}
        setCurrentJob={setCurrentJob}
        deleteJob={deleteJob}
      />
    );
  });

  it("renders correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("reviewIntrosButton clicked => setCurrentJob function is called", () => {
    wrapper.find("#reviewIntrosButton").simulate("click");
    expect(setCurrentJob).toHaveBeenCalledWith(job);
  });

  it("deleteButton clicked => deleteJob function is called", () => {
    wrapper.find("#deleteJobItemButton").simulate("click", { preventDefault });
    expect(deleteJob).toHaveBeenCalledWith(job.startupId, job.id);
  });
});
