import {
  GET_STARTUPS,
  SET_LOADING,
  STARTUPS_ERROR,
  ADD_STARTUP,
  UPDATE_STARTUP,
  DELETE_STARTUP,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_FINANCIAL,
  ADD_INVESTMENTS,
  DELETE_INVESTMENT,
  ADD_KPI_NAMES,
  DELETE_KPI_NAME,
  ADD_JOB,
  DELETE_JOB,
  UPDATE_INTRODUCTION_STATUS,
} from "../actions/types";

const initialState = {
  startups: null,
  current: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STARTUPS:
      return {
        ...state,
        startups: action.payload,
        loading: false,
      };
    case ADD_STARTUP:
      return {
        ...state,
        //state is immutable
        startups: [...state.startups, action.payload],
        loading: false,
      };
    case UPDATE_STARTUP:
      return {
        ...state,
        startups: state.startups.map((startup) =>
          startup.id === action.payload.id ? action.payload : startup
        ),
      };
    case DELETE_STARTUP:
      return {
        ...state,
        startups: state.startups.filter(
          (startup) => startup.id !== action.payload
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ADD_FINANCIAL:
      return {
        ...state,
        startups: state.startups.map((startup) => {
          if (startup.id === action.payload.startupId) {
            startup.financials.push(action.payload);
            return startup;
          } else {
            return startup;
          }
        }),
      };
    case ADD_INVESTMENTS:
      return {
        ...state,
        startups: state.startups.map((startup) => {
          if (startup.id === action.payload.startupId) {
            startup.investments = action.payload.investments;
          }
          return startup;
        }),
      };
    case DELETE_INVESTMENT:
      return {
        ...state,
        startups: state.startups.map((startup) => {
          if (startup.id === action.payload.startupId) {
            startup.investments = startup.investments.filter(
              (investment) => investment.id !== action.payload.investmentId
            );
          }
          return startup;
        }),
      };
    case ADD_KPI_NAMES:
      return {
        ...state,
        startups: state.startups.map((startup) => {
          if (startup.id === action.payload.startupId) {
            startup.kpinames = action.payload.kpiNames;
          }
          return startup;
        }),
      };
    case DELETE_KPI_NAME:
      return {
        ...state,
        startups: state.startups.map((startup) => {
          if (startup.id === action.payload.startupId) {
            startup.kpinames = startup.kpinames.filter(
              (kpiName) => kpiName.id !== action.payload.kpiNameId
            );
          }
          return startup;
        }),
      };
    case ADD_JOB:
      return {
        ...state,
        startups: state.startups.map((startup) => {
          if (startup.id === action.payload.startupId) {
            startup.jobs = [...startup.jobs, action.payload.job];
          }
          return startup;
        }),
      };
    case DELETE_JOB:
      return {
        ...state,
        startups: state.startups.map((startup) => {
          if (startup.id === action.payload.startupId) {
            startup.jobs = startup.jobs.filter(
              (job) => job.id !== action.payload.jobId
            );
          }
          return startup;
        }),
      };
    case UPDATE_INTRODUCTION_STATUS:
      return {
        ...state,
        startups: state.startups.map((startup) => {
          if (startup.id === action.payload.startupId) {
            startup.jobs.map((job, i) => {
              if (job.id === action.payload.jobId) {
                startup.jobs[i].introductions.map((introduction) => {
                  if (introduction.id === action.payload.introduction.id) {
                    startup.jobs[i].introduction = action.payload.introduction;
                  }
                });
              }
            });
          }
          return startup;
        }),
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STARTUPS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
