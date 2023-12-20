import React from 'react'
import Navbar from '../component/navbar'
import { useuserdatacontext } from '../service/context/usercontext'
import { Post } from '../ui/post'
import { useNavigate } from 'react-router-dom'

export const List = () => {
    const {userdata}=useuserdatacontext()
    const navigate=useNavigate()

    return (
        <div className='flex w-full '>
            <Navbar />
            <div className="w-full">
                <h1 className='text-3xl font-serif m-5 text-center capitalize '>saved post</h1>

                <div className="">
                    {userdata?.saved.length >0 ? <> {userdata?.saved.map((item,index)=>{
                        return <Post  postdata={item} popup={true} />
                    })}</>: <div className='text-3xl capitalize text-center py-10 m-auto'><div className="flex flex-col space-y-20 justify-center align-middle">
                        <label htmlFor="" className='text-xl'>Nothing to see here yet — pin your favorite Lists to access them quickly.</label>
                        <button className='bg-blue-500 text-white text-xl text-center p-2 md:px-5  m-auto capitalize md:w-40 rounded-full'  onClick={()=>{
                            navigate('/home')
                        }}>Add Post</button></div></div>}
                </div>
                
            </div>
        </div>
    )
}
