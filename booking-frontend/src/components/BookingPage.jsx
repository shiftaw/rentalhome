import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Calendar from 'react-calendar'

const BookingPage = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    axios
      .get(`https://your-backend-api-url.com/properties/${id}`)
      .then((response) => {
        setProperty(response.data)
      })
      .catch((error) => {
        console.error('Error fetching property', error)
      })
  }, [id])

  const handleBooking = () => {
    const token = localStorage.getItem('token')
    axios
      .post(
        'https://your-backend-api-url.com/book',
        { propertyId: id, date: selectedDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert('Booking successful!')
      })
      .catch((error) => {
        alert('Error booking property')
      })
  }

  return (
    <div className='p-8'>
      {property && (
        <>
          <h1 className='text-3xl'>{property.name}</h1>
          <p>{property.description}</p>
          <img
            src={property.image_url}
            alt={property.name}
            className='w-full h-48 object-cover mt-4'
          />
          <div className='mt-4'>
            <h2 className='text-xl'>Select a Date</h2>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          </div>
          <button
            onClick={handleBooking}
            className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md'
          >
            Book Now
          </button>
        </>
      )}
    </div>
  )
}

export default BookingPage
