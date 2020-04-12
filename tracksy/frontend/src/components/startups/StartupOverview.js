import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Line } from 'react-chartjs-2';

const StartupOverview = ({ current}) => {
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
  const [cashBalance, setCashBalance] = useState("");
  const [monthlyBurn, setMonthlyBurn] = useState("");

  
  const latest_date = () => {
    const date = current.financials[0].endDate;
    for(let item of current.financials){
      if (item.endDate > date) {
        date = item.endDate
    }
    }
    return date
  }

  var theChartData = () => {
    var list_data = []
    var list_date = []
    var final_dates = []
    var final_data = []
    
    for(let item of current.financials){
      list_data.push(item.revenue)
      list_date.push(item.startDate)
    }
    
    while (list_date.length > 0) {
      var latest_date = list_date[0];
      var index = 0;
      var count = 0;
      for (let x of list_date) {
        if (x < latest_date) {
          latest_date = x
          index = count
        }
        count = count + 1
      }
      final_dates.push(latest_date)
      list_date.splice(index, 1);
      final_data.push(list_data[index])
      list_data.splice(index, 1);
    }

    return [final_dates, final_data]
  }

  const indexc = () => {
    var count = 0;
    var the_index = 0
    var date = current.financials[0].endDate;
      for(let item of current.financials){
        if (item.endDate > date) {
          date = item.endDate;
          the_index = count;
      }
      count = count + 1;
      }
      return the_index
  }

  var index = indexc();

  useEffect(() => {
    if (current) {
      setName(current.name);
      setWebsite(current.website);
      setOwnership(current.ownership);
      setBoard(current.board);
      setCurrency(current.financials[index].currency);
      setCashBalance(current.financials[index].cashBalance);
      setMonthlyBurn(current.financials[index].monthlyBurn);
      setInvestment_1(current.investment_1);
      setDate_1(current.date_closed_1);
      setType_1(current.type_1);
      setInvestment_2(current.investment_2);
      setDate_2(current.date_closed_2);
      setType_2(current.type_2);
    }
  }, [current]);

  var chartdates = theChartData()[0]
  var chartvalues = theChartData()[1]

  const chartData = {
    labels: chartdates,
    datasets: [
      {
        label: 'Monthly Revenue',
        data:  chartvalues,
        backgroundColor: [
          'rgba(93, 165, 239, 0.6)',
        ]
      }
    ],
  };

  const runway = (cashBalance, monthlyBurn) => {
    const result = cashBalance / monthlyBurn;
    return result
  }


  return (
  // Section: Stats
  <section className="section section-stats center">
      <nav>
    <div className="nav-wrapper blue-grey darken-4">
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li className="active"><a href="#startup-overview">Overview</a></li>
        <li><a href="#hiring">Hiring</a></li>
        <li><a href="#total-connections">Connections</a></li>
      </ul>
    </div>
  </nav>
  <div className="row">
    <div className="col s12 m6 l3">
      <div className="card-panel blue lighten-1 white-text center">
        <h5>{name.charAt(0).toUpperCase() + name.slice(1)}</h5>
        <h5>{latest_date()}</h5>
        <h5>{currency}</h5>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel center">
        <h5>Cash Balance</h5>
        <h3>{cashBalance}</h3>
        {/* <h3>{latest_date()}</h3> */}
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel blue lighten-1 white-text center">
        <h5>Monthly Burn</h5>
        <h3>{monthlyBurn}</h3>
      </div>
    </div>
    <div className="col s12 m6 l3">
      <div className="card-panel center">
        <h5>Runway</h5>
        <h3>{String(runway(cashBalance, monthlyBurn))}</h3>
      </div>
    </div>
  </div>

  <div className="col s12 m6 l4">
    <div className="chart">
      <div className="card-content">
      <Line
      data={chartData}
      height={100}
      options={{
        title: {
        display: true,
        text:'Monthly Revenue',
        fontSize: 25
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          display: true,
          fontColor:'#000'
        }
      }
    }}
      />
      </div>
    </div>
  </div>

  <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-content">
              <table className="striped">
                <thead>
                  <tr className = "center">
                    <th>KPI</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                   {current.financials[index].kpis.map((kpi) => (
                     <tr key={kpi.id}>
                       <td> {kpi.name} </td>
                       <td> {kpi.value} </td>
                   </tr>
                   ))}
                </tbody>
              </table>
            </div>
        </div>
        </div>

        <div className="col s12 m6 l4">
          <div className="card">
            <div className="card-content">
              <table className="striped">
                <thead>
                  <tr>
                    <th>Investments</th>
                    <th>Investment Date</th>
                    <th>Investment Amount</th>
                  </tr>
                </thead>
                <tbody>
                   {current.investments.map((investment) => (
                     <tr key={investment.id}>
                       <td>{investment.id}</td>
                       <td> {investment.date} </td>
                       <td> {investment.value} </td>
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


StartupOverview.propTypes = {
  current: PropTypes.object,
};

const mapStateToProps = state => ({
  current: state.startup.current
});

export default connect(mapStateToProps)(StartupOverview);
