import {ChangeOrder} from '../ChangeOrder';
import ChangeOrderDeleteModal from "./ChangeOrderDeleteModal"
import ChangeOrderEditModal from "./ChangeOrderEditModal"
import React, {useState, useEffect} from 'react'
import {GET_STATE_NAMES, GET_RISK_NAMES, GET_RISK_DAYS} from "../constants";


 interface COListProps {
  COList: ChangeOrder[];
  onDelete: (chg: string) => void;
  onEdit: (formData : ChangeOrder) => void;
  getCHGObject: (CHG: string) => ChangeOrder;
  changeStatus: (CHG: string, direction: string) => void;
  changeMESProvided: (CHG: string) => void;
 } 



const changeOrderStyle = `changeOrder grid grid-cols-11 gap-1 items-center justify-center text-center ml-2`;

export default function ChangeOrderList({COList, onDelete, getCHGObject, onEdit, changeStatus, changeMESProvided}: COListProps) {

  const [deleteModalState, setDeleteModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const [selectedChg, setSelectedChg] = useState<string>('');
  const [chgToEdit, setChgToEdit] = useState<ChangeOrder | undefined>();

  const openDeleteModal = (e: React.MouseEvent<HTMLButtonElement,  MouseEvent>) => {
    //uhh maybe figure out better way to do this, but it works!
    const chg = e.currentTarget.parentElement?.previousElementSibling?.previousElementSibling?.innerHTML || ''; 
    setSelectedChg(chg);
    setDeleteModalState(true);
  }

  const confirmDelete = (deleteDecision: boolean) => {
    if (deleteDecision && selectedChg) onDelete(selectedChg);
    setDeleteModalState(false);
    setSelectedChg('');
  }

  const openEditModal = (e: React.MouseEvent<HTMLButtonElement,  MouseEvent>) => {
    const chg = e.currentTarget.parentElement?.previousElementSibling?.previousElementSibling?.innerHTML || ''; 
    setChgToEdit(getCHGObject(chg));
    setEditModalState(true);
  }

  const closeEditModal = () => {
    setChgToEdit(undefined);
    setEditModalState(false);
  }

  const handleMESProvided = (e: React.MouseEvent<HTMLButtonElement,  MouseEvent>) => {
    const chg = e.currentTarget.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.innerHTML || '';
    changeMESProvided(chg);
  }

  const handlePrevStatus = (e: React.MouseEvent<HTMLButtonElement,  MouseEvent>) => {
    const chg = e.currentTarget.parentElement?.nextElementSibling?.nextElementSibling?.nextElementSibling?.innerHTML || ''; 
    changeStatus(chg, 'prev');
  }

  const handleNextStatus = (e: React.MouseEvent<HTMLButtonElement,  MouseEvent>) => {
    const chg = e.currentTarget.parentElement?.nextElementSibling?.nextElementSibling?.nextElementSibling?.innerHTML || ''; 
    changeStatus(chg, 'next');
  }


  useEffect(() => {
    // if (COList.length > 0) {
    //   console.log(GET_RISK_DAYS(COList[0].start, COList[0].risk, COList[0].environment, COList[0].status));
    // } 
  }, []);


  return (
      <div id="main">
        <ChangeOrderDeleteModal modalOpen={deleteModalState} onConfirm={confirmDelete} deleteChg={selectedChg}/>
        <ChangeOrderEditModal modalOpen={editModalState} close={closeEditModal} editChg={chgToEdit} onEdit={onEdit}/>
        <h2 id="test">Change Orders:</h2>

        <div id='list-header'>
          <div id='display'></div>
          <div id="table-header" className={`${changeOrderStyle}`}>
            <button>MAL Code</button>
            <button>Environment</button>
            <button>Risk</button>
            <button>Description</button>
            <button>MES Provided?</button>
            <button>CO State</button>
            <button>Start Time</button>
            <button>End Time</button>
            <button>CHG#</button>
            <p>Notes</p>
          </div>
        </div>
        <div className='border-solid rounded-md border-4 border-[#ABCEA1] min-h-85v mb-5'>
        {COList.map(changeOrder => {

          return (
          <div className={`bg-[#E5E5E5] m-5 ${changeOrderStyle}`}>
          <p>{changeOrder.malcode}</p>
          <p>{changeOrder.environment}</p>

          <div className={`${(GET_RISK_NAMES(changeOrder.risk))} h-full w-full flex items-center justify-center relative`}>

            {GET_RISK_DAYS(changeOrder.start, changeOrder.risk, changeOrder.environment, changeOrder.status) && <div className='risk-alert px-3 py-1 bg-red-500 hover:bg-red-700 text-white absolute -top-4 -right-3 font-bold'>
              {/* <Tooltip>This change needs to be submitted 5 business days prior. Please submit the change to avoid expedited status.</Tooltip> */}
              <div className='tooltip'>
                <span className='absolute -left-36 -top-[100px] tooltip rounded shadow-lg p-1 bg-[#DD2727] text-white w-80'>
                This change needs to be submitted <span className='text-[#530404]'>{GET_RISK_DAYS(changeOrder.start, changeOrder.risk, changeOrder.environment, changeOrder.status)}</span> prior. Please submit the change to avoid expedited status.
                </span>
                <span className='tooltip-arrow absolute -left-0.5 -top-5'></span>
              </div>
              !
            </div>}
            
            <p> {changeOrder.risk}</p>

          </div>

          <p>{changeOrder.description}</p>
          {/* <button onClick={handleMESProvided}>{(changeOrder.mesProvided) ? "True" : "False"}</button> */}
          <p>{(changeOrder.mesProvided) ? "Yes" : "No"}</p>


          <div id='status' className={`flex justify-between h-full w-full`}>
            <button onClick={handlePrevStatus} className=''>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-full hover:bg-gray-300 hover:stroke-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
            <span className={`${(GET_STATE_NAMES(changeOrder.status))} h-full w-full flex items-center justify-center`}>{changeOrder.status}</span>
            <button onClick={handleNextStatus} className=''>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-full hover:bg-gray-300 hover:stroke-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

          <p>{changeOrder.start.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</p>
          <p>{changeOrder.end.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</p>
          <p>{changeOrder.chg}</p>
          <p className={`truncate`} title={changeOrder.notes}>{changeOrder.notes}</p>

          <div className='button-list flex flex-col items-start justify-center bg-white pl-1'>
            <button
              type='button'
              className="focus:outline-none modal-close px-1 py-1 bg-blue-500 mb-0.5 text-white hover:bg-blue-700"
              onClick={openEditModal}
              ><svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button
              type='button'
              className="focus:outline-none modal-close px-1 py-1 bg-red-500 text-white hover:bg-red-700"
              onClick={openDeleteModal}
              ><svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>

        </div>
        )})}
        </div>
      </div>
  );
};
 