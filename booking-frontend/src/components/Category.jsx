import React from 'react'
import { BiSolidBuildingHouse } from 'react-icons/bi'
import { PiBuildingApartment } from 'react-icons/pi'
import { GiFamilyHouse } from 'react-icons/gi'
import { LuDoorOpen } from 'react-icons/lu'
import { MdOutlineHolidayVillage } from 'react-icons/md'
import { GiHouse } from 'react-icons/gi'
import { PiHouseLine } from 'react-icons/pi'

export default function Category() {
  return (
    <div className='grid grid-cols-2 gap-2 sm:grid sm:grid-cols-5'>
      <span className=' flex items-center gap-2 border bg-white text-left rounded p-4'>
        <PiBuildingApartment size={24}></PiBuildingApartment>
        Apartment
      </span>
      <span className='flex items-center gap-2 border bg-white text-left rounded p-4'>
        <GiFamilyHouse></GiFamilyHouse>
        House
      </span>
      <span className='flex items-center gap-2 border bg-white text-left rounded p-4'>
        <PiHouseLine size={24}></PiHouseLine>
        Townhouse
      </span>
      <span className='flex items-center gap-2 border bg-white text-left rounded p-4'>
        <LuDoorOpen size={24}></LuDoorOpen>
        Room
      </span>
      <span className=' flex items-center gap-2  border bg-white text-left rounded p-4'>
        <MdOutlineHolidayVillage size={24}></MdOutlineHolidayVillage>
        All available
      </span>
    </div>
  )
}
