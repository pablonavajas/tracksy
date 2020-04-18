import React from "react";
import { shallow, mount } from "enzyme";
import { ReviewIntrosModal } from "../../tracksy/frontend/src/components/jobs/ReviewIntrosModal";
import ConnectedReviewIntrosModal from "../../tracksy/frontend/src/components/jobs/ReviewIntrosModal";
import "../setupTests";
import toJson from "enzyme-to-json";

//store needed for testing mapStateToProps
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

//only VC Funds can register
describe("ReviewIntrosModal", () => {
  let setCurrentJob, jobs, wrapper, updateIntroductionsStatuses;

  beforeEach(() => {
    setCurrentJob = jest.fn();
    updateIntroductionsStatuses = jest.fn();
    jobs = {
      current: {
        id: 0,
        startupId: 0,
        title: "Job Title",
        introductions: [
          {
            id: 0,
            status: "interview",
            connection: {
              id: 0,
              owner: "testOwner",
            },
          },
        ],
      },
    };
  });

  it("renders the preloader if there is no currently selected job", () => {
    jobs.current = null;
    wrapper = shallow(
      <ReviewIntrosModal
        jobs={jobs}
        setCurrentJob={setCurrentJob}
        updateIntroductionsStatuses={updateIntroductionsStatuses}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the connection of the introductions ", () => {
    wrapper = shallow(
      <ReviewIntrosModal
        jobs={jobs}
        setCurrentJob={setCurrentJob}
        updateIntroductionsStatuses={updateIntroductionsStatuses}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders no introducitons, if connection is null for the introduction", () => {
    jobs.current.introductions[0].connection = null;
    wrapper = shallow(
      <ReviewIntrosModal
        jobs={jobs}
        setCurrentJob={setCurrentJob}
        updateIntroductionsStatuses={updateIntroductionsStatuses}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders no introducitons, if connection is null for the introduction", () => {
    wrapper = mount(
      <ReviewIntrosModal
        jobs={jobs}
        setCurrentJob={setCurrentJob}
        updateIntroductionsStatuses={updateIntroductionsStatuses}
      />
    );

    // button is found and clicked
    // it changes internat state which is none
    wrapper
      .find("#rateIntroductionSelection")
      .simulate("change", { target: { name: "testName", value: "testValue" } });
    expect(jobs.current.introductions[0].status).toStrictEqual("testValue");
  });

  it("renders no introducitons, if connection is null for the introduction", () => {
    wrapper = mount(
      <ReviewIntrosModal
        jobs={jobs}
        setCurrentJob={setCurrentJob}
        updateIntroductionsStatuses={updateIntroductionsStatuses}
      />
    );

    wrapper.find("#submitIntroductionsRatingButton").simulate("click");
    expect(updateIntroductionsStatuses).toHaveBeenCalledWith(
      jobs.current.startupId,
      jobs.current.id,
      jobs.current.introductions[0]
    );
  });

  // useEffect called with current as null
  // doesn't set internal state introductions to anything
  // since current is null
  it("useEffect is called with current being null", () => {
    jobs.current = null;
    wrapper = mount(
      <ReviewIntrosModal
        jobs={jobs}
        setCurrentJob={setCurrentJob}
        updateIntroductionsStatuses={updateIntroductionsStatuses}
      />
    );
  });
});

// Testing MapStateToProps
describe("ReviewIntrosModal ", () => {
  let store, wrapper, startup, job;
  const setCurrentJob = jest.fn();
  const updateIntroductionStatuses = jest.fn();
  startup = { id: 0, name: "Company1" };
  job = { id: 0, title: "Job Title" };

  beforeEach(() => {
    store = mockStore({
      jobs: { current: job },
    });
    wrapper = shallow(
      <ConnectedReviewIntrosModal
        store={store}
        setCurrentJob={setCurrentJob}
        updateIntroductionStatuses={updateIntroductionStatuses}
      />
    );
  });

  it("should show the job value imported from store", () => {
    expect(wrapper.props().children.props.jobs.current).toStrictEqual(job);
  });
});
