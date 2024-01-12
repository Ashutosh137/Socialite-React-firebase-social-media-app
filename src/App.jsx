import './App.css'
import Navbar from './component/navbar'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home } from './page/home'
import { auth } from './service/Auth'
import signuppage from './page/signuppage';
import { Loginpage } from './page/loginpage';
import CreateAccount from './page/create-account'
import { get_userdata, getallpost } from './service/Auth/database'
import { useEffect, useState } from 'react'
import { UserDataProvider, useuserdatacontext } from './service/context/usercontext'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Profile } from './component/profile'
import { Profilepage } from './page/profilepage'
import { List } from './page/list'
import Seepost from './component/seepost'

function App() {
  const navigate = useNavigate()
  const [userdata, setuserdata] = useState(null)

  // useEffect(() => {
  //   if (auth?.currentUser) { navigate('/home') }
  //   else { navigate('/') }
  // })

  console.log('auth condtion ', auth.currentUser)

  return (
    <UserDataProvider value={userdata}>
      <div className=' mt-24 mb-16 md:mx-16 sm:mb-0 sm:mt-5'>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route path='/home' Component={Home} />
          <Route exect path='/' Component={signuppage} />
          <Route exect path='/create-account' Component={CreateAccount} />
          <Route exect path='/login' Component={Loginpage} />
          <Route exect path='/profile/:username' Component={Profilepage} />
          <Route exect path='/profile/:username/:postid' Component={Seepost} />
          <Route exect path='/lists' Component={List} />
        </Routes>
      </div>
    </UserDataProvider>


  )
}

export default App
