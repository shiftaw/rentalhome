import React, { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {
  const [isLogged, setLogged] = useState(false)
  const [user, setUser] = useState({})
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (token) {
      setLogged(true)
      console.log('response', 'trigger')
    }
  }, [token])

  return (
    <AuthContext.Provider
      value={{ isLogged, setLogged, user, setUser, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const useAuth = () => {
  const { isLogged, setLogged, user, setUser, token, setToken } =
    useContext(AuthContext)

  return { isLogged, setLogged, user, setUser, token, setToken }
}
