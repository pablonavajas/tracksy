import React from "react";
// import StartupFormField from "./StartupFormField";

function StartupForm() {
  const fields = [
    {
      id: 1,
      value: "",
      name: "Revenue"
    },
    {
      id: 2,
      value: "",
      name: "LVC"
    },
    {
      id: 3,
      value: "",
      name: "CAC"
    },
    {
      id: 4,
      value: "",
      name: ""
    },
    {
      id: 5,
      name: "",
      value: ""
    }
  ];

  const [list, setList] = React.useState(fields);

  // console.log(JSON.stringify(list));
  return (
    <div className="row">
      <form className="col s12">
        {fields.map((n, i) => (
          <div className="input-field col s12" key={i}>
            <input
              id={i}
              type="number"
              step="0.01"
              className="validate"
              onChange={e => {
                list[i].value = e.target.value;
                setList([...list]);
                // console.log(JSON.stringify(list));
              }}
            />
            <label htmlFor={i} className="active">
              {n.name}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}

export default StartupForm;
