import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useParams } from 'react-router'
import { Button } from '../components/ui/button'
import axios from 'axios'

/*title: '',
    rooms: '',
    area: '',
    month_rent: '',
    deposit: '',
    prepaid_rent: '',
    sharable: false,
    pets_allowed: false,
    senior_friendly: false,
    for_student_only: false,
    elevator: false,
    parking: false,
    balcony: false,
    charging_station: false,
    dishwasher: false,
    washing_machine: false,
    tumbler_dryer: false,
    refrigerator: false,
    furnished: false,
    digital_display: false,
    message_via_app: false,
    telephone_contact: false,
    telephone_number: '',
    description: '',
    rent_period: '1 year',
    available_from: '',*/

const list = [
  { label: 'Monthly rent', value: '200 USD', key: 'month_rent' },
  { label: 'Available from', value: 'July 20,2025', key: 'available_from' },
  { label: 'Rental period', value: 'Two years', key: 'rent_period' },
]

const list2 = [
  { label: 'Monthly rent', value: '200Usd', key: 'month_rent' },
  { label: 'Size', value: '140 m²', key: 'area' },
  { label: 'Rooms', value: 'Two years', key: 'rooms' },
  { label: 'Floor', value: '_', key: 'furnished' },
  { label: 'Furnished', value: 'No', key: 'furnished' },
  { label: 'Elevator', value: 'Yes', key: 'elevator' },
  { label: 'Balcony/ terrace', value: 'No', key: 'balcony' },
  { label: 'Parking', value: 'Yes', key: 'parking' },
  { label: 'Dishwasher', value: 'No', key: 'dishwasher' },
  { label: 'Washing machine', value: 'No', key: 'washing_machine' },
  { label: 'Tumbler dryer', value: 'No', key: 'tumbler_dryer' },
]

export default function RentDetail() {
  let params = useParams()
  const [detail, setDetail] = useState(null)

  const fetch_data = async (id) => {
    try {
      const response = await axios.get(`/api/rent/detail/${id}`)
      console.log(JSON.parse(response.data))
      setDetail(JSON.parse(response.data))
    } catch (error) {
      console.error('There was an error fetching the properties!', error)
    }
  }

  const getValue = (key) => {
    if (detail == null) return null
    const value = detail[key]

    if (key === 'available_from') {
      return new Date(value).toDateString()
    }

    if (typeof value == 'boolean') {
      console.log({ value })
      if (value) {
        return 'Yes'
      } else {
        return 'No'
      }
    }
    return value
  }

  useEffect(() => {
    const id = params.id
    fetch_data(id)
  }, [])
  const showList = (item, border = false) => {
    return (
      <div
        className={clsx(
          'flex justify-between  text-md text-[#1f1f1f] pb-2',
          border && 'border-b-1',
          'py-2 border-[#eaeaea]'
        )}
      >
        <span>{item.label}</span>
        <span className='font-bold'>{getValue(item.key)}</span>
      </div>
    )
  }
  return (
    <div
      className=' flex flex-col items-center gap-2 bg-white  '
      style={{ background: 'rgb(247, 247, 247)' }}
    >
      <div className='max-w-md bg-["rgb(247,247,247)"] border pb-16'>
        <img src='/img/detail.png'></img>

        <div className='py-2 px-4 mb-8'>
          <div className='text-[#545454]'>7. april</div>
          <div className='pb-0 pt-3 font-bold text-xl text-[#1f1f1f]'>
            4 bedroom hus på 140 m²
          </div>
          <div className='text-md pb-4 text-[#545454]'>
            Kirkegyden, 5642 Millinge, Svanninge
          </div>
          {list.map((item) => showList(item))}
          <h3 className='text-3xl pt-6 pb-1 font-bold'>Housing details</h3>
          <div className='w-[70px] h-[3px] bg-[#ff6633] mb-2'></div>
          {list2.map((item) => showList(item, true))}
        </div>
      </div>
      <div className='bg-white py-4 fixed bottom-0 w-full px-4 flex justify-between items-center border-b-1 border-gray-300 shadow-[0_0px_0px_1px_rgba(0,0,0,0.1)]'>
        <div className='flex flex-col'>
          <div className='text-[12px] text-[#808080]'>Monthly rent</div>
          <div className='text-[28px] font-bold'>
            {getValue('month_rent')} <span className='text-[12px]'>USD</span>
          </div>
        </div>
        <Button>Send message</Button>
      </div>
    </div>
  )
}
