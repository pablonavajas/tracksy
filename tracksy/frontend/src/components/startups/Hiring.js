import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateStartup } from "../../actions/startupsActions";
import { getConnections} from  '../../actions/connectionsActions';
//import moment from "moment/src/moment";
//var moment = require("moment");
import CurrencyFormat from "react-currency-format";

const Hiring = ({ current, connections, updateStartup, getConnections }) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [ownership, setOwnership] = useState("");
  const [currency, setCurrency] = useState("");
  const [board, setBoard] = useState("");
  const [investment_1, setInvestment_1] = useState("");
  const [type_1, setType_1] = useState("");
  const [date_closed_1, setDate_1] = useState("");
  const [investment_2, setInvestment_2] = useState("");
  const [type_2, setType_2] = useState("");
  const [date_closed_2, setDate_2] = useState("");
  const [cash_balance, setCashBalance] = useState("");
  const [monthly_burn, setMonthlyBurn] = useState("");

  useEffect(() => {
    getConnections();
    console.log("connections:::")
    console.log(connections)
    if (connections) {
      console.log("CONNECTIONS INSIDE USEEFFECT")
      console.log(connections)
      setName(connections[0].name);
    }
    if (current) {
      
      setWebsite(current.website);
      setOwnership(current.ownership);
      setCurrency(current.currency);
      setBoard(current.board);
      setInvestment_1(current.investment_1);
      setDate_1(current.date_closed_1);
      setType_1(current.type_1);
      setInvestment_2(current.investment_2);
      setDate_2(current.date_closed_2);
      setType_2(current.type_2);
      setCashBalance(current.cash_balance);
      setMonthlyBurn(current.monthly_burn);
    }
  }, [connections, current]);

  const runway = (cash_balance, monthly_burn) => {
    const result = cash_balance / monthly_burn;
    return result
  }

  return (
  // Section: Stats
  
  <section className="section section-stats center">
    <nav>
    <div className="nav-wrapper blue darken-4">
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><a href="#startup-overview">Overview</a></li>
        <li className="active"><a href="#hiring">Hiring</a></li>
        <li><a href="#business-development">Business Development</a></li>
        <li><a href="#fundraising">Fundraising</a></li>
      </ul>
    </div>
  </nav>
  <div className="row">
    <div className="col s12 m6 l3">
      <div className="card-panel blue lighten-1 white-text center">
        <h5>Employees</h5>
        <h3>{name}</h3>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel center">
        <h5>Open Positions</h5>
        <h3>{}</h3>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel blue lighten-1 white-text center">
        <h5>Introductions</h5>
        <h3>{}</h3>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel center">
        <h5>Hired</h5>
        <h3>{}</h3>
      </div>
    </div>
  </div>
      </section>
  );
};


Hiring.propTypes = {
  current: PropTypes.object,
  updateStartup: PropTypes.func.isRequired,
  getConnections:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  connections: state.connections,
  current: state.startup.current
});

export default connect(mapStateToProps, { updateStartup, getConnections })(Hiring);
