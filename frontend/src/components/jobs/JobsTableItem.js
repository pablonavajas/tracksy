import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setCurrentJob, deleteJob } from "../../actions/jobActions";

export const JobsTableItem = ({ job, setCurrentJob, deleteJob }) => {
  return (
    <tr>
      <td>{job.title}</td>
      <td>{job.salary}</td>

      {/* Review Intros Button */}
      <td className="center">
        <a
          id="reviewIntrosButton"
          href="#review-intros-modal"
          onClick={(e) => setCurrentJob(job)}
          className="modal-trigger"
        >
          <i className="centered material-icons light-blue-text">contacts</i>
        </a>
      </td>

      {/* Delete Button */}
      <td className="center">
        <a
          id="deleteJobItemButton"
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            deleteJob(job.startupId, job.id);
          }}
        >
          <i className="centered material-icons light-blue-text">delete</i>
        </a>
      </td>
    </tr>
  );
};

JobsTableItem.propTypes = {
  job: PropTypes.object.isRequired,
  setCurrentJob: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

export default connect(null, { setCurrentJob, deleteJob })(JobsTableItem);
