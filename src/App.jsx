import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './page/home'
import { auth } from './service/Auth'
function App() {

  return (
    <BrowserRouter>
      <div className='bg-black container px-20'>
        { auth.currentUser &&  <Navbar />}
        <Routes>
          <Route exect path='/home' Component={Home} />
          <Route exect path='/signup' Component={Signup} />
        </Routes>
      </div>
    </BrowserRouter>


  )
}
import Signup from './page/login'

export default App
