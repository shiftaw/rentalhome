import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'https://rentalhome-i7wr.onrender.com/auth/login',
        { email, password }
      )
      localStorage.setItem('token', response.data.access_token)
      navigate('/')
    } catch (error) {
      console.error('Error logging in', error)
    }
  }

  return (
    <div className='max-w-sm mx-auto p-4'>
      <h2 className='text-2xl mb-4'>Login</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='email'
          className='w-full p-2 border border-gray-300 rounded-md'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          className='w-full p-2 border border-gray-300 rounded-md'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-md'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
