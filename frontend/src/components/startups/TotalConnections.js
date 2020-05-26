import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getConnections} from  '../../actions/connectionsActions';


const TotalConnections = ({ current, connections, getConnections }) => {
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");

    useEffect(() => {
    getConnections();
  }, [connections, current]);

  if (connections === null) {
    return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    );
  }

  return (
  // Section: Stats
  
  <section className="section section-stats center">
    <nav>
    <div className="nav-wrapper blue-grey darken-4">
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><a href="#startup-overview">Overview</a></li>
        <li><a href="#hiring">Hiring</a></li>
        <li className="active"><a href="#total-connections">Connections</a></li>
      </ul>
    </div>
  </nav>
  
  <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-content">
              <table className="striped">
                <thead>
                  <tr className = "center">
                    <th>Name</th>
                    <th>Description</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>
                   {connections.map((c) => (
                     <tr key={c.id}>
                       <td> {c.name} </td>
                       <td> {c.description} </td>
                       <td> {c.url} </td>
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


TotalConnections.propTypes = {
  current: PropTypes.object,
  getConnections:PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  connections: state.connections,
  current: state.startup.current
});

export default connect(mapStateToProps, { getConnections })(TotalConnections);
