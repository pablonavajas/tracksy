import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStartups } from "../../actions/startupsActions";
import FinancialItem from "./FinancialItem";

function StartupPage({ startup, getStartups }) {
  useEffect(() => {
    getStartups();
  }, []);

  const { startups, loading } = startup;

  if (loading || startups === null) {
    return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title center">Monthly Reports History</span>
              <table className="striped centered">
                <thead>
                  <tr>
                    <th>Report Start Date</th>
                    <th>Report End Date</th>
                    <th>Revenue</th>
                    <th>Cash Balance</th>
                    <th>Monthly Burn</th>
                    <th>KPIs</th>
                  </tr>
                </thead>
                <tbody>
                  {startups[0].financials.map(fin => (
                    <FinancialItem financial={fin} key={fin.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="right"
        style={{
          margin: "-60px 50px"
        }}
      >
        <div className="fixed-action-btn">
          <a
            href="/#/startupForm"
            className="btn-floating waves-effect waves-light btn-large red darken-1 "
          >
            <i className="large material-icons">add</i>
          </a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  startup: state.startup
});

export default connect(mapStateToProps, { getStartups })(StartupPage);
