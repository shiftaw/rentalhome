import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/register', {
        email,
        password,
        name,
      })
      localStorage.setItem('token', response.data.access_token)
      navigate('/')
    } catch (error) {
      console.error('Error logging in', error)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <Card className='w-full max-w-sm md:max-w-md shadow-md rounded-2xl p-6 mt-[-150px]'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold'>Register </CardTitle>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='name' className='text-sm'>
                Name
              </Label>
              <Input
                id='name'
                type='text'
                placeholder='Your name'
                name={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='email' className='text-sm'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='password' className='text-sm'>
                password
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type='submit'
              className='w-full mt-2'
              onClick={handleSubmit}
            >
              Create account
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col gap-2 text-center text-sm text-gray-600'>
          <div>Already have an account?</div>
          <Link to='/login' className=' hover:underline'>
            <span className='text-gray-600'>Log in</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
