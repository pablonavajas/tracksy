import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import StartupItem from "./StartupItem";
import { getStartups } from "../../actions/startupsActions";
import AddStartupBtn from "./../layout/AddStartupBtn";

export const Startups = ({ startup: { startups, loading }, getStartups }) => {
  //everything inside useEffect hook, gets called at page start up if [] is empty
  useEffect(() => {
    getStartups();
    // eslint-disable-next-line
  }, []);

  if (loading || startups === null) {
    return <h4>Loading ...</h4>;
  }

  if (!loading && startups.length === 0) {
    return (
      <div>
        <h5 className="left">No logs to show...</h5>
        <AddStartupBtn />
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title center">Portfolio Companies</span>
              <table className="striped centered">
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Ownership (%)</th>
                    <th>Board</th>
                    <th className="center">Investment 1</th>
                    <td className="center">Type</td>
                    <td className="center">Closed</td>
                    <th className="center">Investment 2</th>
                    <td className="center">Type</td>
                    <td className="center">Closed</td>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {startups.map(startup => (
                    <StartupItem startup={startup} key={startup.id} />
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
        <AddStartupBtn />
      </div>
    </div>
  );
};

Startups.propTypes = {
  startup: PropTypes.object.isRequired,
  getStartups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  startup: state.startup //state.startups is from rootReducer from index.js
});

//first argument (to get anything from AppLevelState and get it into the component)
export default connect(mapStateToProps, { getStartups })(Startups);
