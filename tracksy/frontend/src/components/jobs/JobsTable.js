import React from "react";
import JobsTableItem from "./JobsTableItem";

function JobsTable() {
  return (
    <div className="col s12">
      <table className="responsive-table highlight">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Salary</th>
            <th className="center">Introductions</th>
          </tr>
        </thead>

        <tbody>
          <JobsTableItem />
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
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
}

const addButtonStyle = {
  margin: "-1.4em "
};

export default JobsTable;
