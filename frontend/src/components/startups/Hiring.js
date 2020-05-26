import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getConnections} from  '../../actions/connectionsActions';

const Hiring = ({ current, connections, getConnections}) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");


  useEffect(() => {
    getConnections();
    
    if (connections) {  
      setName(connections[0].name);
    }

    if (current) {
      setWebsite(current.website);
    }
  }, [connections, current]);

  const num_jobs = () => {
    var count = 0;
    for(let item of current.jobs){
    count = count + 1;
    }
    return count;
  }

  const num_intro = () => {
    var count = 0;
    for(let item of current.jobs){
      for (let x of item.introductions) {
        count = count + 1;
      }
    }
    return count;
  }

  var job_id = 0;

  return (
  // Section: Stats
  
  <section className="section section-stats center">
    <nav>
    <div className="nav-wrapper blue-grey darken-4">
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><a href="#startup-overview">Overview</a></li>
        <li className="active"><a href="#hiring">Hiring</a></li>
        <li><a href="#total-connections">Connections</a></li>
      </ul>
    </div>
  </nav>
  <div className="row">
    <div className="col s12 m6 l3">
      <div className="card-panel blue lighten-1 white-text center">
        <h5>Employees</h5>
        <h3>NA</h3>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel center">
        <h5>Open Positions</h5>
        <h3>{num_jobs()}</h3>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel blue lighten-1 white-text center">
        <h5>Introductions</h5>
        <h3>{num_intro()}</h3>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel center">
        <h5>Hired</h5>
        <h3>NA</h3>
      </div>
    </div>
  </div>

  <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-content">
              <table className="striped">
                <thead>
                  <tr className = "center">
                    <th>Job</th>
                    <th>Job Description</th>
                    <th>Salary</th>
                    <th>Location</th>
                    <th>Link</th>
                    <th>Introduced</th>

                  </tr>
                </thead>
                <tbody>
                   {current.jobs.map((job) => (
                     <tr key={job.id}>
                       <td> {job.title} </td>
                       <td> {job.description} </td>
                       <td> {job.salary} </td>
                       <td> {job.location} </td>
                       <td> {job.url} </td>
                       <td>
                      <a
                      href="#job-connections"
                      onClick={() => localStorage.setItem('jobid', job.id)}
                      className="secondary-content modal-trigger"
                      >
                     <i className="material-icons grey-text">dehaze</i>
                    </a>
                   </td>
                   </tr>
                   ))}
                </tbody>
              </table>
            </div>
        </div>
        </div>

      </section>
  );
};


Hiring.propTypes = {
  current: PropTypes.object,
  getConnections:PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  connections: state.connections,
  current: state.startup.current
});

export default connect(mapStateToProps, {getConnections})(Hiring);

