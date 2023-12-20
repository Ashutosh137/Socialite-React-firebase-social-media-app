import React from 'react'
import { useuserdatacontext } from '../service/context/usercontext'
import { useNavigate } from 'react-router-dom'

export default function Profileviewbox({profile}) {
  const navigate=useNavigate()

  return (
    <div className='flex w-80 p-2 justify-between bg-neutral-950 align-middle '>
      <img src={profile?.profileImageURL} className='rounded-full w-10 h-10 my-auto mx-1' alt="" />
      <div className="flex m-1 flex-col cursor-pointer" onClick={()=>{
      navigate(`/profile/${profile?.username}`)
     }}>
        <label className='text-base' htmlFor="">{profile?.name}</label>
        <label className='text-sm text-gray-400 ' htmlFor="">@{profile?.username}</label>
      </div>
      <div className=' px-4 my-auto ml-auto'>
      <button className='bg-white hover:bg-slate-200 rounded-full shadow-lg ml-auto font-medium text-black
     capitalize py-1 px-4  self-center' onClick={()=>{
      navigate(`/profile/${profile?.username}`)
     }}>Follow</button>
      </div>
    </div>
  )
}
