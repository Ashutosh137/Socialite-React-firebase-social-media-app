import React from 'react';
import CottageIcon from '@mui/icons-material/Cottage';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import IosShareIcon from '@mui/icons-material/IosShare';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { useuserdatacontext } from '../service/context/usercontext';
import { auth } from '../service/Auth';
import { useNavigate } from 'react-router-dom';
import { Popupitem } from '../ui/popup';
import { Createpost } from './createpost';
const Navbar = () => {
  const navigate=useNavigate()
  const {postpopup,togglepost,userdata} = useuserdatacontext();

  return (
    <header className='w-20 p-2 sm:w-80 border-r-2 border-neutral-600  text-white'>
      <div className="fixed flex flex-col h-screen sm:p-5 ">
      <div className="text-2xl pt-16 first-letter:text-3xl font-bold ">
        S$s
      </div>
      
      <nav className="flex  my-auto align-middle text-xl justify-center capitalize flex-col space-y-5">
        <Link to="/home" ><span className='flex justify-center sm:justify-start'><CottageIcon/><label className=' mx-2 sm:block hidden' >home</label></span></Link>
        <Link to="/home" ><span className='flex justify-center sm:justify-start '><SearchIcon/><label className='sm:block hidden mx-2' >explore</label></span></Link>
        <Link to="/home" ><span className='flex justify-center sm:justify-start '><NotificationsIcon/><label className='sm:block hidden mx-2' >Notifications</label></span></Link>
        <Link to="/home" ><span className='flex justify-center sm:justify-start  '><MessageIcon/><label className='sm:block hidden mx-2' >Message</label></span></Link>
        <Link to="/home" ><span className='flex justify-center sm:justify-start  '><PeopleIcon/><label className='sm:block hidden mx-2' >community</label></span></Link>
        <Link to="/create-account" ><span className='flex justify-center sm:justify-start  '><BookmarksIcon/><label className='sm:block mx-2 hidden' >Lists</label></span></Link>
        <Link to={`/profile/${userdata?.username}`} ><span className='flex justify-center sm:justify-start  '><PersonIcon/><label className='sm:block mx-2 hidden' >proflie</label></span></Link>
        <button onClick={()=>{
          togglepost()
        }} className='bg-blue-500 mr-auto text-white text-center sm:px-5 p-2 capitalize rounded-full  md:w-40'><span className='flex justify-center space-x-2 '><IosShareIcon/><label className='sm:block hidden' >post</label></span></button>

      </nav>
      {auth.currentUser && <div>
        <button onClick={async ()=>{
          await auth.signOut();
          navigate("/")
        }} className='bg-blue-500 text-white text-xl text-center p-2 sm:px-5 my-5 m-auto  capitalize md:w-40 rounded-full'><span className='flex space-x-2 justify-center'><ExitToAppIcon/><label className='sm:block hidden' >sign out</label></span></button>
        </div>}

        {postpopup && <Popupitem closefunction={togglepost}>
       <Createpost toggle={togglepost}/>
        
      </Popupitem>
      }
      </div>
      
      
    </header>
  )

}
export default Navbar;