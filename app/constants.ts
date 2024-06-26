import { RefObject } from "react";

export const MODAL_STYLE = `opacity-0 -translate-y-full scale-150 transform relative fixed w-11/12 md:max-w-md mx-auto rounded h-100 overflow-y-auto shadow-lg transition-opacity bg-white transition-transform duration-300`

export const OVERLAY_STYLE = `z-10 absolute inset-0 bg-black bg-opacity-40 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`

export const LABEL_STYLE = 'block text-gray-700 text-sm font-bold mb-5 flex-col justify-between';

export const INPUT_STYLE = 'mt-2 shadow appearance-none border rounded ml-2 py-2 px-2 text-gray-700 focus:outline-none focus:shadow-outline focus:ring-2 font-normal';

export const ENVIRONMENT_OPTIONS = ['PROD', 'PAT'];

export const RISK_OPTIONS = ['Low', 'Moderate', 'High', 'Very High'];


export const OPEN_MODAL = (modal : RefObject<HTMLDivElement>) => {
setTimeout(() => {
    modal.current?.classList.remove('opacity-0');
    modal.current?.classList.remove('-translate-y-full');
    modal.current?.classList.remove('scale-150');
    }, 100);
  
}

export function CLOSE_MODAL(modal: RefObject<HTMLDivElement>, state: boolean, modalSet: (bool: boolean) => void) {
    modal.current?.classList.add('-translate-y-full');
    setTimeout(() => {
        modal.current?.classList.add('opacity-0');
        modal.current?.classList.add('scale-150');
    }, 100);
    setTimeout(() => {if (state) { modalSet(false)}}, 300);

}

export const FORMATTED_DATE = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    return new Date(year, month, date, hour, minute);
}

export const DATE_TO_FORMATTED_STRING = (date : Date) => {

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${year.toString().padStart(4, "0")}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hour
        .toString()
        .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

export const DATE_DIFFERENCE = (date: Date) =>  {
    const timeDiff = Math.abs(FORMATTED_DATE().getTime() - date.getTime());
    const diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffInDays;
}

export const GET_RISK_DAYS = (date: Date, risk: string, environment: string, status: string) => {
    const diffInDays = DATE_DIFFERENCE(date);

    if (environment === 'PROD' && status === 'New') {
        if (diffInDays < 5 && (risk === 'High' || risk === 'Very High')) {
            return '5 business days';
        } else if (diffInDays < 3 && risk === 'Moderate') {
            return '3 business days';
        } else if (diffInDays <= 1 && risk === 'Low') {
            return '1 business day';
        } else return false;
    }

    return false;
}



export const GET_STATE_NAMES = (text: string) => {
    switch (text) {
        case 'Technical Review':
            return 'bg-[#FFB0EE] text-[#FF06C8]';
        case 'Stakeholder Review':
            return 'bg-[#DABBF2] text-[#9206FF]';
        case 'CAB Approval':
            return 'bg-[#EEDB77] text-[#9C7207]';
        case 'Scheduled':
            return 'bg-[#B7B6FF] text-[#0B06FF]';
        case 'Implement':
            return 'bg-[#BBFFEB] text-[#00A372]';
        case 'Implementation Complete':
            return 'bg-[#D7FFC9] text-[#228500]';
        case 'Implementation Failed':
            return 'bg-[#FFC9C9] text-[#A30000]';
        case 'Canceled':
            return 'bg-black text-white';
        default: 
            return 'bg-white text-black'
    }
}

export const GET_RISK_NAMES = (text: string) => {
    switch (text) {
        case 'Low':
            return 'bg-[#CDECB5] text-[#2D7813]';
        case 'Moderate': 
            return 'bg-[#EEDB77] text-[#825E03]';
        default:
            return 'bg-[#ECB5B5] text-[#781313]'
    }
}

   

// export function CLOSE_MODAL(modal: RefObject<HTMLDivElement>, state: boolean, close: () => void) {
//         modal.current?.classList.add('-translate-y-full');
//         setTimeout(() => {
//             modal.current?.classList.add('opacity-0');
//             modal.current?.classList.add('scale-150');
//         }, 100);
//         setTimeout(() => {if (state) { close()}}, 300);
    