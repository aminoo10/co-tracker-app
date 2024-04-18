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
} from "../constants";

export default function ChangeOrderModal({
  onSave,
}: {
  onSave: (coData: ChangeOrder) => void;
}) {
  const modal = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);

  //. get today's date

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();

  const formattedDate = new Date(year, month, date, hour, minute);
  const formattedDateString = `${year.toString().padStart(4, "0")}-${(month + 1)
    .toString()
    .padStart(2, "0")}-${date.toString().padStart(2, "0")}T${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  //

  const [coData, setCoData] = useState<ChangeOrder>({
    malcode: "",
    environment: "PAT",
    risk: "Low",
    description: "",
    mesProvided: false,
    start: formattedDate,
    end: formattedDate,
    chg: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLInputElement
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
    onSave(coData);
    setCoData({
      malcode: "",
      environment: "PAT",
      risk: "Low",
      description: "",
      mesProvided: false,
      start: formattedDate,
      end: formattedDate,
      chg: "",
      notes: "",
    });
    closeModal();
  };
  // const ENVIRONMENT_OPTIONS = ['PROD', 'PAT'];
  // const RISK_OPTIONS = ['Low', 'Moderate', 'High', 'Very High'];

  const openModal = () => {
    if (!modalOpen) setModalOpen(true);
    OPEN_MODAL(modal);
  };

  const closeModal = () => CLOSE_MODAL(modal, modalOpen, setModalOpen);

  // const openModal = () => {
  //   if (!modalOpen) setModalOpen(true);
  //   setTimeout(() => {
  //     modal.current?.classList.remove('opacity-0');
  //     modal.current?.classList.remove('-translate-y-full');
  //     modal.current?.classList.remove('scale-150');
  //   }, 100);
  // }

  // const closeModal = () => {
  //   modal.current?.classList.add('-translate-y-full');
  //   setTimeout(() => {
  //     modal.current?.classList.add('opacity-0');
  //     modal.current?.classList.add('scale-150');
  //   }, 100);
  //   setTimeout(() => {if (modalOpen) setModalOpen(false)}, 300);
  // }

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <button
        className={`modal-btn bg-blue-500 text-white font-bold py-2 px-4 ${
          modalOpen ? "active" : ""
        }`}
        onClick={openModal}
      >
        Show Modal
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
                name="description"
                placeholder="What is this change?"
                className={INPUT_STYLE}
                onChange={handleChange}
              />
            </label>

            <label className={LABEL_STYLE}>
              Start Time:
              <input
                defaultValue={formattedDateString}
                className={INPUT_STYLE}
                onChange={handleChange}
                type="datetime-local"
                name="start"
                placeholder="Start time"
              />
            </label>

            <label className={LABEL_STYLE}>
              End Time:
              <input
                defaultValue={formattedDateString}
                className={INPUT_STYLE}
                onChange={handleChange}
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
                value={coData.chg}
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
