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
import PageLoadingWrapper from './PageLoadingWrapper'
import { useAuth } from '@/context/authContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setUser, setToken, setLogged } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      })
      console.log({ response })
      setUser(response.data.user)
      setToken(response.data.access_token)
      setLogged(true)
      navigate('/')
      setIsLoading(false)
    } catch (error) {
      console.error('Error logging in', error)
      setIsLoading(false)
    }
  }

  return (
    <PageLoadingWrapper isLoading={isLoading}>
      <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
        <Card className='w-full max-w-sm md:max-w-md shadow-md rounded-2xl p-6 mt-[-150px]'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold'>Log ind</CardTitle>
          </CardHeader>
          <CardContent>
            <form className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <Label htmlFor='email' className='text-sm'>
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  placeholder='you@example.com'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <Label htmlFor='password' className='text-sm'>
                  Password
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
                Log in
              </Button>
            </form>
          </CardContent>
          <CardFooter className='flex flex-col gap-2 text-center text-sm text-gray-600'>
            <Link to='/register' className=' hover:underline'>
              <div className='text-gray-600'>Create account </div>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </PageLoadingWrapper>
  )
}
