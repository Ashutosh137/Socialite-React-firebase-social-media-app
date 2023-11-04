import React from 'react';
import CottageIcon from '@mui/icons-material/Cottage';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
        <Link to="/home" ><span className='flex space-x-2 space-x-8'><CottageIcon/><label className='sm:block hidden' >home</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 space-x-8'><SearchIcon/><label className='sm:block hidden' >explore</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 space-x-8'><NotificationsIcon/><label className='sm:block hidden' >Notifications</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 space-x-8'><MessageIcon/><label className='sm:block hidden' >Message</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 space-x-8'><PeopleIcon/><label className='sm:block hidden' >community</label></span></Link>
        <Link to="/home" ><span className='flex space-x-2 space-x-8'><BookmarksIcon/><label className='sm:block hidden' ></label>Lists</span></Link>
        <Link to="/home" ><span className='flex space-x-2 space-x-8'><PersonIcon/><label className='sm:block hidden' >proflie</label></span></Link>
        <button className='bg-blue-500 text-white text-center p-2  w-2/3 capitalize rounded-full'>post</button>

      </nav>
      
    </header>
  )

}
export default Navbar;