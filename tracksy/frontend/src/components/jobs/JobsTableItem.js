import React from "react";

function JobsTableItem() {
  return (
    <tr>
      <td>Cloud Engineer</td>
      <td>$80k</td>
      <td className="center">
        <a href="#add-job-modal" className="modal-trigger">
          <i className="centered material-icons grey-text">contacts</i>
        </a>
      </td>
    </tr>
  );
}

export default JobsTableItem;
