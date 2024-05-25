import React from 'react'

export const StatusButton = ({status}: {status: string}) => {
  let className = 'h-fit m-0 p-4';
  if(status === "live"){
    className = 'bg-[#F4FAF8] h-fit m-0 p-2 px-4 text-[#43A495] capitalize font-[600] rounded-[2px] flex justify-center items-center gap-2';
  }
  else if(status === "draft"){
  }
  return (
    <p className={className}>
        <span className='block w-[10px] h-[10px] bg-[#43A495] rounded-full'></span>
        {status}</p>
  )
}
