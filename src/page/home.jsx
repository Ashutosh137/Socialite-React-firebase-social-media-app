import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import { useuserdatacontext } from '../service/context/usercontext';
import { auth } from '../service/Auth';
import { Popupitem } from '../ui/popup'
import { createnewpost, get_userdata, getallpost } from '../service/Auth/database';
import { Post } from '../ui/post';
import { Createpost } from '../component/createpost';

export const Home = () => {
  const { postpopup, togglepost } = useuserdatacontext();
  const [psttext, setpsttext] = useState('')
  const [allpostdata, setallpostdata] = useState([])

  if (allpostdata == [null]) {
    return <></>
  }

  useEffect(() => {
    const data = async () => {
      const allpost = await getallpost();
      setallpostdata(allpost)
      console.log(allpost)
    }
    data()
  }, [])

  return (
    <div className='flex flex-nowrap '>
      <Navbar />
      <div className="w-full">

        <div className="m-10">
          <Createpost />
        </div>
        <div className="m-4">
          {allpostdata.map((postarray, index) => {
            console.log(postarray)
            return <>{postarray.map((post, index) => {
              return <div className="">
                <Post post={post} popup={true} />
              </div>
            })}</>
          })}
        </div>
      </div>






    </div>
  )
}
