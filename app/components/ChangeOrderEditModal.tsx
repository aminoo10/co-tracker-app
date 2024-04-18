import React, { useState, useEffect, useRef } from "react";
import {
  ENVIRONMENT_OPTIONS,
  INPUT_STYLE,
  LABEL_STYLE,
  MODAL_STYLE,
  OVERLAY_STYLE,
  RISK_OPTIONS,
  OPEN_MODAL,
  CLOSE_MODAL,
} from "../constants";

interface ChangeOrderEditModalProps {
  modalOpen: boolean;
  close: () => void;
}

export default function ChangeOrderDeleteModal({
  modalOpen,
  close,
}: ChangeOrderEditModalProps) {
  const editModal = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState(modalOpen);

  const closeModal = () => {
    CLOSE_MODAL(editModal, modalState, close); //this is kinda fucked up to do it like this.... but whatever :P
  };

  useEffect(() => {
    setModalState(modalOpen);
    if (modalOpen) OPEN_MODAL(editModal);
    else close();
  }, [modalOpen]);

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
              <select name="risk" id="risk" className={INPUT_STYLE}>
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
              />
            </label>

            <label htmlFor="description" className={LABEL_STYLE}>
              Description
              <input
                type="text"
                name="description"
                placeholder="What is this change?"
                className={INPUT_STYLE}
              />
            </label>

            <label className={LABEL_STYLE}>
              Start Time:
              <input
                className={INPUT_STYLE}
                type="datetime-local"
                name="start"
                placeholder="Start time"
              />
            </label>

            <label className={LABEL_STYLE}>
              End Time:
              <input
                className={INPUT_STYLE}
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
                className={INPUT_STYLE}
              />
            </label>

            <label htmlFor="mesProvided" className={LABEL_STYLE}>
              MES?
              <input
                type="checkbox"
                name="mesProvided"
                className="w-4 h-4 mt-2 ml-2 text-blue-600 bg-gray-100 border-gray-300 
                 rounded focus:ring-blue-500 focus:ring-2"
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
            />
          </div>

          {/* footer */}

          <div className="px-4 py-3 border-t border-gray-200 flex justify-around">
            <button
              className=" focus:outline-none bg-green-500 p-3 w-1/3 rounded-lg text-white hover:bg-green-400"
              onClick={closeModal}
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
