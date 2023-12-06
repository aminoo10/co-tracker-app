import React, {useState, useEffect} from 'react';

export default function ChangeOrderModal() {

const [modalOpen, setModalOpen] = useState(false);
const [checked, setCheckState] = useState(false);
// const [formData, setFormData] = useState<>

const labelStyle = 'block text-gray-700 text-sm font-bold mb-7';
const inputStyle = 'mt-2 shadow appearance-none border rounded ml-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline';

const environmentOptions = ['PROD', 'PAT'];
const riskOptions = ['Low', 'Moderate', 'High', 'Very High'];

const openModal = () => {
  if (!modalOpen) setModalOpen(true);
}

const closeModal = () => {
  if (modalOpen) setModalOpen(false);
}

const handleSubmit = (e:React.FormEvent) => {
  e.preventDefault();
}

const handleCheckbox = (e:React.ChangeEvent<HTMLInputElement>) => {
  const checked = e.target;
  setCheckState(!checked);
}

useEffect(() => {
  const handleClick = (event: MouseEvent) => {
    // console.log(modalOpen, event);
  };

  window.addEventListener('click', handleClick);

  return () => {
    window.removeEventListener('click', handleClick);
  };
  
}, [])






// const handleSubmit = () => {
//   onsubmit(formData)
// }

  return (
    <div>
      <button className={`modal-btn bg-blue-500 text-white font-bold py-2 px-4 ${modalOpen ? 'active' : ''}`}
      onClick={openModal}>Show Modal</button>
      {modalOpen && (
        	<div id='modal' className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
          >
          <div
            className="shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              {/*Title*/}
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">New Change Order Entry</p>
                <div onClick={closeModal} className="modal-close cursor-pointer z-50">
                  <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 18 18">
                    <path
                      d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                    </path>
                  </svg>
                </div>
              </div>
              {/*Body*/}
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>

                    <label className={labelStyle}>
                      Environment: 
                      <select
                        className={inputStyle}
                        name="risk"
                      >
                        <option value="" disabled>
                          Choose an option
                        </option>
                        {environmentOptions.map((option) => (
                          <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                      </select>
                    </label>


                    <label className={labelStyle}>
                      Risk: 
                      <select
                        className={inputStyle}
                        name="risk"
                      >
                        <option value="" disabled>
                          Choose an option
                        </option>
                        {riskOptions.map((option) => (
                          <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                      </select>
                    </label>

                    <label className={labelStyle}>
                      Description: 
                      <input
                        className={inputStyle}
                        type='text'
                        name="description"
                        placeholder='Description'
                      />
                    </label>


                    <label className={labelStyle}>
                      Start Time: 
                      <input
                        className={inputStyle}
                        type='datetime-local'
                        name="start"
                        placeholder='Start time'
                      />
                    </label>

                    <label className={labelStyle}>
                      End Time: 
                      <input
                        className={inputStyle}
                        type='datetime-local'
                        name="end"
                        placeholder='End time'
                      />
                    </label>

                    <label className={labelStyle}>
                      MES?: 
                      <input
                        className={inputStyle}
                        type='checkbox'
                        name="mes"
                        checked= {checked}
                        onChange={handleCheckbox}
                      />
                    </label>



                  </div>
                </form>
              </div>
              {/*Footer*/}
              <div className="flex justify-end pt-2">
                <button
                  className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
                  onClick={closeModal}>Cancel</button>
                <button
                  className="focus:outline-none px-4 bg-green-500 p-3 ml-3 rounded-lg text-white hover:bg-green-400">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
