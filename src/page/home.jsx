import React from 'react';
import Navbar from '../component/navbar';
import { useuserdatacontext } from '../service/context/usercontext';
import {Popup} from  '../ui/popup'

export const Home = () => {
  const {postpopup,togglepost} = useuserdatacontext();
  return (
    <div>
      <Navbar />
     {postpopup && <Popup closefunction={togglepost}>
      
<div className="text-center capitalize">
  <form action="
  " className='flex flex-col space-y-4'>
    <textarea type="text" className='px-5 placeholder:capitalize placeholder:font-serif placeholder:text-neutral-500  sm:text-lg text-sm p-2 border-1 border-black  rounded-2xl my-2 border text-black ' />
    <button className='bg-blue-500 text-white text-center p-2 capitalize rounded-full'>post</button>
  </form>
</div>
      </Popup>
      } 

    </div>
  )
}
