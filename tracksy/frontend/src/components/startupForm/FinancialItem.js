import React from "react";
import CurrencyFormat from "react-currency-format";
var moment = require("moment");

function FinancialItem({ financial }) {
  const {
    startDate,
    endDate,
    revenue,
    currency,
    cashBalance,
    monthlyBurn,
    kpis,
  } = financial;

  return (
    <tr>
      <td>{dateFormatChip(startDate)}</td>
      <td>{dateFormatChip(endDate)}</td>
      <td>{financialFormatChip(currency, revenue)}</td>
      <td>{financialFormatChip(currency, cashBalance)}</td>
      <td>{financialFormatChip(currency, monthlyBurn)}</td>
      <td>
        {kpis.map((kpi, i) => {
          return (
            <div key={i}>
              <div className="chip center">
                {kpi.name}: {kpi.value}
              </div>
            </div>
          );
        })}
      </td>
    </tr>
  );
}

const financialFormatChip = (currency, value) => (
  <div className="chip center">
    <CurrencyFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={currency}
    />
  </div>
);
const dateFormatChip = (date) => (
  <div className="chip center">{moment(date).format("DD/MM/YYYY")}</div>
);

export default FinancialItem;
