"use client"
import ChangeOrderList from "./components/ChangeOrderList"
import ChangeOrderModal from "./components/ChangeOrderModal"
import {ChangeOrder} from './ChangeOrder';
import React, {useState} from 'react';


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


export default function Home() {

  const handleSaveFormData = (formData: any) => {
    changeOrders.push(formData);
  };


  return (
    <div id='app'>
      <ChangeOrderModal onSave={handleSaveFormData} />
      <ChangeOrderList COList={changeOrders}/>
    </div>
  )
}
