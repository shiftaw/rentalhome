import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ReviewPage = () => {
  const { id } = useParams()
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)

  const handleSubmit = () => {
    const token = localStorage.getItem('token')
    axios
      .post(
        `https://your-backend-api-url.com/properties/${id}/reviews`,
        { review, rating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert('Review submitted')
      })
      .catch((error) => {
        console.error('Error submitting review', error)
      })
  }

  return (
    <div className='p-8'>
      <h2 className='text-2xl mb-4'>Leave a Review</h2>
      <textarea
        className='w-full p-2 border border-gray-300 rounded-md'
        rows='4'
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder='Write your review here'
      />
      <div className='mt-2'>
        <input
          type='number'
          min='1'
          max='5'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className='w-20 p-2 border border-gray-300 rounded-md'
        />
      </div>
      <button
        onClick={handleSubmit}
        className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md'
      >
        Submit Review
      </button>
    </div>
  )
}

export default ReviewPage
