// components/Breadcrumbs.jsx
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
  const location = useLocation()

  const pathnames = location.pathname.split('/').filter((x) => x)
  if (pathnames.length == 0) return null
  return (
    <nav className='text-md font-light text-gray-500 my-4 ml-4'>
      <Link className='font-light text-[#686868]' to='/'>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = '/' + pathnames.slice(0, index + 1).join('/')
        const isLast = index === pathnames.length - 1

        return (
          <span font-light className='text-md text-gray-500' key={to}>
            {' / '}
            {isLast ? (
              <span>{decodeURIComponent(value)}</span>
            ) : (
              <Link className=' text-md font-light text-gray-500' to={to}>
                {decodeURIComponent(value)}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
