import React from 'react'

export default function PopularCity({ city, img }) {
  return (
    <div className='rounded-t mr-3'>
      <img className=' w-[160px] rounded-t ' src={img}></img>
      <div className=' p-2 bg-white border w-[160px] rounded block text-l font-semibold ext-gray-950'>
        {city}
      </div>
    </div>
  )
}
