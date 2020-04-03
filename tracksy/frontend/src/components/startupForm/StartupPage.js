import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getStartups } from "../../actions/startupsActions";
import FinancialItem from "./FinancialItem";
import PropTypes from "prop-types";

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
  console.log(startups[0].financials);

  const addButton = (
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
  );

  if (startups[0].financials.length === 0) {
    return (
      <Fragment>
        <h4>There is not history to show ...</h4>
        {addButton}
      </Fragment>
    );
  }

  return (
    <Fragment>
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
      {addButton}
    </Fragment>
  );
}

StartupPage.propTypes = {
  startup: PropTypes.object.isRequired,
  getStartups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  startup: state.startup
});

export default connect(mapStateToProps, { getStartups })(StartupPage);
