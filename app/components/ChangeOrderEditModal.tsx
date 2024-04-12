import React, {useState, useEffect, useRef} from 'react';


interface ChangeOrderEditModalProps {
    modalOpen: boolean;
    close: () => void;
   }
  
export default function ChangeOrderDeleteModal({modalOpen, close}: ChangeOrderEditModalProps) {

  const editModal = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState(modalOpen);

  const modalStyle = `-translate-y-full scale-150 opacity-0 transform relative fixed w-11/12 md:max-w-md mx-auto
  rounded h-100 overflow-y-auto shadow-lg transition-opacity bg-white transition-transform 
  duration-300`;

  const overlayStyle = `${modalOpen ? '' : 'hidden'} absolute inset-0 bg-black bg-opacity-40
  h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`;

  const openModal = () => {
    setTimeout(() => {
      editModal.current?.classList.remove('opacity-0');
      editModal.current?.classList.remove('-translate-y-full');
      editModal.current?.classList.remove('scale-150');
    }, 100);
  }

  const closeModal = () => {
    editModal.current?.classList.add('-translate-y-full');
    setTimeout(() => {
      editModal.current?.classList.add('opacity-0');
      editModal.current?.classList.add('scale-150');
    }, 100);
    setTimeout(() => {if (modalState) {
    close();
    } }, 300);
  }


  useEffect(() => {
    setModalState(modalOpen);
    if (modalOpen) openModal();
    else close();
  }, [modalOpen]);



  return (
    <div>
      {/* https://tailwindcomponents.com/component/animation-modal*/}
      
      {/* overlay */}

      <div id="modal_edit_overlay" className={overlayStyle}>

          {/* modal */}
        <div ref={editModal} className={modalStyle}>

            <h2 className='px-4 py-3 border-gray-200 text-xl font-semibold text-gray-600 text-center'>edit</h2>

            <div className="mx-3 my-3 flex justify-around">
            <button
                className=" focus:outline-none bg-green-500 p-3 w-1/3 rounded-lg text-white hover:bg-green-400"
                onClick={closeModal}>Confirm</button>
            <button
                className=" focus:outline-none modal-close bg-red-500 w-1/3 p-3 rounded-lg text-white hover:bg-red-700"
                onClick={closeModal}>Cancel</button>
            </div>

        </div>
      </div>

    </div>
  )
}
