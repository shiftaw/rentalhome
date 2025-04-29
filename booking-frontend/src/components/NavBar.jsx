import { useAuth } from '@/context/authContext'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const { isLogged, setLogged } = useAuth()
  const closeMenu = () => {
    setOpen(false)
  }

  const signOut = () => {
    localStorage.removeItem('token')
    closeMenu()
  }

  const onNavigateToLogin = () => {}
  return (
    <nav className='bg-gray-800'>
      <div className='mx-auto max-w-7xl px-2 sm:px-2 lg:px-2'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/*         <!-- Mobile menu button-->
             */}
            <button
              onClick={() => setOpen(!open)}
              type='button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              {/*  <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
              <svg
                className='block size-6'
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
              {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
              <svg
                className='hidden size-6'
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
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='flex   flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex shrink-0 items-center'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500'
                alt='Your Company'
              />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-4'>
                {/*             <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                 */}
                <a
                  href='#'
                  className='rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                  aria-current='page'
                >
                  Dashboard
                </a>
                <a
                  href='#'
                  className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                >
                  Team
                </a>
                <a
                  href='#'
                  className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                >
                  Projects
                </a>
                <a
                  onClick={signOut}
                  href='#'
                  className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                >
                  Log out
                </a>
              </div>
            </div>
          </div>
          <div className='absolute  inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <button
              type='button'
              className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden'
            >
              <span className='absolute -inset-1.5'></span>
              <span className='sr-only'>View notifications</span>
              <svg
                className='size-6'
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
                  d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
                />
              </svg>
            </button>
            {/*         <!-- Profile dropdown -->
             */}
            <div className='relative ml-4'>
              {isLogged && (
                <div className='p-0  size-8 overflow-clip  flex justify-center items-center'>
                  <button
                    type='button'
                    className=' z-10 bg-red-500 relative flex rounded-full text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden p-0'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                  >
                    <span className='absolute '></span>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='size-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </button>
                </div>
              )}
              {!isLogged && (
                <div className='w-full h-full  '>
                  <button
                    onClick={onNavigateToLogin}
                    style={{ background: '#00000000', color: 'white' }}
                  >
                    <Link to='/login'>Login</Link>
                  </button>
                </div>
              )}

              {/*  <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
            </div>
          </div>
        </div>
      </div>
      {/*   <!-- Mobile menu, show/hide based on menu state. -->
       */}{' '}
      <div className='sm:hidden absolute bg-gray-800 w-full' id='mobile-menu'>
        {open && (
          <div className='space-y-1 px-2 pt-2 pb-3'>
            {/*       <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
             */}{' '}
            <Link
              onClick={closeMenu}
              to='/'
              className='block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'
              aria-current='page'
            >
              Dashboard
            </Link>
            <a
              onClick={closeMenu}
              href='#'
              className='block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            >
              Team
            </a>
            <a
              onClick={closeMenu}
              href='#'
              className='block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            >
              Projects
            </a>
            <a
              onClick={signOut}
              href='#'
              className='block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            >
              Log out
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
