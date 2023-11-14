import React from 'react'

type Environment = "PROD" | "PAT";
type Risk = "Low" | "Moderate" | "High" | "Very High";

interface ChangeOrder {
  malcode: string;
  environment: Environment;
  risk : Risk;
  description: string;
  mesProvided: boolean;
  start: Date;
  end: Date;
  chg: string;
  notes: string;
}

const changeOrders : ChangeOrder[] = [];

const testInstance: ChangeOrder = {
  malcode: '',
  environment: 'PROD',
  risk: 'High',
  description: 'Stupid fucking bullshit',
  mesProvided: true,
  start: new Date(2023, 10, 7, 0, 0),
  end: new Date(2023, 10, 7, 7, 0),
  chg: 'CHG1276486',
  notes: "blah blah blah who fucking cares!!!!"
}

changeOrders.push(testInstance);


export default function ChangeOrderList() {

  return (
      <div id="list">

        <h2 id="test">Change Orders:</h2>
        {changeOrders.map(changeOrder => {
          return (<div className="changeOrder">
          <p>{changeOrder.malcode}</p>
          <p>{changeOrder.environment}</p>
          <p>{changeOrder.risk}</p>
          <p>{changeOrder.description}</p>
          <p>{(changeOrder.mesProvided) ? "True" : "False"}</p>
          <p>{changeOrder.start.toLocaleString()}</p>
          <p>{changeOrder.end.toLocaleString()}</p>
          <p>{changeOrder.chg}</p>
          <p>{changeOrder.notes}</p>
        </div>
        )})}

      </div>
  )
}
