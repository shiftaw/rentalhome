import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useParams, Link } from 'react-router'
import { Button } from '../components/ui/button'
import axios from 'axios'
import DateLabel from '@/components/DateLabel'

const list = [
  { label: 'Monthly rent', value: '200 USD', key: 'month_rent' },
  { label: 'Available from', value: 'July 20,2025', key: 'available_from' },
  { label: 'Rental period', value: 'Two years', key: 'rent_period' },
]

const list2 = [
  { label: 'Type', value: 'No', key: 'type' },
  { label: 'Size', value: '140 m²', key: 'area' },
  { label: 'Rooms', value: 'Two years', key: 'rooms' },
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
    if (key == 'area') {
      return value + ' m²'
    }

    if (key === 'month_rent') return value + ' USD'
    if (typeof value == 'boolean') {
      if (value) {
        return 'Yes'
      } else {
        return 'No'
      }
    }
    return value
  }
  const handleSendMessage = () => {}
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
      className=' flex flex-col  gap-2 bg-white  w-full items-center '
      style={{ background: 'rgb(247, 247, 247)' }}
    >
      <div className='w-[393px] bg-["rgb(247,247,247)"] border pb-16'>
        <img
          className='max-h-[300px] w-full object-cover'
          src={detail?.image_url[0]}
        ></img>

        <div className='py-2 px-4 mb-8'>
          <div className='text-[#545454]'>
            <DateLabel date={detail?.created_at}></DateLabel>
          </div>
          <div className='pb-0 pt-3 font-bold text-xl text-[#1f1f1f]'>
            {detail?.rooms} rooms with {detail?.area} m²
          </div>
          <div className='text-md pb-4 text-[#545454]'>{detail?.address}</div>
          {list.map((item) => showList(item))}
          <div className='py-8 pb-4'>
            <span className='font-bold text-xl text-[#1f1f1f]'>
              Description
            </span>
            <p className='font-light  text-[#1f1f1f]'>{detail?.description}</p>
          </div>
          <h3 className='text-3xl pt-6 pb-1 font-bold'>Housing details</h3>
          <div className='w-[70px] h-[3px] bg-[#ff6633] mb-2'></div>
          {list2.map((item) => showList(item, true))}
        </div>
      </div>

      <div className='bg-white py-4 fixed bottom-0 w-full px-4 flex justify-between items-center border-b-1 border-gray-300 shadow-[0_0px_0px_1px_rgba(0,0,0,0.1)]'>
        <div className='flex flex-col'>
          <div className='text-[12px] text-[#808080]'>Monthly rent</div>
          <div className='text-[28px] font-bold'>
            {getValue('month_rent')} <span className='text-[12px]'></span>
          </div>
        </div>
        <Button onClick={handleSendMessage}>
          <Link to={`/send/${detail?.host?._id}`}>Send message</Link>
        </Button>
      </div>
    </div>
  )
}
