import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

import { getStartups } from "../../actions/startupsActions";
import { addFinancial } from "../../actions/financialActions";
import JobsTable from "../jobs/JobsTable";
import Preloader from "../layout/Preloader";

function StartupForm({ startups, errors, getStartups, addFinancial }) {
  const [comment, setComment] = useState("");
  const [currency, setCurrency] = useState("£");
  const [revenue, setRevenue] = useState("");
  const [cashBalance, setCashBalance] = useState("");
  const [monthlyBurn, setMonthlyBurn] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localErrors, setLocalErrors] = useState(null);

  // runs when the component is rendered for the first time
  useEffect(() => {
    getStartups();
    //esling-disable-next-line
  }, []);

  // runs when startups prop changes, as the startups are loaded
  useEffect(() => {
    resetKpis();
  }, [startups]);

  // reset KPIs to just names and no values
  const resetKpis = () => {
    if (startups) {
      setKpis([...startups[0].kpinames]);
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    // precent default action
    e.preventDefault();

    const newFinancial = {
      comment,
      currency,
      revenue,
      cashBalance,
      monthlyBurn,
      startDate,
      endDate,
      kpis,
    };

    addFinancial(startups[0].id, newFinancial);
    errors.status ? setLocalErrors(true) : setLocalErrors(false);
  };

  if (loading) {
    return <Preloader />;
  } else if (localErrors === false) {
    return <Redirect to="/startupPage" />;
  } else {
    return (
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="card-panel white">
            <h4 className="center">Please fill in the montly report</h4>
            <span className="black-text">
              <div className="input-field col s12">
                <select
                  id="currency"
                  name="currency"
                  value={currency}
                  className="browser-default"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value=" " disabled>
                    Choose your option
                  </option>
                  <option value="£">£</option>
                  <option value=" $ "> $ </option>
                  <option value="€"> € </option>
                </select>
                <label htmlFor="currency" className="active">
                  Currency
                </label>
              </div>
              <div className="input-field col s12">
                <CurrencyFormat
                  id="revenue"
                  value={revenue}
                  thousandSeparator={true}
                  prefix={currency}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { value } = values; // destructuring to get the pure integer value
                    setRevenue(value);
                  }}
                />
                <label htmlFor="revenue">Revenue</label>
              </div>
              {/* Cash Balance */}
              <div className="input-field col s12">
                <CurrencyFormat
                  id="cashBalance"
                  value={cashBalance}
                  thousandSeparator={true}
                  prefix={currency}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { value } = values; // destructuring to get the pure integer value
                    setCashBalance(value);
                  }}
                />
                <label htmlFor="cashBalance">Cash Balance</label>
              </div>
              {/* Monthly Burn */}
              <div className="input-field col s12">
                <CurrencyFormat
                  id="monthlyBurn"
                  value={monthlyBurn}
                  thousandSeparator={true}
                  prefix={currency}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { value } = values; // destructuring to get the pure integer value
                    setMonthlyBurn(value);
                  }}
                />
                <label htmlFor="monthlyBurn">Monthly Burn</label>
              </div>

              {/* LIST OF KPIS */}
              {kpis.map((value, i) => (
                <div className="input-field col s12" key={i}>
                  <input
                    id="monthlyBurn"
                    type="number"
                    name="monthlyBurn"
                    onChange={(e) => {
                      kpis[i].value = e.target.value;
                      // console.log(kpis[i].value);
                    }}
                  />
                  <label htmlFor="monthlyBurn">{kpis[i].name}</label>
                </div>
              ))}
              <div className="input-field col s12">
                <input
                  id="startDate"
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="startDate">Reporting Period Start Date</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="endDate"
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <label htmlFor="endDate">Reporting Period End Date</label>
              </div>
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      id="comment"
                      className="materialize-textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <label htmlFor="comment">Comments</label>
                  </div>
                </div>
              </form>
              <JobsTable />
              {getExtraVerticalSpace()}
              <p className="center">
                Please ensure all details are up to date and correct before
                submitting this form.
              </p>
            </span>
            <p></p>
            <p></p>
            <div className="center">
              <a
                onClick={(e) => onSubmit(e)}
                className="btn waves-effect waves-light light-blue"
              >
                Submit
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const getExtraVerticalSpace = () => (
  <Fragment>
    <div className="row" />
    <div className="row" />
    <div className="row" />
  </Fragment>
);

StartupForm.propTypes = {
  getStartups: PropTypes.func.isRequired,
  addFinancial: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  startups: state.startup.startups,
  errors: state.errors,
});

export default connect(mapStateToProps, { getStartups, addFinancial })(
  StartupForm
);
