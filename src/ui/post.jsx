import React, { useEffect, useState } from 'react'
import { auth } from '../service/Auth'
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import CropIcon from '@mui/icons-material/Crop';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Popupitem } from './popup';
import { useuserdatacontext } from '../service/context/usercontext';
import { get_userdata } from '../service/Auth/database';

export const Post = ({ post, popup }) => {
  const [active, setactive] = useState('')
  const { userdata, setuserdata,defaultprofileimage } = useuserdatacontext()

  const [postedby, setpostedby] = useState(null)

  useEffect(() => {
    const data = async () => {
      const postedby = await get_userdata(post.postedby)
      console.log(postedby)
      setpostedby(postedby);
    }
    data();
  }, [])


  function handelactive(act) {
    active === act ? setactive('') : setactive(act)
  }
  
  return (
    <div className='m-auto my-10 mx-5 text-lg flex flex-col'>
      <div className="flex w-full align-middle space-x-2 ">
        <img className='rounded-full bg-gray-400 outline outline-neutral-500 w-10 h-10' src={postedby?.profileImageURL || defaultprofileimage} alt="user" />
        <div className="flex  w-full mx-3 flex-col">
          <div className='flex w-full capitalize space-x-2'>
            <label className="font-semibold">{postedby?.name || null}</label>
            <label className="text-gray-500">@{postedby?.username || null}</label>
          </div>

          <pre className='text-sm  whitespace-pre-wrap my-2 font-sans w-full p-2 '>{post.content}</pre>

          <div className="w-full">
            {post?.img ? <img src={post?.img} className='object-fill h-96 w-full aspect-auto border-neutral-500 border-2 rounded-lg' alt="" /> : <></>}
          </div>

          <div className="flex text-lg mt-5 w-full  text-gray-400  space-x-2 m-2 justify-between">

            <div className="flex space-x-1" onClick={() => {
              post.comments.length > -1 && handelactive('comment')
            }}>
              <label className='text-gray-400' htmlFor="">{post.comments.length > 0 ? post.comments.length : ''}</label>
              <i className=''><InsertCommentIcon /></i>
            </div>

            <div className="flex space-x-1" onClick={() => {
              post.comments.length > -1 && handelactive('repost')
            }}>
              <label className='text-gray-400' htmlFor="">{post.repost?.length}</label>
              <i className=''><CropIcon /></i>
            </div>
            <div className="flex space-x-1" onClick={() => {
              post.comments.length > -1 && handelactive('like')
            }}>
              <label className='text-gray-400' htmlFor="">{post.likes.length > 0 ? post.comments.length : ''}</label>
              <i className=''><FavoriteBorderIcon /></i>
            </div>
            <div className="flex space-x-1" onClick={() => {
              post.comments.length > -1 && handelactive('save')
            }}>
              {/* <label className='text-gray-400' htmlFor="">{post.comments.length}</label> */}
              <i className=''><BookmarkBorderIcon /></i>
            </div>
            <div className="flex space-x-1" onClick={() => {
              post.comments.length > -1 && handelactive('more')
            }}>
              <i className=''><MoreHorizIcon /></i>
            </div>

          </div>


        </div>


      </div>
      {/* {active === 'comment' && <div className='w-full flex flex-col container m-2'>
        <form onSubmit={(e) => {
          e.preventDefault()
          setuserdata((userdata) => {
            return { ...userdata, }
          })


        }} className="flex my-2 border rounded-xl border-neutral-500 p-4 justify-around">

          <img src={userdata.profileImageURL} className='w-10 border-2 border-neutral-400  rounded-full' alt="" />
          <input autoFocus type="text" className='w-full mx-2 bg-black capitalize text-white border-2 px-4 border-white rounded-xl text-base' placeholder='write a comment ..' />
          <button className='bg-blue-500  text-white text-center sm:px-4 capitalize rounded-md  md:w-40'>comment</button>
        </form >
        <div>
          {post.comments.length <= 1 ? <div
            className='text-center text-gray-300 my-5 text-xl'>be the first comment</div> :
            post.comments.map((comment) => {
              return <div>
                {comment.content}
                ojoojjjjoojoojjo
              </div>
            })}
        </div>
      </div>} */}

      {popup && <>
        {active === 'comment' && <>
          <Popupitem closefunction={() => {
            setactive('')
          }}>
            <Post post={post} />
            <div className='w-full flex text-center flex-col container m-2'>
              <h2 className='text-2xl my-3'>comment</h2>
              <form onSubmit={(e) => {
                e.preventDefault()
                setuserdata((userdata) => {
                  return { ...userdata, }
                })


              }} className="flex my-2 border rounded-xl border-neutral-500 p-4 justify-around">

                <img src={userdata.profileImageURL} className='w-10 h-10  border-2 bg-gray-400 border-neutral-400  rounded-full' alt="" />
                <input autoFocus type="text" className='w-full mx-2 bg-black capitalize text-white border-2 px-4 border-white rounded-xl text-base' placeholder='write a comment ..' />
                <button className='bg-blue-500  text-white text-center p-2 sm:px-4 capitalize rounded-md  md:w-40'>comment</button>
              </form >
              <div>
                {post.comments.length <= 1 ? <div
                  className='text-center text-gray-300 my-5 text-xl'>be the first comment</div> :
                  post.comments.map((comment) => {
                    return <div>
                      {comment.content}
                      ojoojjjjoojoojjo
                    </div>
                  })}
              </div>
            </div>

          </Popupitem>
        </>}
      </>

      }
    </div>
  );
} 