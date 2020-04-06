import {
  GET_STARTUPS,
  SET_LOADING,
  ADD_STARTUP,
  UPDATE_STARTUP,
  DELETE_STARTUP,
  SET_CURRENT,
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
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"/* The following is required for the sticky footer */\\n\\n.page-flexbox-wrapper {\\n  display: flex;\\n  min-height: 100vh;\\n  flex-direction: column\\n}\\n\\nmain {\\n  flex: 1 1 auto;\\n}\\n\\n.modal-wrapper {\\n  position: fixed;\\n  left: 0;\\n  top: 0;\\n  width: 100%;\\n  height: 100vh;\\n  overflow-y: scroll;\\n  -webkit-overflow-scrolling: touch;\\n}\\n\\n/* ********************************************* */\\n\\n[type=\\\"radio\\\"]:checked+span:after, [type=\\\"radio\\\"].with-gap:checked+span:before, [type=\\\"radio\\\"].with-gap:checked+span:after {\\n  border: 2px solid #ef5350;\\n}\\n\\n[type=\\\"radio\\\"]:checked+span:after, [type=\\\"radio\\\"].with-gap:checked+span:after {\\n  background-color: #ef5350;\\n}\\n\\n.radio-buttons-container {\\n  display: inline-block;\\n  margin-left: 35px;\\n  position: relative;\\n  padding-left: 35px;\\n  margin-bottom: 12px;\\n  cursor: pointer;\\n  font-size: 22px;\\n  -webkit-user-select: none;\\n  -moz-user-select: none;\\n  -ms-user-select: none;\\n  user-select: none;\\n}\\n\\n.input-field .postfix~input {\\n  width: 80%;\\n  width: calc(100% - 3rem);\\n  margin-left: 0px;\\n  margin-right: 3rem!important;\\n}\\n\\n.input-field .postfix {\\n  position: absolute;\\n  width: 3rem;\\n  right: 0px;\\n  font-size: 2rem;\\n  -webkit-transition: color .2s;\\n  transition: color .2s;\\n}\\n\\n.input-field .postfix.active {\\n  color: #26a69a;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./tracksy/frontend/src/components/App.css?./node_modules/css-loader/dist/cjs.js");
