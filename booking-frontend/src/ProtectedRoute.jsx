import { Navigate } from 'react-router-dom'
import { useAuth } from './context/authContext'

export function RequireAuth({ children }) {
  const { isLogged } = useAuth()

  console.log({ isLogged })

  if (!isLogged) {
    return <Navigate to='/login' replace />
  }

  return children
}
