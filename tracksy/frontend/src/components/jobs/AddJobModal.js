import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addJob, getJobDescription } from "../../actions/jobActions";
import "../smallComponents/inputFields";
import { InputField } from "../smallComponents/inputFields";

export const AddJobModal = ({
  startup: { startups },
  jobs: { latestRetrieved },
  addJob,
  getJobDescription,
}) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (latestRetrieved) {
      setUrl(latestRetrieved.url);
      setDescription(latestRetrieved.description);
      setTitle(latestRetrieved.title);
      setSalary(latestRetrieved.salary);
      setLocation(latestRetrieved.specs.Location);
    }
  }, [latestRetrieved]);

  const onSubmit = () => {
    const newJob = {
      url,
      description,
      title,
      salary,
      location,
    };

    addJob(startups[0].id, newJob);

    setUrl("");
    setDescription("");
    setTitle("");
    setSalary("");
    setLocation("");
  };

  return (
    <div id="add-job-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Add Job</h4>
        <div className="row">
          <form className="col s12">
            <div className="input-field">
              {/* Button to scrape info from AngelList */}
              <a
                id="getJobDescriptionButton"
                onClick={(e) => {
                  e.preventDefault();
                  getJobDescription({
                    url,
                  });
                }}
                className="waves-effect large waves-light postfix"
              >
                <i className="material-icons center">cloud_download</i>
              </a>
              <input
                placeholder=""
                id="url"
                type="url"
                className="validate"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <label htmlFor="url">Angel List URL</label>
            </div>
            <InputField
              placeholder=""
              id="title"
              type="text"
              name="Title"
              className="input-field"
              value={title}
              setFunction={setTitle}
            />
            <InputField
              placeholder=""
              id="salary"
              type="text"
              name="Salary"
              className="input-field"
              value={salary}
              setFunction={setSalary}
            />
            <InputField
              placeholder=""
              id="location"
              type="text"
              name="Location"
              className="input-field"
              value={location}
              setFunction={setLocation}
            />
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  placeholder=""
                  id="description"
                  type="text"
                  className="materialize-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label htmlFor="description">Job Description</label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <div className="center">
          <a
            id="addJobButton"
            onClick={onSubmit}
            className="btn waves-effect waves-light light-blue modal-close"
          >
            Submit
          </a>
        </div>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "60%",
  height: "75%",
};

AddJobModal.propTypes = {
  startup: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired,
  addJob: PropTypes.func.isRequired,
  getJobDescription: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  startup: state.startup,
  jobs: state.jobs,
});

export default connect(mapStateToProps, { addJob, getJobDescription })(
  AddJobModal
);
