import React from "react";
var moment = require("moment");

function FinancialItem({ financial }) {
  return (
    <tr>
      <td>
        <div className="chip center">
          {moment(financial.startDate).format("DD/MM/YYYY")}
        </div>
      </td>
      <td>
        <div className="chip center">
          {moment(financial.endDate).format("DD/MM/YYYY")}
        </div>
      </td>
      <td>
        <div className="chip center">
          {financial.currency} {financial.revenue}
        </div>
      </td>
      <td>
        <div className="chip center">{financial.cashBalance}</div>
      </td>
      <td>
        <div className="chip center">{financial.monthlyBurn}</div>
      </td>
      <td>
        {financial.kpis.map(kpi => {
          return (
            <div>
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

export default FinancialItem;
