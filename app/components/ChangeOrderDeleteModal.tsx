import React, { useState, useEffect, useRef } from "react";
import {
  MODAL_STYLE,
  OVERLAY_STYLE,
  OPEN_MODAL,
  CLOSE_MODAL,
} from "../lib/constants";

interface ChangeOrderDeleteModalProps {
  modalOpen: boolean;
  onConfirm: (decision: boolean) => void;
  deleteChg: string;
}

export default function ChangeOrderDeleteModal({
  modalOpen,
  onConfirm,
  deleteChg,
}: ChangeOrderDeleteModalProps) {
  const deleteModal = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState(modalOpen);

  const handleConfirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerHTML } = e.currentTarget;
    const deleteResult = innerHTML === "Yes" ? true : false;
    CLOSE_MODAL(deleteModal, modalState, setModalState);
    setTimeout(() => onConfirm(deleteResult), 300); //this shit aint doin a exit transition, so ill do it like this. WHATEVA :)
  };

  useEffect(() => {
    if (modalOpen) OPEN_MODAL(deleteModal);
  }, [modalOpen]);

  return (
    <div>
      {/* https://tailwindcomponents.com/component/animation-modal*/}

      {/* overlay */}

      <div
        id="modal_confirm_delete"
        className={`${modalOpen ? "" : "hidden"} ${OVERLAY_STYLE}`}
      >
        {/* modal */}
        <div ref={deleteModal} className={MODAL_STYLE}>
          <h2 className="px-4 py-3 border-gray-200 text-xl font-semibold text-gray-600 text-center">
            Are you sure you want to
            <span className="text-red-500"> delete</span>
            <span className="font-bold"> {deleteChg}</span>?
          </h2>

          <div className="mx-3 my-3 flex justify-around">
            <button
              className=" focus:outline-none bg-green-500 p-3 w-1/3 rounded-lg text-white hover:bg-green-400"
              onClick={handleConfirmDelete}
            >
              Yes
            </button>
            <button
              className=" focus:outline-none modal-close bg-red-500 w-1/3 p-3 rounded-lg text-white hover:bg-red-700"
              onClick={handleConfirmDelete}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
