import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddItem from './AddItem'
import PopularCity from './PopularCity'
import Category from './Category'

const Home = () => {
  const [properties, setProperties] = useState([])
  const [cities, setCities] = useState([])

  const fetch_data = async () => {
    try {
      const response = await axios.get('/api/rent/all')
      setProperties(JSON.parse(response.data))
    } catch (error) {
      console.error('There was an error fetching the properties!', error)
    }
    // /api/country/all
  }

  const fetch_cities = async () => {
    try {
      const response = await axios.get('/api/country/all')
      setCities(JSON.parse(response.data))
    } catch (error) {
      console.error('There was an error fetching the properties!', error)
    }
    // /api/country/all
  }
  useEffect(() => {
    fetch_data()
    fetch_cities()
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
        <Category></Category>
      </div>
      <div className='pt-16   pb-8 px-4'>
        <div className=' text-gray-950 text-2xl font-semibold  mb-4 '>
          Popular cities
        </div>
        <div className='flex w-full overflow-x-auto'>
          {cities.map((city) => {
            return (
              <PopularCity
                city={city?.city}
                img='/img/Kobenhavn.png'
              ></PopularCity>
            )
          })}
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-8 sm:p-4 sm:gap-4 lg:grid-cols-4 lg:px-2'>
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
