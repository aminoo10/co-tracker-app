import React, {useState, useEffect, useRef} from 'react';

export default function ChangeOrderModal() {

  const modal = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const labelStyle = 'block text-gray-700 text-sm font-bold mb-5 flex-col justify-between';
  const inputStyle = 'mt-2 shadow appearance-none border rounded ml-2 py-2 px-2 text-gray-700 focus:outline-none focus:shadow-outline font-normal';
  const modalStyle = `opacity-0 -translate-y-full scale-150 transform relative fixed w-11/12 md:max-w-md mx-auto
  rounded h-100 overflow-y-auto shadow-lg transition-opacity bg-white transition-transform 
  duration-300`;

  const overlayStyle = `${modalOpen ? '' : 'hidden'} absolute inset-0 bg-black bg-opacity-40
  h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`;

  const environmentOptions = ['PROD', 'PAT'];
  const riskOptions = ['Low', 'Moderate', 'High', 'Very High'];

  const openModal = () => {
    if (!modalOpen) setModalOpen(true);
    setTimeout(() => {
      modal.current?.classList.remove('opacity-0');
      modal.current?.classList.remove('-translate-y-full');
      modal.current?.classList.remove('scale-150');
    }, 100);
  }

  const closeModal = () => {
    modal.current?.classList.add('-translate-y-500');
    setTimeout(() => {
      modal.current?.classList.add('opacity-0');
      modal.current?.classList.add('scale-150');
    }, 1000);
    setTimeout(() => {if (modalOpen) setModalOpen(false)}, 300);
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
  }

  useEffect(() => {
    
  return () => {}
  }, [])


  return (
    <div>
      <button className={`modal-btn bg-blue-500 text-white font-bold py-2 px-4 ${modalOpen ? 'active' : ''}`}
      onClick={openModal}>Show Modal</button>
      {/* https://tailwindcomponents.com/component/animation-modal*/}
      
      {/* overlay */}

      <div id="modal_overlay" className={overlayStyle}>

          {/* modal */}
        <div ref={modal} className={modalStyle}>

          {/* header */}
          <div className='px-4 py-3 border-b border-gray-200 flex justify-between items-center'>
            <h2 className='text-xl font-semibold text-gray-600'>New Change Order Entry</h2>

            <div onClick={closeModal} className="modal-close cursor-pointer bg-red-500 hover:bg-red-700">
                  <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 18 18">
                    <path
                      d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                    </path>
                  </svg>
          </div>
          </div>

          {/* body */}
          <div className="w-full p-3">

            <label htmlFor="env" className={labelStyle}>Environment
              <select name="env" id="env" className={inputStyle}>
                <option value="" disabled>Choose an option</option>
                {environmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="risk" className={labelStyle}>Risk
              <select name="risk" id="risk" className={inputStyle}>
                <option value="" disabled>Choose an option</option>
                {riskOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            

            <label htmlFor="malcode" className={labelStyle}>MAL Code
              <input type="text" name="malcode" placeholder='Project MAL code' className={inputStyle}/>
            </label>

            <label htmlFor="descript" className={labelStyle}>Description
              <input type="text" name="descript" placeholder="What is this change?" 
              className={inputStyle}/>
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

            <label htmlFor="mes-check" className={labelStyle}>MES?
              <input type="checkbox" 
                     name='mes-check'
                     className="w-4 h-4 mt-2 ml-2 text-blue-600 bg-gray-100 border-gray-300 
                     rounded focus:ring-blue-500 dark:focus:ring-blue-600 
                     dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                     dark:border-gray-600"/>
            </label>


         

          </div>

          {/* footer */}
          
          <div className="px-4 py-3 border-t border-gray-200 flex justify-end items-center gap-3 p-2">
            <button
              className="focus:outline-none px-4 bg-green-500 p-3 ml-3 rounded-lg text-white hover:bg-green-400">Submit</button>
            <button
              className="focus:outline-none modal-close px-4 bg-red-500 p-3 rounded-lg text-white hover:bg-red-700"
              onClick={closeModal}>Cancel</button>
          </div>

        </div>
      </div>

    </div>
  )
}
