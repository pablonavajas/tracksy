import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getConnections} from  '../../actions/connectionsActions';


const JobConnections = ({ current, connections, getConnections }) => {
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");

    var jobid = localStorage.getItem('jobid');

    const index = () => {
        var i = 0;
        var r = 0;
        for(let item of current.jobs){
            if (item.id == jobid) {
              r = i;
          }
          i = i + 1
          }
        return r
    }

    const i = index();

  useEffect(() => {
    getConnections();
    
    if (connections) {  
      setName(connections[0].name);
    }

    if (current) {
      setWebsite(current.website);
    }
  }, [connections, current]);


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
  
  <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-content">
              <table className="striped">
                <thead>
                  <tr className = "center">
                    <th>Name</th>
                    <th>Description</th>
                    <th>URL</th>
                    <th>Introduced</th>
                  </tr>
                </thead>
                <tbody>
                   {current.jobs[i].introductions.map((connected) => (
                     <tr key={connected.id}>
                       <td> {connected.connection.name} </td>
                       <td> {connected.connection.description} </td>
                       <td> {connected.connection.url} </td>
                       <td> Yes </td>
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


JobConnections.propTypes = {
  current: PropTypes.object,
  getConnections:PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  connections: state.connections,
  current: state.startup.current
});

export default connect(mapStateToProps, { getConnections })(JobConnections);
