import React, {useState, useEffect, useRef} from 'react';


interface ChangeOrderDeleteModalProps {
    modalOpen: boolean;
    onConfirm: (decision: boolean) => void
   }
  
export default function ChangeOrderDeleteModal({modalOpen, onConfirm}: ChangeOrderDeleteModalProps) {

  const deleteModal = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState(modalOpen);

  const modalStyle = `-translate-y-full scale-150 opacity-0 transform relative fixed w-11/12 md:max-w-md mx-auto
  rounded h-100 overflow-y-auto shadow-lg transition-opacity bg-white transition-transform 
  duration-300`;

  const overlayStyle = `${modalState ? '' : 'hidden'} absolute inset-0 bg-black bg-opacity-40
  h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`;

  const openModal = () => {
    setTimeout(() => {
      deleteModal.current?.classList.remove('opacity-0');
      deleteModal.current?.classList.remove('-translate-y-full');
      deleteModal.current?.classList.remove('scale-150');
    }, 100);
  }

  const closeModal = () => {
    deleteModal.current?.classList.add('-translate-y-full');
    setTimeout(() => {
      deleteModal.current?.classList.add('opacity-0');
      deleteModal.current?.classList.add('scale-150');
    }, 100);
    setTimeout(() => {if (modalOpen) {
    setModalState(false);
        
    } }, 300);
  }

  const handleConfirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerHTML }  = e.currentTarget;
    const deleteResult = innerHTML === 'Yes' ? true : false;
    console.log(deleteResult);
    onConfirm(deleteResult);
};



  useEffect(() => {
    setModalState(modalOpen);
    if (modalOpen) openModal();
    else closeModal();
  }, [modalOpen]);



  return (
    <div>
      {/* https://tailwindcomponents.com/component/animation-modal*/}
      
      {/* overlay */}

      <div id="modal_confirm_delete" className={overlayStyle}>

          {/* modal */}
        <div ref={deleteModal} className={modalStyle}>

            <h2 className='px-4 py-3 border-gray-200 text-xl font-semibold text-gray-600'>Are you sure you want to delete this change order?</h2>
            
            <div className="mx-3 my-3 flex justify-around">
            <button
                className=" focus:outline-none bg-green-500 p-3 w-1/3 rounded-lg text-white hover:bg-green-400"
                onClick={handleConfirmDelete}>Yes</button>
            <button
                className=" focus:outline-none modal-close bg-red-500 w-1/3 p-3 rounded-lg text-white hover:bg-red-700"
                onClick={handleConfirmDelete}>No</button>
            </div>

        </div>
      </div>

    </div>
  )
}
