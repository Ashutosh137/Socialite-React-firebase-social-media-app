import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import { useuserdatacontext } from '../service/context/usercontext';
import { auth } from '../service/Auth';
import { Popupitem } from '../ui/popup'
import { createnewpost, get_userdata, getallpost, getallprofile } from '../service/Auth/database';
import { Post } from '../ui/post';
import { Createpost } from '../component/createpost';
import Profileviewbox from '../component/profileviewbox';

export const Home = () => {
  const { postpopup, togglepost } = useuserdatacontext();
  const [psttext, setpsttext] = useState('')
  const [allpostdata, setallpostdata] = useState([])
  const [alluser, setalluser] = useState([])

  if (allpostdata == [null] || alluser ==[null]) {
    return <></>
  }

  useEffect(() => {
    const dataforallpost = async () => {
      const allpost = await getallpost();
      setallpostdata(allpost)
    }
    const dataforallusers=async ()=>{
      const alluser=await getallprofile();
      setalluser(alluser)
      console.log(alluser)
    }


    dataforallpost()
    dataforallusers()
  }, [])

  return (
    <div className='flex w-full '>
      <Navbar />
      <div className="w-full">
        <div className="">
          <Createpost />
        </div>
        <div className="">
          {allpostdata.map((postarray, index) => {
            return <>{postarray.map((post, index) => {
              return <div className="">
                <Post postdata={post} popup={true} />
              </div>
            })}</>
          })}
        </div>
      </div>
      <div className="w-1/3 mx-2 hidden md:block">
        <h2 className="text-2xl text-center text-white capitalize my-3 font-semibold">who to follow</h2>
        <div className="flex flex-col space-y-2">
          {alluser.map((proflie,index)=>{
            return  <Profileviewbox index={index} profile={proflie}/>
          })
          }
       
        </div>
      </div>
    </div>
  )
}
