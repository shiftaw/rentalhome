import React from 'react'

export default function AddItem({ title, month_rent, area }) {
  return (
    <div className=' rounded-l overflow-clip bg-white'>
      <img className='rounded-t' src='./img/image.png'></img>
      <div className='pt-3 pl-4'>
        <div className='text-l pb-1 text-gray-950 font-semibold'>
          3 værelses lejlighed på 76 m²
        </div>
        <div style={{ color: '#7d7d7d' }} className='text-sm pb-1 '>
          Aarhus C,Harald Jensens Plads
        </div>
        <div className='flex justify-between py-2 font-semibold'>
          <span>{month_rent}kr</span>
          <span className='pr-4 font-light text-gray'>13 feb</span>
        </div>
      </div>
    </div>
  )
}
