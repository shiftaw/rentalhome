import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './pages/Login'
import BookingPage from './components/BookingPage'
import ReviewPage from './components/ReviewPage'
import NavBar from './components/NavBar'
import AuthContextProvider from './context/authContext'
import CreateRentalProperty from './pages/CreateRentalProperty'
import RentDetail from './pages/RentDetail'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <AuthContextProvider>
      <Router cla>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/new_property' element={<CreateRentalProperty />} />
          <Route path='/detail/:id' element={<RentDetail />}></Route>
          <Route path='/book/:id' element={<BookingPage />} />
          <Route path='/reviews/:id' element={<ReviewPage />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  )
}

export default App
