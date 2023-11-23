import React, {useState} from 'react';

export default function ChangeOrderModal() {

const [modalOpen, setModalOpen] = useState(false);
// const [formData, setFormData] = useState<>

const showModal = () => {
  setModalOpen(!modalOpen);
}

// const handleSubmit = () => {
//   onsubmit(formData)
// }

  return (
    <div>
      <button className={`modal-btn bg-blue-500 text-white font-bold py-2 px-4 ${modalOpen ? 'active' : ''}`}
      onClick={showModal}>Show Modal</button>
      {modalOpen && (
        <div id='modal'>
          <p>Hello</p>
        </div>
      )}
    </div>
  )
}
