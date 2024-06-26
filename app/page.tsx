"use client"
import ChangeOrderList from "./components/ChangeOrderList"
import ChangeOrderModal from "./components/ChangeOrderModal"
import {ChangeOrder} from './ChangeOrder';
import React, {useState} from 'react';
import './globals.css'


const statusOptions: string[] = ["New", "Technical Review", "Stakeholder Review", "CAB Approval", 'Scheduled', 'Implement', 'Implementation Complete', 'Implementation Failed', 'Canceled'];

const testInstance: ChangeOrder = {
  malcode: 'FUCK',
  environment: 'PROD',
  risk: 'Low',
  description: 'Stupid fucking bullshit',
  mesProvided: true,
  start: new Date(2024, 6, 2, 0, 0),
  end: new Date(2024, 6, 2, 7, 0),
  chg: 'CHG1276486',
  status: 'New',
  notes: 'these are my fucking notes!!!!'
}


export default function Home() {

  const [changeOrders, setChangeOrders] = useState<ChangeOrder[]>([testInstance]);


  const handleSaveFormData = (formData: ChangeOrder) => {
    //changeOrders.push(formData);
    setChangeOrders(prevArray => [...prevArray, formData]);
  };

  //delete will pass through the CHG (which is a unique identifier) of the object that is to be deleted, 
  //it will then use filter to basically create a new array from the filtered current array, which then overwrites
  //the current array.
  const handleDeleteFormData = (CHG: string) => {
    let newArray = changeOrders.filter(obj => {
      return obj.chg !== CHG;
    })
    setChangeOrders(newArray);
    console.log(newArray);
  }

  const getCHGObject = (CHG: string): ChangeOrder => {
    const found = changeOrders.find((CO: ChangeOrder) => CO.chg === CHG);
    if (!found) {
      throw new Error(`No ChangeOrder found with CHG: ${CHG}`)
    } 
    return found;
    
  }

  const handleEditFormData = (formData: ChangeOrder) => {
    setChangeOrders(prevArray => {
      return prevArray.map(co => {
        if (co.chg === formData.chg) {
          co = formData;
        }
        return co;
      });
    });
  }

  const changeStatus = (CHG: string, direction: string) => {

    setChangeOrders((prevChangeOrders) => {
      const index = prevChangeOrders.findIndex((changeOrder) => changeOrder.chg === CHG);
      if (index === -1) return prevChangeOrders;

      const updatedChangeOrder = {
        ...prevChangeOrders[index],
        status: direction === 'prev' ? statusOptions[(statusOptions.indexOf(prevChangeOrders[index].status) - 1 + statusOptions.length) % statusOptions.length]
                                     : statusOptions[(statusOptions.indexOf(prevChangeOrders[index].status) + 1) % statusOptions.length], 
      };
      
      return [
        ...prevChangeOrders.slice(0, index),
        updatedChangeOrder,
        ...prevChangeOrders.slice(index + 1),
      ];
    });
  };

  const changeMESProvided = (CHG: string) => {
    setChangeOrders(prevArray => {
      return prevArray.map(co => {
        if (co.chg === CHG) {
          co = {
            ...co,
            mesProvided: !co.mesProvided
          }
        }
        return co;
      });
    });
  }

  const checkForUniqueCHG = (CHG : string): boolean => {
    
    return changeOrders.some((CO: ChangeOrder) => CO.chg === CHG)    

  }

  return (
    <div id='app'>
      <ChangeOrderModal onSave={handleSaveFormData} checkUnique={checkForUniqueCHG} />
      <ChangeOrderList 
      COList={changeOrders} 
      onDelete={handleDeleteFormData} 
      onEdit={handleEditFormData}
      getCHGObject={getCHGObject}
      changeStatus={changeStatus}
      changeMESProvided={changeMESProvided}
      />
    </div>
  )
}
