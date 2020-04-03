import React, { Fragment, useState } from "react";

function AddJobModal() {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div id="add-job-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Add Job</h4>
        <div className="row">
          <form className="col s12">
            <div className="input-field">
              <a className="waves-effect large waves-light postfix">
                <i className="material-icons center">cloud_download</i>
              </a>
              <input
                id="url"
                type="url"
                className="validate"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <label htmlFor="url">Angel List URL</label>
            </div>
            <div className="input-field ">
              <input
                id="description"
                type="url"
                className="validate"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="description">Job Description</label>
            </div>
            <div className="input-field ">
              <input
                id="title"
                type="text"
                className="validate"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="title"> Title</label>
            </div>
            <div className="input-field ">
              <input
                id="salary"
                type="text"
                className="validate"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <label htmlFor="salary"> Salary</label>
            </div>
            <div className="input-field ">
              <input
                id="location"
                type="text"
                className="validate"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label htmlFor="location">Location</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const modalStyle = {
  width: "60%",
  height: "75%",
};

export default AddJobModal;
