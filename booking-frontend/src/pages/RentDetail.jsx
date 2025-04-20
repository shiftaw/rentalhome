import React from 'react'
import clsx from 'clsx'
import { Button } from '../components/ui/button'

const list = [
  { key: 'Monthly rent', value: '200 USD' },
  { key: 'Available from', value: 'July 20,2025' },
  { key: 'Rental period', value: 'Two years' },
]

const list2 = [
  { key: 'Housing type', value: '200Usd' },
  { key: 'Size', value: '140 m²' },
  { key: 'Rooms', value: 'Two years' },
  { key: 'Floor', value: '_' },
  { key: 'Furnished', value: 'No' },
  { key: 'Elevator', value: 'Yes' },
  { key: 'Balcony/ terrace', value: 'No' },
  { key: 'Parking', value: 'Yes' },
  { key: 'Dishwasher', value: 'No' },
  { key: 'Washing machine', value: 'No' },
  { key: 'Tumbler dryer', value: 'No' },
]

export default function RentDetail() {
  const showList = (item, border = false) => {
    return (
      <div
        className={clsx(
          'flex justify-between  text-md text-[#1f1f1f] pb-2',
          border && 'border-b-1',
          'py-2 border-[#eaeaea]'
        )}
      >
        <span>{item.key}</span>
        <span className='font-bold'>{item.value}</span>
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

        <div className='py-2 px-4'>
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
            8000 <span className='text-[12px]'>USD</span>
          </div>
        </div>
        <Button>Send message</Button>
      </div>
    </div>
  )
}
