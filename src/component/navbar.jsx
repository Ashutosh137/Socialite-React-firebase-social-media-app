import React from 'react';
import CottageIcon from '@mui/icons-material/Cottage';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { Link } from 'react-router-dom';
import { useuserdatacontext } from '../service/context/usercontext';
import { auth } from '../service/Auth';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate=useNavigate()
  const {postpopup,togglepost} = useuserdatacontext();

  return (
    <header className='flex justify-between w-1/4 h-screen flex-col text-white  p-1'>
      <div className="text-2xl pt-16 first-letter:text-3xl font-bold ">
        Socialite
      </div>
      {/* <div className="m-auto max-w-prose w-full">
        <form>
          <input className='text-xl border-2 rounded-xl border-black text-gray-900 p-2 px-4 w-full' type="search" placeholder="Search for products..." />
        </form>

      </div> */}

      <nav className="flex my-auto align-middle text-xl align-middle capitalize flex-col space-y-5">
        <Link to="/home" ><span className='flex space-x-2 '><CottageIcon/><label className='sm:block hidden' >home</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 '><SearchIcon/><label className='sm:block hidden' >explore</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 '><NotificationsIcon/><label className='sm:block hidden' >Notifications</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 '><MessageIcon/><label className='sm:block hidden' >Message</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 '><PeopleIcon/><label className='sm:block hidden' >community</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 '><BookmarksIcon/><label className='sm:block hidden' >Lists</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 '><PersonIcon/><label className='sm:block hidden' >proflie</label></span></Link>
        <button onClick={()=>{
          togglepost()
        }} className='bg-blue-500 text-white text-center p-2 capitalize rounded-full'>post</button>

      </nav>
      {auth.currentUser && <div>
        <button onClick={async ()=>{
          await auth.signOut();
          navigate("/")
        }} className='bg-blue-500 text-white text-xl text-center p-2 my-5  w-2/3 capitalize rounded-full'>sign-out</button>
        </div>}
      
    </header>
  )

}
export default Navbar;