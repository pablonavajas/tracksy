import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import StartupFormField from "./StartupFormField";
import { getStartups, setCurrent } from "../../actions/startupsActions";
import CurrencyFormat from "react-currency-format";
import { addFinancial } from "../../actions/financialActions";
import PropTypes from "prop-types";

function StartupForm({ getStartups, addFinancial, startups }) {
  const [startup, setStartup] = useState(null);
  const [comment, setComment] = useState("");
  const [currency, setCurrency] = useState("£");
  const [revenue, setRevenue] = useState("");
  const [cashBalance, setCashBalance] = useState("");
  const [monthlyBurn, setMonthlyBurn] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [kpis, setKpis] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // runs when the component is rendered for the first time
  useEffect(() => {
    console.log("useEffect for getStartups is called");
    getStartups();
    //esling-disable-next-line
  }, []);

  // runs when startups prop changes, as the startups are loaded
  useEffect(() => {
    console.log("useEffect for startups is called");
    resetKpis();
  }, [startups]);

  // reset KPIs to just names and no values
  const resetKpis = () => {
    console.log("resetKpis is called");
    if (startups) {
      setKpis([...startups[0].kpinames]);
      setLoading(false);
    }
  };

  const onSubmit = e => {
    // TODO:
    // e.preventDefault();
    // prevent Default action
    // and make a redirect to
    // the report history page
    // when the errors are equal to null

    const newFinancial = {
      comment: comment,
      currency: currency,
      revenue: revenue,
      cashBalance: cashBalance,
      monthlyBurn: monthlyBurn,
      startDate: startDate,
      endDate: endDate,
      kpis: kpis
    };
    console.log(newFinancial);

    addFinancial(startups[0].id, newFinancial);
    setSubmitted(true);
  };

  if (!loading) {
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
                  onChange={e => setCurrency(e.target.value)}
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
                  onValueChange={values => {
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
                  onValueChange={values => {
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
                  onValueChange={values => {
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
                    onChange={e => {
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
                  onChange={e => setStartDate(e.target.value)}
                />
                <label htmlFor="startDate">Reporting Period Start Date</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="endDate"
                  type="date"
                  onChange={e => setEndDate(e.target.value)}
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
                      onChange={e => setComment(e.target.value)}
                    ></textarea>
                    <label htmlFor="comment">Comments</label>
                  </div>
                </div>
              </form>
              <p className="center">
                Please ensure all details are up to date and correct before
                submitting this form.
              </p>
            </span>
            <p></p>
            <p></p>
            <div className="center">
              <a
                href="/#/startupPage"
                onClick={onSubmit}
                className="btn waves-effect waves-light light-blue"
              >
                Submit
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    );
  }
}

StartupForm.propTypes = {
  getStartups: PropTypes.func.isRequired,
  addFinancial: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  startups: state.startup.startups
});

export default connect(mapStateToProps, { getStartups, addFinancial })(
  StartupForm
);
