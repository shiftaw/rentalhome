import React from 'react'
import DateLabel from '../DateLabel'

export default function AddItem(house) {
  const {
    title,
    rooms,
    month_rent,
    area,
    _id = 20,
    type = 'Apartment/Condo',
    image_url,
    created_at,
    address,
  } = house
  return (
    <div className='rounded-md overflow-clip bg-white shadow-xs border-1 border-[#eaeaea] '>
      <img
        className='rounded-t rounded-md w-full max-h-[350px] object-cover'
        style={{}}
        src={image_url[0]}
      ></img>
      <div className='pt-3 pl-4'>
        <div className='text-l pb-1 text-[#1F1F1F] font-semibold'>
          {rooms} rooms {type} with {area}m²
        </div>
        <div className='font-light text-sm pb-1 text-[#7D7D7D] '>{address}</div>
        <div className='flex justify-between py-2 font-semibold text-[#1F1F1F]'>
          <span>{month_rent}kr</span>
          <span className='pr-4 font-light text-xs text-[#7D7D7D]'>
            <DateLabel date={created_at}></DateLabel>
          </span>
        </div>
      </div>
    </div>
  )
}
