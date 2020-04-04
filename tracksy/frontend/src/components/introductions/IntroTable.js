import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { updateIntroductionsStatuses } from "../../actions/introductionActions";
import { setCurrentJob } from "../../actions/jobActions";

const IntroTable = ({
  currentJob,
  updateIntroductionsStatuses,
  setCurrentJob,
}) => {
  const [introductions, setIntroductions] = useState(null);

  useEffect(() => {
    if (currentJob) {
      setIntroductions(currentJob.introductions);
    }
  }, [currentJob]);

  const setStatus = (introductionId, status) => {
    introductions.map((introduction) => {
      introduction.id === introductionId ? (introduction.status = status) : {};
    });
    setIntroductions([...introductions]);
  };

  const onSubmit = () => {
    introductions.map((introduction) =>
      updateIntroductionsStatuses(
        currentJob.startupId,
        currentJob.id,
        introduction
      )
    );
    setCurrentJob(null);
  };

  if (!currentJob) return <h2>Loading...</h2>;
  return (
    <Fragment>
      <div className="col s12">
        <table className="responsive-table highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentJob.introductions.map((introduction) => {
              //if the connection for this introduciton exists
              if (introduction.connection) {
                return (
                  <tr key={introduction.id}>
                    <td>
                      <a href={introduction.connection.url}>
                        {introduction.connection.name}
                      </a>
                    </td>
                    <td>{introduction.connection.description}</td>
                    <td>
                      <select
                        className="browser-default"
                        onChange={(e) =>
                          setStatus(introduction.id, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Choose your option
                        </option>
                        <option value="Good">Good</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Bad">Bad</option>
                      </select>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="modal-footer">
        <div className="center">
          <a
            onClick={onSubmit}
            className="btn waves-effect waves-light light-blue modal-close"
          >
            Submit
          </a>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentJob: state.jobs.current,
});

export default connect(mapStateToProps, {
  updateIntroductionsStatuses,
  setCurrentJob,
})(IntroTable);
