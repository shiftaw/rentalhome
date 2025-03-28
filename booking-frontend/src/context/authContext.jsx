import React, { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {
  const [isLogged, setLogged] = useState(true)

  useEffect(() => {
    //localStorage.setItem("lastname", "Smith");
    const token = localStorage.getItem('token')
    if (token) {
      setLogged(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLogged, setLogged }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const useAuth = () => {
  const { isLogged, setLogged } = useContext(AuthContext)

  return { isLogged, setLogged }
}
