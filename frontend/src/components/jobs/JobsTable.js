import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import JobsTableItem from "./JobsTableItem";
import Preloader from "../layout/Preloader";

export const JobsTable = ({ startup: { startups, loading } }) => {
  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="col s12">
      <table className="responsive-table highlight">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Salary</th>
            <th className="center"></th>
            <th className="center"></th>
          </tr>
        </thead>

        <tbody>
          {startups[0].jobs.map((job) => (
            <JobsTableItem job={job} key={job.id} />
          ))}
        </tbody>
      </table>
      <div className="center" style={addButtonStyle}>
        <a
          href="#add-job-modal"
          className="modal-trigger btn-floating waves-effect waves-light light-blue"
        >
          <i className="material-icons">add</i>
        </a>
      </div>
    </div>
  );
};

const addButtonStyle = {
  margin: "-1.1em ",
};

JobsTable.propTypes = {
  startup: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  startup: state.startup,
});

export default connect(mapStateToProps, null)(JobsTable);
