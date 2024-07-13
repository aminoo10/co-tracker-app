import React, { useState, useEffect, useRef } from "react";
import { ChangeOrder } from "../ChangeOrder";
import {
  MODAL_STYLE,
  OVERLAY_STYLE,
  LABEL_STYLE,
  INPUT_STYLE,
  ENVIRONMENT_OPTIONS,
  RISK_OPTIONS,
  OPEN_MODAL,
  CLOSE_MODAL,
  FORMATTED_DATE,
  DATE_TO_FORMATTED_STRING
} from "../constants";


interface ChangeOrderModalProps {
  checkUnique: (CHG : string) => boolean;
  onSave: (coData : ChangeOrder) => void;
}


export default function ChangeOrderModal({
  checkUnique,
  onSave,
}: ChangeOrderModalProps) {
  const modal = useRef<HTMLDivElement>(null);

  const chgElement = document.getElementById('chg') as HTMLInputElement  
  const startTime =  document.getElementById('start') as HTMLSelectElement
  const endTime =  document.getElementById('end') as HTMLSelectElement


  const [modalOpen, setModalOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(true);
  const [duplicateCHG, setDuplicateCHG] = useState(false);

  const [coData, setCoData] = useState<ChangeOrder>({
    malcode: "",
    environment: "PROD",
    risk: "Low",
    description: "",
    mesProvided: false,
    start: FORMATTED_DATE(),
    end: FORMATTED_DATE(),
    chg: "",
    status: "New",
    notes: "",
  });

  const removeRoseBorder = () => {
    endTime.classList.remove('border-rose-500');
    startTime.classList.remove('border-rose-500');
    chgElement.classList.remove('border-rose-500');
  }

  const initializeCO = () => {
    setCoData({
      malcode: "",
      environment: "PROD",
      risk: "Low",
      description: " ",
      mesProvided: false,
      start: FORMATTED_DATE(),
      end: FORMATTED_DATE(),
      chg: "",
      status: "New",
      notes: "",
    });
  }


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean | Date = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === "datetime-local") {
      newValue = new Date(value);
    }

    setCoData((prevCoData) => ({
      ...prevCoData,
      [name]: newValue,
    }));
  };

  const handleSave = () => {
    //check if required fields are filled in

    if (!coData.chg || !coData.start || isNaN(coData.start.getTime()) || !coData.end || isNaN(coData.end.getTime())) {
      modal.current?.classList.add('animate-quake'); //i want this to animate quake everytime you press the button >:(
      setSubmissionSuccess(false);
      setDuplicateCHG(false);

      if (!coData?.chg) {
        chgElement.classList.add('border-rose-500');
      } else chgElement.classList.remove('border-rose-500');

      if (!coData?.start || isNaN(coData?.start.getTime())) {
        startTime.classList.add('border-rose-500');
      } else startTime.classList.remove('border-rose-500');

      if (!coData?.end || isNaN(coData?.end.getTime())) {
        endTime.classList.add('border-rose-500');
      } else endTime.classList.remove('border-rose-500');

      setTimeout(() => modal.current?.classList.remove('animate-quake'), 550); //nvm this does it :)

      return;
    }

    if (checkUnique(coData.chg)) {
      modal.current?.classList.add('animate-quake');
      setDuplicateCHG(true);
      setSubmissionSuccess(true);
      setCoData(prevCoData => ({
        ...prevCoData,
        chg: "",
      }));

      setTimeout(() => modal.current?.classList.remove('animate-quake'), 550);

      return;
    } 

    onSave(coData);
    initializeCO();
    closeModal();
    setSubmissionSuccess(true);
    setDuplicateCHG(false);
    removeRoseBorder();
  };

  const openModal = () => {
    if (!modalOpen) setModalOpen(true);
    OPEN_MODAL(modal);
  };

  const closeModal = () => {
    setSubmissionSuccess(true);
    setDuplicateCHG(false);
    removeRoseBorder();
    CLOSE_MODAL(modal, modalOpen, setModalOpen);
  } 


  useEffect(() => {
  }, []);

  return (
    <div>
      <button
        className={`modal-btn bg-green-500 text-white font-bold py-2 px-4 mt-5 mb-5 ${
          modalOpen ? "active" : ""
        }`}
        onClick={openModal}
      >
        +
      </button>
      {/* https://tailwindcomponents.com/component/animation-modal*/}

      {/* overlay */}

      <div
        id="modal_overlay"
        className={`${modalOpen ? "" : "hidden"} ${OVERLAY_STYLE}`}
      >
        {/* modal */}
        <div ref={modal} className={MODAL_STYLE}>
          {/* header */}
          {submissionSuccess ? null : (
            <div className="mx-4 my-3 text-red-500">Please fill in the required fields.</div>
          )}
          {!duplicateCHG ? null : (
            <div className="mx-4 my-3 text-red-500">That CHG already exists, please use a different CHG#.</div>
          )}

          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-600">
              New Change Order Entry
            </h2>

            <div
              onClick={closeModal}
              className="modal-close cursor-pointer bg-red-500 hover:bg-red-700"
            >
              <svg
                className="fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          {/* body */}
          <div className="w-full p-3">
            <label htmlFor="environment" className={LABEL_STYLE}>
              Environment
              <select
                name="environment"
                id="environment"
                className={INPUT_STYLE}
                onChange={handleChange}
                value={coData.environment}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {ENVIRONMENT_OPTIONS.map((option) => (
                  <option key={option} value={option} selected>
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
                onChange={handleChange}
                value={coData.risk}
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
                value={coData.malcode}
                name="malcode"
                placeholder="Project MAL code"
                className={INPUT_STYLE}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="description" className={LABEL_STYLE}>
              Description
              <input
                type="text"
                value={coData.description}
                name="description"
                placeholder="What is this change?"
                className={INPUT_STYLE}
                onChange={handleChange}
              />
            </label>

            <label className={LABEL_STYLE}>
              Start Time:
              <input
                defaultValue={DATE_TO_FORMATTED_STRING(FORMATTED_DATE())}
                className={INPUT_STYLE}
                onChange={handleChange}
                type="datetime-local"
                id="start"
                name="start"
                placeholder="Start time"
              />
            </label>

            <label className={LABEL_STYLE}>
              End Time:
              <input
                defaultValue={DATE_TO_FORMATTED_STRING(FORMATTED_DATE())}
                className={INPUT_STYLE}
                onChange={handleChange}
                id="end"
                type="datetime-local"
                name="end"
                placeholder="End time"
              />
            </label>

            <label htmlFor="chg" className={LABEL_STYLE}>
              Change Order Number
              <input
                type="text"
                name="chg"
                placeholder="What is the CO#?"
                id="chg"
                value={coData.chg}
                maxLength={15}
                className={INPUT_STYLE}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="mesProvided" className={LABEL_STYLE}>
              MES?
              <input
                type="checkbox"
                name="mesProvided"
                onChange={handleChange}
                className="w-4 h-4 mt-2 ml-2 text-blue-600 bg-gray-100 border-gray-300 
                     rounded focus:ring-blue-500 focus:ring-2"
              />
            </label>
          </div>

          {/* footer */}

          <div className="px-4 py-3 border-t border-gray-200 flex justify-end items-center gap-3 p-2">
            <button
              className="focus:outline-none px-4 bg-green-500 p-3 ml-3 rounded-lg text-white hover:bg-green-400"
              onClick={handleSave}
            >
              Submit
            </button>
            <button
              className="focus:outline-none modal-close px-4 bg-red-500 p-3 rounded-lg text-white hover:bg-red-700"
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
