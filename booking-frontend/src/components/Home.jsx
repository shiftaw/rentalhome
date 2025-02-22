import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    axios
      .get('https://your-backend-api-url.com/properties')
      .then((response) => {
        setProperties(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the properties!', error)
      })
  }, [])

  return (
    <div
      className='h-[400px]'
      style={{
        background: '#ED6B2D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:
          '-apple-system, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans,Helvetica Neue, sans-serif',
      }}
    >
      <div className='h-full px-4 text-white text-2xl flex justify-center flex-col'>
        <span className=' text-4xl  pb-6 sm:text-4xl sm:pb-8 font-semibold'>
          15.402 Properties for Rent
        </span>
        <input
          /* style={{
            height: 56,
            width: '100%',
            borderRadius: 4,
            border: '1px solid #fff',
            padding: '16px 20px',
          }} */
          className='border border-white  rounded text-black bg-white w-full h-14 px-4 py-4 active:border-red  focus:outline-white placeholder:text-black placeholder:text-base'
          placeholder='Search with address'
        />
      </div>
    </div>
  )
}
export default Home
