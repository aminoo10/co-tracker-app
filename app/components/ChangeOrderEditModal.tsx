import React, { useState, useEffect, useRef } from "react";
import { ChangeOrder } from "../ChangeOrder";
import {
  ENVIRONMENT_OPTIONS,
  INPUT_STYLE,
  LABEL_STYLE,
  MODAL_STYLE,
  OVERLAY_STYLE,
  RISK_OPTIONS,
  OPEN_MODAL,
  CLOSE_MODAL,
  DATE_TO_FORMATTED_STRING,
} from "../constants";

interface ChangeOrderEditModalProps {
  modalOpen: boolean;
  close: () => void;
  onEdit: (coData : ChangeOrder) => void;
  editChg: ChangeOrder | undefined;
}

export default function ChangeOrderEditModal({
  modalOpen,
  editChg,
  close,
  onEdit,
}: ChangeOrderEditModalProps) {
  const editModal = useRef<HTMLDivElement>(null);

  
  const [modalState, setModalState] = useState(modalOpen);
  const [coData, setCoData] = useState<ChangeOrder | undefined>({
    malcode: editChg?.malcode as string,
    environment: editChg?.environment as 'PROD' | 'PAT',
    risk: editChg?.risk as "Low" | "Moderate" | "High" | "Very High",
    description: editChg?.description as string,
    mesProvided: editChg?.mesProvided as boolean,
    start: editChg?.start as Date,
    end: editChg?.end as Date,
    chg: editChg?.chg as string,
    notes: editChg?.notes as string,
  });


  const closeModal = () => {
    setCoData(undefined);
    CLOSE_MODAL(editModal, modalState, close); //this is kinda fucked up to do it like this.... but whatever :P
  };



  useEffect(() => {
    setModalState(modalOpen);
    if (modalOpen) OPEN_MODAL(editModal);
    else close();

    if (editChg) setCoData(editChg);
    
    // const checkboxElement = document.getElementById('mesProvided') as HTMLSelectElement
    // console.log(checkboxElement.value);
}, [modalOpen, editChg]);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean | Date = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
      console.log(newValue);
    } 
    else if (type === "datetime-local") newValue = new Date(value);
    else if (type === "textarea") newValue = value;

    setCoData((prevCoData) => ({
      ...(prevCoData as ChangeOrder),
      [name]: newValue,
    }));
  };

  const handleEdit = () => {
    if (coData) onEdit(coData);
    closeModal();
  };

  return (
    <div>
      {/* https://tailwindcomponents.com/component/animation-modal*/}

      {/* overlay */}

      <div
        id="modal_overlay"
        className={`${modalOpen ? "" : "hidden"} ${OVERLAY_STYLE}`}
      >
        {/* modal */}
        <div ref={editModal} className={MODAL_STYLE}>
          {/* header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-600">
              Edit Change Order Entry
            </h2>
          </div>

          {/* body */}
          <div className="w-full p-3">
            <label htmlFor="environment" className={LABEL_STYLE}>
              Environment
              <select
                name="environment"
                id="environment"
                className={INPUT_STYLE}
                value={coData?.environment || ""} //i dont know why...
                onChange={handleChange}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {ENVIRONMENT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="risk" className={LABEL_STYLE}>
              Risk
              <select 
                name="risk" 
                id="risk" 
                className={INPUT_STYLE} 
                value={coData?.risk || ""} //IT FUCKING WORKS!!!!!?!!!
                onChange={handleChange}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {RISK_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="malcode" className={LABEL_STYLE}>
              MAL Code
              <input
                type="text"
                name="malcode"
                placeholder="Project MAL code"
                className={INPUT_STYLE}
                defaultValue={coData?.malcode}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="description" className={LABEL_STYLE}>
              Description
              <input
                type="text"
                name="description"
                placeholder="What is this change?"
                className={INPUT_STYLE}
                defaultValue={coData?.description}
                onChange={handleChange}

              />
            </label>

            <label className={LABEL_STYLE}>
              Start Time:
              <input
                className={INPUT_STYLE}
                type="datetime-local"
                name="start"
                placeholder="Start time"
                defaultValue={DATE_TO_FORMATTED_STRING(coData?.start || new Date())} //make method that converts date into string.
                onChange={handleChange}

              />
            </label>

            <label className={LABEL_STYLE}>
              End Time:
              <input
                className={INPUT_STYLE}
                type="datetime-local"
                name="end"
                placeholder="End time"
                defaultValue={DATE_TO_FORMATTED_STRING(coData?.end || new Date())}
                onChange={handleChange}

              />
            </label>

            <label htmlFor="chg" className={LABEL_STYLE}>
              Change Order Number
              <input
                type="text"
                name="chg"
                placeholder="What is the CO#?"
                className={INPUT_STYLE}
                disabled
                defaultValue={coData?.chg}
                onChange={handleChange}

              />
            </label>

            <label htmlFor="mesProvided" className={LABEL_STYLE}>
              MES?
              <input
                type="checkbox"
                name="mesProvided"
                id="mesProvided"
                className="w-4 h-4 mt-2 ml-2 text-blue-600 bg-gray-100 border-gray-300 
                 rounded focus:ring-blue-500 focus:ring-2"
                 checked={coData?.mesProvided}
                 onChange={handleChange}
 
              />
            </label>

            <label htmlFor="notes" className={LABEL_STYLE}>
              Notes
            </label>
            <textarea
              name="notes"
              placeholder="Write any notes or comments for this change here..."
              rows={4}
              className="block p-2.5 shadow appearance-none border rounded-lg w-full text-gray-700 focus:outline-none focus:shadow-outline focus:ring-2 font-normal resize"
              defaultValue={coData?.notes}
              onChange={handleChange}

            />
          </div>

          {/* footer */}

          <div className="px-4 py-3 border-t border-gray-200 flex justify-around">
            <button
              className=" focus:outline-none bg-green-500 p-3 w-1/3 rounded-lg text-white hover:bg-green-400"
              onClick={handleEdit}
            >
              Confirm
            </button>
            <button
              className=" focus:outline-none modal-close bg-red-500 w-1/3 p-3 rounded-lg text-white hover:bg-red-700"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
