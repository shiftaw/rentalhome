import React, { useState } from 'react'
import './menubar.css'
import {
  UserRoundPen,
  Mail,
  LogOut,
  CircleHelp,
  ChevronRight,
  LogIn,
} from 'lucide-react'
import clsx from 'clsx'
import { useAuth } from '@/context/authContext'
import { Link } from 'react-router-dom'

export default function NavWithProfile() {
  const { isLogged, user, setLogged } = useAuth()
  const [open, setOpen] = useState(false)
  const openCloseMenu = () => {
    setOpen((prev) => !prev)
  }

  const signOut = () => {
    setLogged(false)
    openCloseMenu()
  }

  return (
    <div className='bg-gray-800 text-black'>
      <nav className='menubar flex w-full items-center justify-between p-4 pl-2'>
        <Link to='/'>
          <img className='w-60' src='/img/gojjologo.png'></img>
        </Link>
        <ul className='w-full text-left mr-6'></ul>
        {isLogged ? (
          <img
            onClick={openCloseMenu}
            className='h-10 rounded-full'
            src='https://docs.material-tailwind.com/img/face-1.jpg'
          ></img>
        ) : (
          <svg
            onClick={openCloseMenu}
            className='block size-6 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            aria-hidden='true'
            data-slot='icon'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        )}
        <div className={clsx('sub-menu-wrap', open && 'menu-open')}>
          <div className='sub-menu'>
            {isLogged && (
              <>
                <div className='user-info'>
                  <img
                    className='h-10 rounded-full'
                    src='https://docs.material-tailwind.com/img/face-1.jpg'
                  ></img>
                  <h3 className='font-semibold'>{user.name}</h3>
                </div>
                <hr className='my-2'></hr>

                <Link className='sub-menu-link '>
                  <UserRoundPen />
                  <p>Edit profile</p>
                  <ChevronRight></ChevronRight>
                </Link>
                <Link
                  to='/messages'
                  onClick={openCloseMenu}
                  className='sub-menu-link '
                >
                  <Mail />
                  <p>Message</p>
                  <ChevronRight></ChevronRight>
                </Link>
              </>
            )}
            <Link className='sub-menu-link '>
              <CircleHelp />
              <p>Help</p>
              <ChevronRight></ChevronRight>
            </Link>
            {isLogged && (
              <Link className='sub-menu-link  ' onClick={signOut}>
                <LogOut className='' />
                <p>Logout</p>
                <ChevronRight className=''></ChevronRight>
              </Link>
            )}
            {!isLogged && (
              <Link
                to='/login'
                onClick={openCloseMenu}
                className='sub-menu-link '
              >
                <LogIn className='' />
                <p>Login</p>
                <ChevronRight className=''></ChevronRight>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
