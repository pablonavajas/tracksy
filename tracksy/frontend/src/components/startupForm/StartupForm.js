import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import StartupFormField from "./StartupFormField";
import { getStartups, setCurrent } from "../../actions/startupsActions";
import CurrencyFormat from "react-currency-format";
import { addFinancial } from "../../actions/financialActions";

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

  useEffect(() => {
    getStartups();
  }, []);

  // reset KPIs to just names and no values
  const resetKpis = () => {
    setKpis([]);
    startup.kpinames.map(kpiname => {
      kpis.push({
        name: kpiname.name,
        value: ""
      });
      setKpis([...kpis]);
    });
  };

  useEffect(() => {
    if (startups) setStartup(startups[0]);
    if (startup) resetKpis();
  }, [startups, startup]);

  const onSubmit = () => {
    const newFinancial = {
      startupId: startup.id,
      comment: comment,
      currency: currency,
      revenue: revenue,
      cashBalance: cashBalance,
      monthlyBurn: monthlyBurn,
      startDate: startDate,
      endDate: endDate,
      kpis: kpis
    };

    addFinancial(newFinancial);
    setSubmitted(true);
  };

  if (!submitted) {
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
                onClick={onSubmit}
                className="waves-effect blue waves-light btn-flat"
              >
                Submit
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h4>Thank you for your submission</h4>;
  }
}

const mapStateToProps = state => ({
  startups: state.startup.startups
});

export default connect(mapStateToProps, { getStartups, addFinancial })(
  StartupForm
);
