import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateStartup } from "../../actions/startupsActions";
//import moment from "moment/src/moment";
//var moment = require("moment");
import CurrencyFormat from "react-currency-format";

const StartupOverview = ({ current, updateStartup }) => {
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
    if (current) {
      setName(current.name);
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
  }, [current]);

  const runway = (cash_balance, monthly_burn) => {
    const result = cash_balance / monthly_burn;
    return result
  }



  return (
  // Section: Stats
  <section className="section section-stats center">
  <div className="row">
    <div className="col s12 m6 l3">
      <div className="card-panel blue lighten-1 white-text center">
        <h3 className="text-bold">{name}</h3>
        <h5>{currency}</h5>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel center">
        <h5>Cash Balance</h5>
        <h3>{cash_balance}</h3>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel blue lighten-1 white-text center">
        <h5>Monthly Burn</h5>
        <h3>{monthly_burn}</h3>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel center">
        <h5>Runway</h5>
        <h3>{runway(cash_balance, monthly_burn)}</h3>
      </div>
    </div>
  </div>
      
      <div className="row">
        <div className="col s12 m6 l8">
           <div className="card-panel">
              {/* <div id="chartContainer" style="height: 300px; width: 100%;"></div> */}
          </div>
        </div>

      <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-content">
              <table className="striped">
                <thead>
                  <tr>
                    <th>Metrics</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Revenue Growth (monthly average)</td>
                    <td>23%</td>
                  </tr>
                  <tr>
                    <td>Active Users</td>
                    <td>28,300</td>
                  </tr>
                  <tr>
                    <td>LTV</td>
                    <td>24.30</td>
                  </tr>
                  <tr>
                    <td>CAC</td>
                    <td>5.80</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </section>
  );
};


StartupOverview.propTypes = {
  current: PropTypes.object,
  updateStartup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.startup.current
});

export default connect(mapStateToProps, { updateStartup })(StartupOverview);
