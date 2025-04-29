import { Navigate } from 'react-router-dom'

export function RequireAuth({ children }) {
  const isLoggedIn = !!localStorage.getItem('token')

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />
  }

  return children
}
