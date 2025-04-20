import React from 'react'
import { Link } from 'react-router-dom'

export default function AddItem({ title, month_rent, area, id = 20 }) {
  return (
    <Link to={`/detail/${id}`}>
      <div className='rounded-md overflow-clip bg-white shadow-xs border-1 border-[#eaeaea] '>
        <img className='rounded-t rounded-md' src='./img/image.png'></img>
        <div className='pt-3 pl-4'>
          <div className='text-l pb-1 text-[#1F1F1F] font-semibold'>
            3 værelses lejlighed på 76 m²
          </div>
          <div className='text-sm pb-1 text-[#7D7D7D] '>
            Aarhus C,Harald Jensens Plads
          </div>
          <div className='flex justify-between py-2 font-semibold text-[#1F1F1F]'>
            <span>{month_rent}kr</span>
            <span className='pr-4 font-light text-xs text-[#7D7D7D]'>
              13 feb
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
