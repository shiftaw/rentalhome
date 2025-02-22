import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import BookingPage from './components/BookingPage'
import ReviewPage from './components/ReviewPage'
import NavBar from './components/NavBar'

function App() {
  return (
    <Router cla>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/book/:id' element={<BookingPage />} />
        <Route path='/reviews/:id' element={<ReviewPage />} />
      </Routes>
    </Router>
  )
}

export default App
