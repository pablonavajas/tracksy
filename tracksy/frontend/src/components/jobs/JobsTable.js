import React from "react";
import JobsTableItem from "./JobsTableItem";
import { connect } from "react-redux";
import { setCurrentJob } from "../../actions/jobActions";

const JobsTable = ({ loading, startups }) => {
  if (loading) {
    return <h2>Loading ... </h2>;
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
  margin: "-1.4em ",
};

const mapStateToProps = (state) => ({
  startups: state.startup.startups,
  loading: state.startup.loading,
});

export default connect(mapStateToProps, null)(JobsTable);
