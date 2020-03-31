import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import StartupFormField from "./StartupFormField";
import { getStartups } from "../../actions/startupsActions";

function StartupForm({ getStartups, startups }) {
  useEffect(() => {
    getStartups();
  }, []);

  let startup = {};
  if (startups) {
    startup = startups.pop();
    console.log(startup);
  }

  const [comment, setComment] = useState("");
  const [currency, setCurrency] = useState("");
  const [revenue, setRevenue] = useState("");
  const [cashBalance, setCashBalance] = useState("");
  const [monthlyBurn, setMonthlyBurn] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onSubmit = () => {
    const newFinancial = {
      startupId: startup.id,
      comment,
      currency,
      revenue,
      cashBalance,
      monthlyBurn,
      startDate,
      endDate
    };
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="card-panel white">
          <h4 className="center">Please fill in montly report</h4>
          <span className="black-text">
            <input type="number" step="0.01" className="validate" />I am a very
            simple card. I am good at containing small bits of information. I am
            convenient because I require little markup to use effectively. I am
            similar to what is called a panel in other I am a very simple card.
            I am good at containing small bits of information. I am convenient
            because I require little markup to use effectively. I am similar to
            what is called a panel in other I am a very simple card. I am good
            at containing small bits of information. I am convenient because I
            require little markup to use effectively. I am similar to what is
            called a panel in other I am a very simple card. I am good at
            containing small bits of information. I am convenient because I
            require little markup to use effectively. I am similar to what is
            called a panel in other frameworks.
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  startups: state.startup.startups
});

export default connect(mapStateToProps, { getStartups })(StartupForm);
