"use client";
import ChangeOrderList from "./components/ChangeOrderList";
import ChangeOrderModal from "./components/ChangeOrderModal";
import { ChangeOrder } from "./ChangeOrder";
import { SortObject } from "./SortObject";
import React, { useState, useEffect } from "react";
import "./globals.css";

const statusOptions: string[] = [
  "New",
  "Technical Review",
  "Stakeholder Review",
  "CAB Approval",
  "Scheduled",
  "Implement",
  "Implementation Complete",
  "Implementation Failed",
  "Canceled",
];

// const testInstance: ChangeOrder = {
//   malcode: "FUCK",
//   environment: "PROD",
//   risk: "High",
//   description: "Stupid fucking bullshit",
//   mesProvided: true,
//   start: new Date(2024, 6, 2, 0, 0),
//   end: new Date(2024, 6, 2, 7, 0),
//   chg: "CHG1276486",
//   status: "Implementation Complete",
//   notes: "these are my fucking notes!!!!",
// };

// const testInstance2: ChangeOrder = {
//   malcode: "SHIT",
//   environment: "PAT",
//   risk: "Low",
//   description: "Dumb Idiot Piss",
//   mesProvided: false,
//   start: new Date(2024, 7, 8, 10, 0),
//   end: new Date(2024, 7, 13, 17, 30),
//   chg: "CHG1276487",
//   status: "New",
//   notes: "THE SECOND ONE!!!!!!!",
// };


