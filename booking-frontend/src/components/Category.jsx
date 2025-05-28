import React from 'react'
import { BiSolidBuildingHouse } from 'react-icons/bi'
import { PiBuildingApartment } from 'react-icons/pi'
import { GiFamilyHouse } from 'react-icons/gi'
import { LuDoorOpen } from 'react-icons/lu'
import { MdOutlineHolidayVillage } from 'react-icons/md'
import { PiHouseLine } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export default function Category() {
  return (
    <div className='grid grid-cols-2 gap-2 sm:grid sm:grid-cols-5'>
      <Link to='/apartment'>
        <span className=' flex items-center gap-2 border bg-white text-left rounded p-4'>
          <PiBuildingApartment size={24}></PiBuildingApartment>
          Apartment2
        </span>
      </Link>
      <Link to='/house'>
        <span className='flex items-center gap-2 border bg-white text-left rounded p-4'>
          <GiFamilyHouse></GiFamilyHouse>
          House
        </span>
      </Link>
      <Link to='/townhouse'>
        <span className='flex items-center gap-2 border bg-white text-left rounded p-4'>
          <PiHouseLine size={24}></PiHouseLine>
          Townhouse
        </span>
      </Link>
      <Link to='/room'>
        <span className='flex items-center gap-2 border bg-white text-left rounded p-4'>
          <LuDoorOpen size={24}></LuDoorOpen>
          Room
        </span>
      </Link>
      <Link to='/allavailable'>
        <span className=' flex items-center gap-2  border bg-white text-left rounded p-4'>
          <MdOutlineHolidayVillage size={24}></MdOutlineHolidayVillage>
          All available
        </span>
      </Link>
    </div>
  )
}
