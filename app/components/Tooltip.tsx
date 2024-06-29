import React, {useState, useEffect} from 'react'

interface TooltipProps {
    children: React.ReactNode;
  }
  

export default function Tooltip({children} : TooltipProps) {

    return (
        <div className='tooltip'>
            <div className='absolute -left-36 -top-[100px] tooltip rounded shadow-lg p-1 bg-[#DD2727] text-white w-80'>
             {children}
            </div>
            <div className='tooltip-arrow absolute -left-0.5 -top-5'></div>
        </div>
    )

};
