import { RefObject } from "react";
import { ChangeOrder } from "./ChangeOrder";

export const MODAL_STYLE = `opacity-0 -translate-y-full scale-150 transform relative fixed w-11/12 md:max-w-md mx-auto rounded h-100 overflow-y-auto shadow-lg transition-opacity bg-white transition-transform duration-300`

export const OVERLAY_STYLE = `absolute inset-0 bg-black bg-opacity-40 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`

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

   

// export function CLOSE_MODAL(modal: RefObject<HTMLDivElement>, state: boolean, close: () => void) {
//         modal.current?.classList.add('-translate-y-full');
//         setTimeout(() => {
//             modal.current?.classList.add('opacity-0');
//             modal.current?.classList.add('scale-150');
//         }, 100);
//         setTimeout(() => {if (state) { close()}}, 300);
    