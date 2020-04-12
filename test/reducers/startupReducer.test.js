import reducer from "../../tracksy/frontend/src/reducers/startupsReducer";
import * as types from "../../tracksy/frontend/src/actions/types";

const initialState = {
  startups: null,
  current: null,
  loading: false,
  connections: null,
  error: null,
};

const startup1 = {
  id: 0,
  name: "Company1",
  financials: [],
  kpinames: [],
  investments: [],
  jobs: [],
};

const startup2 = {
  id: 1,
  name: "Company2",
  financials: [],
  kpinames: [],
  investments: [],
  jobs: [],
};

const startup3 = {
  id: 2,
  name: "Company3",
  financials: [],
  kpinames: [],
  investments: [],
  jobs: [],
};

const updatedStartup2 = {
  id: 1,
  name: "AdvancedCompany2",
  financials: [],
  kpinames: [],
  investments: [],
  jobs: [],
};

const stateWithTwoElements = {
  ...initialState,
  startups: [startup1, startup2],
};

const newFinancial = {
  id: 0,
  startupId: 0,
  comment: "First Report",
  currency: "$",
  revenue: 10,
  cashBalance: 100,
  monthlyBurn: 1000,
  startDate: "2005-04-04",
  endDate: "2005-05-05",
  kpis: [
    {
      name: "SMTH",
      value: 0.1,
    },
  ],
};

const investment1 = {
  id: 0,
  value: 666,
  currency: "$",
  date: "1900-04-04",
};

const investment2 = {
  id: 1,
  value: 100,
  currency: "$",
  date: "2010-04-04",
};

const newListOfInvestments = [investment1, investment2];

const kpiName1 = {
  id: 0,
  name: "One",
};

const kpiName2 = {
  id: 1,
  name: "Two",
};

const newListOfKpiNames = [kpiName1, kpiName2];

const newJob = {
  id: 0,
  title: "some job",
  description: "some interesting job description",
  url: "https://angel.co/company/some-company/jobs/cloud-engineer",
};

// stateWithTwo elements is modified as you go through the tests,
// is something gets added or deleted it also permanently modifies the state
describe("Startup reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_STARTUPS", () => {
    const res = reducer(initialState, {
      type: types.GET_STARTUPS,
      payload: [startup1, startup2],
    });

    expect(res).toEqual(stateWithTwoElements);
  });

  it("should handle ADD_STARTUP", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.ADD_STARTUP,
      payload: startup3,
    });
    expect(res).toEqual({
      ...stateWithTwoElements,
      startups: [startup1, startup2, startup3],
    });
  });

  it("should handle UPDATE_STARTUPS", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.UPDATE_STARTUP,
      payload: updatedStartup2,
    });

    expect(res).toEqual({
      ...stateWithTwoElements,
      startups: [startup1, updatedStartup2],
    });
  });

  it("should handle DELETE_STARTUP", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.DELETE_STARTUP,
      payload: 0,
    });

    expect(res).toEqual({
      ...stateWithTwoElements,
      startups: [startup2],
    });
  });

  it("should handle SET_CURRENT", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.SET_CURRENT,
      payload: {
        id: 0,
        name: "Company1",
      },
    });

    expect(res).toEqual({
      ...stateWithTwoElements,
      current: { id: 0, name: "Company1" },
    });
  });

  it("should handle SET_LOADING", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.SET_LOADING,
    });

    expect(res).toEqual({
      ...stateWithTwoElements,
      loading: true,
    });
  });

  it("should handle ADD_FINANCIAL", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.ADD_FINANCIAL,
      payload: newFinancial,
    });

    expect(res.startups[0].financials[0]).toEqual(newFinancial);
  });

  it("should handle ADD_INVESTMENTS", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.ADD_INVESTMENTS,
      payload: { investments: newListOfInvestments, startupId: 0 },
    });

    expect(res.startups[0].investments).toEqual(newListOfInvestments);
  });

  it("should handle DELETE_INVESTMENT", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.DELETE_INVESTMENT,
      payload: { startupId: 0, investmentId: 0 },
    });

    expect(res.startups[0].investments).toEqual([investment2]);
  });

  it("should handle ADD_KPI_NAMES", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.ADD_KPI_NAMES,
      payload: { kpiNames: newListOfKpiNames, startupId: 0 },
    });

    expect(res.startups[0].kpinames).toEqual(newListOfKpiNames);
  });

  it("should handle DELETE_KPI_NAMES", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.DELETE_KPI_NAME,
      payload: { startupId: 0, kpiNameId: 0 },
    });

    expect(res.startups[0].kpinames).toEqual([kpiName2]);
  });

  it("should handle ADD_JOB", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.ADD_JOB,
      payload: { startupId: 0, job: newJob },
    });
    expect(res.startups[0].jobs).toEqual([newJob]);
  });

  it("should handle DELETE_JOB", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.DELETE_JOB,
      payload: { startupId: 0, jobId: 0 },
    });

    expect(res.startups[0].jobs).toEqual([]);
  });

  it("should handle UPDATE_INTRODUCTION_STATUS", () => {
    const res = reducer(stateWithTwoElements, {
      type: types.DELETE_JOB,
      payload: { startupId: 0, jobId: 0 },
    });

    expect(res.startups[0].jobs).toEqual([]);
  });
});
