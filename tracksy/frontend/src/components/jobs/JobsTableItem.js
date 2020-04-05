import React from "react";
import { setCurrentJob, deleteJob } from "../../actions/jobActions";
import { connect } from "react-redux";

function JobsTableItem({ job, setCurrentJob, deleteJob }) {
  return (
    <tr>
      <td>{job.title}</td>
      <td>{job.salary}</td>

      {/* Review Intros Button */}
      <td className="center">
        <a
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
}

export default connect(null, { setCurrentJob, deleteJob })(JobsTableItem);
