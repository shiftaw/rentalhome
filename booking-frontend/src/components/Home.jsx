import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddItem from './AddItem'

const Home = () => {
  const [properties, setProperties] = useState([])

  const fetch_data = async () => {
    try {
      const response = await axios.get('/api/rent/all')
      console.log(JSON.parse(response.data))
      setProperties(JSON.parse(response.data))
    } catch (error) {
      console.error('There was an error fetching the properties!', error)
    }
  }

  useEffect(() => {
    fetch_data()
  }, [])

  return (
    <div style={{ background: '#f7f7f7', padding: 0 }}>
      <div
        className='h-[400px] w-full'
        style={{
          background: '#ED6B2D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily:
            '-apple-system, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans,Helvetica Neue, sans-serif',
        }}
      >
        <Link to='/new_property' style={{ background: 'transparent' }}>
          <div>new_property</div>
        </Link>
        <div className='h-full px-4 text-white text-2xl flex justify-center flex-col'>
          <span className=' text-4xl  pb-6 sm:text-4xl sm:pb-8 font-semibold'>
            15.402 Properties for Rent
          </span>
          <input
            className='border border-white  rounded text-black bg-white w-full h-14 px-4 py-4 active:border-red  focus:outline-white placeholder:text-black placeholder:text-base'
            placeholder='Search with address'
          />
        </div>
      </div>
      <div
        style={{ background: '#223663' }}
        className=' h-16 md:h-48 w-full'
      ></div>
      <div className='pt-16   text-gray-950 text-lg px-4'>
        <div className=' text-gray-950 text-2xl font-semibold  mb-4'>
          Category
        </div>
        <div className='flex flex-col  gap-2'>
          <div className='flex gap-2'>
            <span className='w-full  border bg-white text-left rounded p-4'>
              Apartment
            </span>
            <span className='w-full border bg-white text-left rounded p-4'>
              Room
            </span>
          </div>
          <div className='flex gap-2'>
            <span className='w-full border bg-white text-left rounded p-4'>
              House
            </span>
            <span className='w-full border bg-white text-left rounded p-4'>
              Villa
            </span>
          </div>
          <span className='w-full  border bg-white text-left rounded p-4'>
            All available{' '}
          </span>
        </div>
      </div>
      <div className='pt-16   pb-8 px-4'>
        <div className=' text-gray-950 text-2xl font-semibold  mb-4 '>
          Popular cities
        </div>
        <div className='flex  flex-col mb-8    '>
          <div className='flex gap-x-2  '>
            <img className=' w-[49%] rounded-t' src='./img/Kobenhavn.png'></img>
            <img className=' w-[49%] rounded-t' src='./img/Aarhus.jpeg'></img>
          </div>
          <div className='flex  w-full   gap-x-2 rounded-b overflow-clip '>
            <div className=' p-4 bg-white border w-[49%]  block text-l font-semibold ext-gray-950'>
              Copenhagen
            </div>
            <div className='p-4 bg-white border  w-[49%]  text-l font-semibold text-gray-950'>
              Aarhus
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-8 sm:p-4 sm:gap-4 lg:grid-cols-4 lg:px-32'>
        {properties.map((ad) => {
          return <AddItem {...ad}></AddItem>
        })}
      </div>
      <div className='py-1'></div>
      <footer>
        <div className='bg-[#202020] py-16 text-white'>Footer</div>
      </footer>
    </div>
  )
}
export default Home
