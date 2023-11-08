import './App.css'
import Navbar from './component/navbar'
import { Routes, Route, useNavigate } from 'react-router-dom'
import  {Home}  from './page/home'
import { auth } from './service/Auth'
import signuppage from './page/signuppage';
import { Loginpage } from './page/loginpage';
import CreateAccount from './page/create-account'
import { getallpost } from './service/Auth/database'
import { useEffect } from 'react'
import { UserDataProvider } from './service/context/usercontext'
function App() {
  const navigate=useNavigate()

useEffect(()=>{
  const datalogin=async()=>{
    await auth.onAuthStateChanged((user)=>{
      if(user){
        // navigate('/home')
        }
          })
  }
  datalogin();
},[])
  return (
    <UserDataProvider>
      <div className='mx-0'>
        <Routes>
          <Route path='/home' Component={Home} />
          <Route exect path='/' Component={signuppage} />
          <Route exect path='/create-account' Component={CreateAccount} />
          <Route exect path='/login' Component={Loginpage} />
        </Routes>
        
      </div>
    </UserDataProvider>


  )
}

export default App