export default function Home() {
  //the big list (always keep this around)

  const [COList, setCOList] = useState<ChangeOrder[]>([]);
  const [changeOrders, setChangeOrders] = useState<ChangeOrder[]>(COList);
  const [sortState, setSortState] = useState<SortObject>(
    new SortObject("chg", true)
  );

  const [displayState, setDisplayState] = useState<string>("all");

  const sortBy = (COs: ChangeOrder[], sort: keyof ChangeOrder) => {
    const newSortDirection =
      sort === sortState.sortType ? !sortState.sortDirection : true;
    setSortState(new SortObject(sort, newSortDirection));

    COs.sort((a, b) => {
      //true for asc false for desc
      if (typeof a[sort] === "string") {
        return newSortDirection
          ? (a[sort] as string).localeCompare(b[sort] as string)
          : (b[sort] as string).localeCompare(a[sort] as string);
      } else if (typeof a[sort] === "boolean") {
        return newSortDirection
          ? Number(a[sort]) - Number(b[sort])
          : Number(b[sort]) - Number(a[sort]);
      } else if (Object.prototype.toString.call(a[sort]) === "[object Date]") {
        return newSortDirection
          ? (a[sort] as Date).getTime() - (b[sort] as Date).getTime()
          : (b[sort] as Date).getTime() - (a[sort] as Date).getTime();
      } else return 0;
    });
  };

  const handleSaveFormData = (formData: ChangeOrder) => {
    //update main list
    setCOList((prevArray) => [...prevArray, formData]);
    // localStorage.setItem("COList", JSON.stringify(COList));

    //update display list
    // setChangeOrders((prevArray) => [...prevArray]);

  };

  //delete will pass through the CHG (which is a unique identifier) of the object that is to be deleted,
  //it will then use filter to basically create a new array from the filtered current array, which then overwrites
  //the current array.

  const handleDeleteFormData = (CHG: string) => {
    //update main list//
    setCOList((prevArray) => {
      return prevArray.filter((obj) => {
        return obj.chg !== CHG;
      });
    });

    //update display list//
    // setChangeOrders(COList);

    //update local storage//
    //localStorage.setItem("COList", JSON.stringify(COList));

  };

  const getCHGObject = (CHG: string): ChangeOrder => {
    const found = changeOrders.find((CO: ChangeOrder) => CO.chg === CHG);
    if (!found) {
      throw new Error(`No ChangeOrder found with CHG: ${CHG}`);
    }
    return found;
  };

  const handleEditFormData = (formData: ChangeOrder) => {
    //update main list//
    const newList: ChangeOrder[] = COList.map((co) => {
      if (co.chg === formData.chg) {
        co = formData;
      }
      return co;
    });
    setCOList(newList);
    // localStorage.setItem("COList", JSON.stringify(COList));
    //i dont really like doing it like this where I am sorting it tiwce, maybe figure out a better implementation down the line...

    //update display list//
    // setChangeOrders((prevArray) => {
    //   return prevArray.map((co) => {
    //     if (co.chg === formData.chg) {
    //       co = formData;
    //     }
    //     return co;
    //   });
    // });
  };

  const changeStatus = (CHG: string, direction: string) => {
    //update main list//

    const index = COList.findIndex((changeOrder) => changeOrder.chg === CHG);

    const updatedChangeOrder = {
      ...COList[index],
      status:
        direction === "prev"
          ? statusOptions[
              (statusOptions.indexOf(COList[index].status) -
                1 +
                statusOptions.length) %
                statusOptions.length
            ]
          : statusOptions[
              (statusOptions.indexOf(COList[index].status) + 1) %
                statusOptions.length
            ],
    };

    // COList =
    //   index === -1
    //     ? COList
    //     : [
    //         ...COList.slice(0, index),
    //         updatedChangeOrder,
    //         ...COList.slice(index + 1),
    //       ];

    setCOList(
    index === -1
      ? COList
      : [
          ...COList.slice(0, index),
          updatedChangeOrder,
          ...COList.slice(index + 1),
        ]);

          
    //localStorage.setItem("COList", JSON.stringify(COList));

    
    //update currently displayed list//
  };

  /* not using this function */
  const changeMESProvided = (CHG: string) => {
    setChangeOrders((prevArray) => {
      return prevArray.map((co) => {
        if (co.chg === CHG) {
          co = {
            ...co,
            mesProvided: !co.mesProvided,
          };
        }
        return co;
      });
    });
  };

  const checkForUniqueCHG = (CHG: string): boolean => {
    return COList.some((CO: ChangeOrder) => CO.chg === CHG);
  };

  const applyDisplayFilter = (() => {
    if (displayState === "all") {
      setChangeOrders(COList);
    } else if (displayState === "in-progress") {
      setChangeOrders(
        COList.filter((obj) => {
          return (
            obj.status !== "Implementation Complete" &&
            obj.status !== "Implementation Failed" &&
            obj.status !== "Canceled"
          );
        })
      );
    } else {
      setChangeOrders(
        COList.filter((obj) => {
          return (
            obj.status === "Implementation Complete" ||
            obj.status === "Implementation Failed" ||
            obj.status === "Canceled"
          );
        })
      );
    }

  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setDisplayState(value);
  };

  useEffect(() => {
    applyDisplayFilter();
  }, [displayState]);

  //default load data if localstorage exists
  useEffect(() => {

    const storedData = localStorage.getItem("COList");
    

    if (storedData && JSON.parse(storedData).length > 0) {
      setCOList(JSON.parse(storedData));
      setChangeOrders(COList);
    } else {
      localStorage.setItem("COList", JSON.stringify(COList));
    }

    
  }, []);

/* 
  proposed use of this useEffect:
    - make 'COList' into a varaible whose state can be tracked when changed
    - this useEffect will be dependant on 'COList'
    - whenever COList updates, instead of updating the currently display list at that moment, just run the applyDisplayFilter();
 function, which will display the list with the proper items at that moment. */
  useEffect(() => {
    setChangeOrders(COList);
    applyDisplayFilter();
    localStorage.setItem("COList", JSON.stringify(COList));
  }, [COList]) 



  return (
    <div id="app">
      <ChangeOrderModal
        onSave={handleSaveFormData}
        checkUnique={checkForUniqueCHG}
      />

      <div id="list-display" className="ml-4 bg-[#D9D9D9] p-1 w-max">
        <label htmlFor="display" className="">
          Display:
          <select
            name="display"
            id="display"
            className="text-center ml-3"
            onChange={handleChange}
            value={displayState}
          >
            <option value="all" defaultChecked>
              All
            </option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <ChangeOrderList
        COList={changeOrders}
        onDelete={handleDeleteFormData}
        onEdit={handleEditFormData}
        getCHGObject={getCHGObject}
        changeStatus={changeStatus}
        changeMESProvided={changeMESProvided}
        sortList={sortBy}
        sortState={sortState}
      />
    </div>
  );
}
