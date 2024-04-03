import {ChangeOrder} from '../ChangeOrder';
import React from 'react'

 interface COListProps {
  COList: ChangeOrder[];
 }

 const changeOrderStyle = `changeOrder flex flex-row justify-evenly`;


export default function ChangeOrderList({COList}: COListProps) {

  return (
      <div id="list">
        <h2 id="test">Change Orders:</h2>
        {COList.map(changeOrder => {
          return (<div className={changeOrderStyle}>
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
  );
};
