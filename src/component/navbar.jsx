import React, { useState } from 'react';
import CottageIcon from '@mui/icons-material/Cottage';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AddIcon from '@mui/icons-material/Add';
import IosShareIcon from '@mui/icons-material/IosShare';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

import { useuserdatacontext } from '../service/context/usercontext';
import { auth } from '../service/Auth';
import { useNavigate } from 'react-router-dom';
import { Popupitem } from '../ui/popup';
import { Createpost } from './createpost';
const Navbar = () => {
  const navigate = useNavigate()
  const { postpopup, userdata } = useuserdatacontext();
  const [post, setpost] = useState(false)

  return (
    <>
      <header className='p-2 hidden sm:block w-80 border-r-2 border-neutral-600 text-white'>
        <div className="fixed flex flex-col h-screen md:p-5 ">
          <div className="text-2xl pt-16 first-letter:text-3xl font-bold ">S</div>
          <nav className="flex my-auto align-middle text-xl justify-center capitalize flex-col space-y-5">
            <Link to="/home" ><span className='flex justify-center md:justify-start'><CottageIcon /><label className=' mx-2 md:block hidden' >home</label></span></Link>
            <Link to="/home" ><span className='flex justify-center md:justify-start '><SearchIcon /><label className='md:block hidden mx-2' >explore</label></span></Link>
            <Link to="/home" ><span className='flex justify-center md:justify-start '><NotificationsIcon /><label className='md:block hidden mx-2' >Notifications</label></span></Link>
            <Link to="/home" ><span className='flex justify-center md:justify-start  '><MessageIcon /><label className='md:block hidden mx-2' >Message</label></span></Link>
            <Link to="/home" ><span className='flex justify-center md:justify-start  '><PeopleIcon /><label className='md:block hidden mx-2' >community</label></span></Link>
            <Link to="/lists" ><span className='flex justify-center md:justify-start  '><BookmarksIcon /><label className='md:block mx-2 hidden' >Lists</label></span></Link>
            <Link to={`/profile/${userdata?.username}`} ><span className='flex justify-center md:justify-start  '><PersonIcon /><label className='md:block mx-2 hidden' >proflie</label></span></Link>

            <button onClick={() => {
              setpost(true)
            }} className='bg-blue-500 mr-auto text-white text-center md:px-5 p-2 capitalize rounded-full  md:w-40'><span className='flex justify-center space-x-2 '><AddIcon /><label className='md:block hidden' >post</label></span></button>

          </nav>
          {auth.currentUser ?
            <button onClick={async () => {
              await auth.signOut();
              navigate("/")
            }} className='bg-blue-500 text-white text-xl text-center p-2 md:px-5 my-5 m-auto  capitalize md:w-40 rounded-full'><span className='flex space-x-2 justify-center'><LogoutIcon /><label className='md:block hidden' >sign out</label></span></button>
          : <button onClick={async () => {
              
              navigate("/login")
            }} className='bg-blue-500 text-white text-xl text-center p-2 md:px-5 my-5 m-auto  capitalize md:w-40 rounded-full'><span className='flex space-x-2 justify-center'><LoginIcon/><label className='md:block hidden' >sign in</label></span></button>}

        </div>

      </header>



      {post && <Popupitem closefunction={() => { setpost(false) }}>
        <Createpost toggle={() => { setpost(false) }} />
      </Popupitem>
      }

      {/* mobile  */}

      <div className="sm:hidden z-40 fixed top-0 left-0  bg-neutral-900 w-full">
          <div className="flex px-3 my-4  align-middle justify-between">

            <Link to={`/profile/${userdata?.username}`} className='mx-4'>
              <img className='w-10 h-10 rounded-full border-gray-700 hover:border-gray-100 border-2  ' src={userdata?.profileImageURL} />
            </Link>
            
            <h1 className='text-3xl capitalize'>socialite</h1>

            <Link className='border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  ' to='/setting'><SettingsIcon/></Link>

          </div>
          <hr />
      </div>

      <div className="sm:hidden z-50 left-0 fixed bottom-0 w-full">
        <hr />
        <div className='flex py-5 rounded-sm bg-neutral-900'>
          <Link to="/home" className='mx-5 border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto'><span><CottageIcon /></span></Link>
          <Link className='mx-5 border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto' to="/serach" ><span><SearchIcon /></span></Link>
          <button onClick={() => {
            setpost(true)
          }} className='bg-blue-500 m-auto text-white text-center md:px-5 p-2 capitalize rounded-full  md:w-40'><span className='flex justify-center space-x-2 '><AddIcon /></span></button>

          <Link to="/home" className='mx-5 border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto' ><NotificationsIcon /></Link>
          <Link to={`/profile/${userdata?.username}`} className='mx-5 border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto' ><PersonIcon /></Link>
        </div>
      </div>
    </>
  )

}
export default Navbar;