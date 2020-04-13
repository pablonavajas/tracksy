import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, HashRouter as Router } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

import { getStartups } from "../../actions/startupsActions";
import { addFinancial } from "../../actions/financialActions";
import JobsTable from "../jobs/JobsTable";
import Preloader from "../layout/Preloader";
import {
  CommentsField,
  DateField,
  CurrencyFormattedField,
  SelectField,
} from "../smallComponents/inputFields";

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
    return (
      <Router>
        <Redirect to="/startupPage" />
      </Router>
    );
  } else {
    return (
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="card-panel white">
            <h4 className="center">Please fill in the montly report</h4>
            <span className="black-text">
              <SelectField
                id="currency"
                value={currency}
                setFunction={setCurrency}
                options={["£", "$", "€"]}
              />

              {/* Revenue */}
              <CurrencyFormattedField
                id="revenue"
                name="Revenue"
                trueValue={revenue}
                currency={currency}
                setFunction={setRevenue}
              />
              <CurrencyFormattedField
                id="cashBalance"
                name="Cash Balance"
                trueValue={cashBalance}
                currency={currency}
                setFunction={setCashBalance}
              />

              <CurrencyFormattedField
                id="monthlyBurn"
                name="Monthly Burn"
                trueValue={monthlyBurn}
                currency={currency}
                setFunction={setMonthlyBurn}
              />

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
              {/* Start Date */}
              <DateField
                id={"startDate"}
                name={"Reporting Period Start Date"}
                startDate={startDate}
                setFunction={setStartDate}
              />
              <DateField
                id={"endDate"}
                name={"Reporting Period End Date"}
                startDate={endDate}
                setFunction={setEndDate}
              />
              <CommentsField
                id="comment"
                name="Comments"
                trueValue={comment}
                setFunction={setComment}
              />
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
                id="startupSubmitButton"
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
