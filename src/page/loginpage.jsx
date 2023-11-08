import React from 'react'
import Login from '../ui/login'
import { signinwithemail } from '../service/Auth';
import { useNavigate } from 'react-router-dom';
export const Loginpage = () => {
    const navigate=useNavigate()
    const handelsubmit=async (email,pass)=>{
        await signinwithemail(email,pass);
        navigate("/home")
    }
  return (
    <div className='w-full flex flex-wrap py-6  capitalize'>
    <div className=' m-auto outline xl:block hidden p-1  outline-gray-200'><img className='w-80' src="https://scontent.fdel29-1.fna.fbcdn.net/v/t39.30808-1/355307917_667921932016418_287507578975419326_n.png?stp=dst-png_p120x120&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3_-K32pxBm0AX8fW-1r&_nc_oc=AQleGbLhy5ny28EqjxaGcMm_xvqhpBAUiGRKjWZBpWGUluvgq6e4Kq5TimZPNqviWrQ&_nc_ht=scontent.fdel29-1.fna&oh=00_AfCYivTHW7C2ZZju-JvvL81IzLjA8yXvvNWYmgPIlAoSJg&oe=654AB3A6" alt="" /></div>
    <div className='xl:w-1/2 '>
        <div className=' my-10'>
            <h1 className='text-6xl text-left my-16 font-sans font-bold '>login  </h1>
        </div>
        <Login onenter={()=>{
          handelsubmit()
        }} role="login"/>
    </div>
</div>
  )
}
