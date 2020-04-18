import React from "react";
import { shallow, mount } from "enzyme";
import { AddJobModal } from "../../tracksy/frontend/src/components/jobs/AddJobModal";
import ConnectedAddJobModal from "../../tracksy/frontend/src/components/jobs/AddJobModal";
import "../setupTests";

//store needed for testing mapStateToProps
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

//only VC Funds can register
describe("AddJobModal", () => {
  let wrapper,
    addJob,
    getJobDescription,
    startup,
    jobs,
    preventDefault,
    mockEvent;

  beforeEach(() => {
    getJobDescription = jest.fn();
    addJob = jest.fn();
    preventDefault = jest.fn();
    startup = { startups: [{ id: 0, name: "Company1" }] };
    jobs = { latestRetrieved: null };
    mockEvent = {
      target: {
        name: "testDescription",
        value: "testValue",
      },
    };
  });

  it("should call getJobDescription on click of the button", () => {
    wrapper = shallow(
      <AddJobModal
        startup={startup}
        jobs={jobs}
        addJob={addJob}
        getJobDescription={getJobDescription}
      />
    );
    wrapper
      .find("#getJobDescriptionButton")
      .simulate("click", { preventDefault });
    expect(getJobDescription).toHaveBeenCalled();
  });

  it("addJob is called with correct params on a click of the button", () => {
    wrapper = mount(
      <AddJobModal
        startup={startup}
        jobs={jobs}
        addJob={addJob}
        getJobDescription={getJobDescription}
      />
    );

    // at(1) is needed to the components, which are not included
    // into the vanilla JSX inside this component
    wrapper.find("#url").simulate("change", mockEvent);
    wrapper.find("#title").at(1).simulate("change", mockEvent);
    wrapper.find("#salary").at(1).simulate("change", mockEvent);
    wrapper.find("#location").at(1).simulate("change", mockEvent);
    wrapper.find("#description").simulate("change", mockEvent);
    wrapper.find("#addJobButton").simulate("click");
    expect(addJob).toHaveBeenCalledWith(startup.startups[0].id, {
      url: mockEvent.target.value,
      description: mockEvent.target.value,
      title: mockEvent.target.value,
      salary: mockEvent.target.value,
      location: mockEvent.target.value,
    });
  });

  // runs through useState functions inside useEffect
  it("useEffect sets all the params", () => {
    jobs.latestRetrieved = {
      url: "testUrl",
      description: "testDescription",
      title: "testTitle",
      salary: "testSalary",
      specs: {
        Location: "testLocation",
      },
    };
    wrapper = mount(
      <AddJobModal
        startup={startup}
        jobs={jobs}
        addJob={addJob}
        getJobDescription={getJobDescription}
      />
    );
  });
});

// Testing MapStateToProps
describe("AddJobModal ", () => {
  let store, wrapper, startup, job;
  const addJob = jest.fn();
  const getJobDescription = jest.fn();
  startup = { id: 0, name: "Company1" };
  job = { id: 0, title: "Job Title" };

  beforeEach(() => {
    store = mockStore({
      startup: { startups: [startup] },
      jobs: { latestRetrieved: job },
    });
    wrapper = shallow(
      <ConnectedAddJobModal
        store={store}
        addJob={addJob}
        getJobDescription={getJobDescription}
      />
    );
  });

  it("should show the startup and job value imported from store", () => {
    expect(wrapper.props().children.props.startup).toStrictEqual({
      startups: [startup],
    });
    expect(wrapper.props().children.props.jobs.latestRetrieved).toStrictEqual(
      job
    );
  });
});
