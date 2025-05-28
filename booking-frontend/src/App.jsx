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
import MessagesPage from './pages/MessagesPage'
import SendMEssage from './pages/SendMEssage'
import ConversationList from './components/ConversationList'
import Chat from './pages/Chat'
import CountryApartmentList from './pages/CountryApartmentList'
import Breadcrumbs from './components/Breadcrumbs'
import NavWithProfile from './components/NavWithProfile'

function App() {
  return (
    <AuthContextProvider>
      <Router cla>
        <div className='h-[calc(100dvh-80px)]'>
          <NavBar />
          <NavWithProfile></NavWithProfile>
          <Breadcrumbs />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/new_property' element={<CreateRentalProperty />} />
            <Route path='/detail/:id' element={<RentDetail />}></Route>
            <Route path='/book/:id' element={<BookingPage />} />
            <Route path='/reviews/:id' element={<ReviewPage />} />
            <Route path='/conversations' element={<ConversationList />} />
            <Route path='/messages/:id/' element={<Chat></Chat>} />
            <Route
              path='/apartment/'
              element={<CountryApartmentList></CountryApartmentList>}
            />
            <Route
              path='/room/'
              element={<CountryApartmentList></CountryApartmentList>}
            />
            <Route
              path='/house/'
              element={<CountryApartmentList></CountryApartmentList>}
            />
            <Route
              path='/townhouse/'
              element={<CountryApartmentList></CountryApartmentList>}
            />
            <Route
              path='/rent/:city'
              element={<CountryApartmentList></CountryApartmentList>}
            />
            <Route
              path='/rent'
              element={<CountryApartmentList></CountryApartmentList>}
            />
            <Route
              path='/rent/:city/detail/:id'
              element={<RentDetail></RentDetail>}
            />

            <Route
              path='/send/:id'
              element={<SendMEssage></SendMEssage>}
            ></Route>
            <Route
              path='/messages'
              element={<MessagesPage></MessagesPage>}
            ></Route>
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  )
}

export default App
