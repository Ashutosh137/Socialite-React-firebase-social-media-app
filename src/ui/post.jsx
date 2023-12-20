import React, { useEffect, useState } from 'react'
import { auth } from '../service/Auth'
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import CropIcon from '@mui/icons-material/Crop';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Popupitem } from './popup';
import { useuserdatacontext } from '../service/context/usercontext';
import { get_userdata } from '../service/Auth/database';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Comment from './comment';

export const Post = ({ postdata, popup }) => {
  const [active, setactive] = useState('')
  const { userdata, setuserdata, defaultprofileimage } = useuserdatacontext()

  const [post, setpost] = useState(postdata)

  const [commenttext, setcommenttext] = useState('')


  const [postedby, setpostedby] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    const data = async () => {
      const postedby = await get_userdata(post?.postedby)
      console.log('getting userdatda from post')
      setpostedby(postedby);
    }
    data();
  }, [])


  const handal_like = () => {
    if (auth?.currentUser && !(post?.likes.includes(userdata?.username))) {
      setpost(prev => ({ ...prev, 'likes': [...prev.likes, userdata?.username] }))
    }
    else {
      setpost(prev => ({ ...prev, "likes": prev.likes.filter((e) => e !== userdata?.username) }))
    }
  }

  const handelcomment = () => {
    if (auth?.currentUser && commenttext != '') {
      setpost(prev => ({
        ...prev, 'comments': [...prev?.comments, {
          content: commenttext,
          postedby: userdata?.uid,
          postedat: new Date(),
          replyes: [],
          likes: []
        } 
        ]
      }))

      toast.success('comment sucessfully')
      console.log(post?.comments)
    }

  }

  function handelactive(act) {
    active === act ? setactive('') : setactive(act)
  }

  return (
    <div className='md:my-8 my-5 mx-5 p-2 text-lg flex flex-col'>
      <div className="flex w-full align-middle sm:space-x-2 ">
        <img className='rounded-full mx-2 bg-gray-400 outline outline-neutral-500 w-8 sm:w-10 h-8 sm:h-10' src={postedby?.profileImageURL || defaultprofileimage} alt="user" />
        <div className="flex  w-full m-1 sm:mx-3 flex-col">
          <div onClick={() => {
            navigate(`/profile/${postedby?.username}`)
          }} className='flex text-base sm:text-lg  w-full capitalize space-x-2'>
            <label className="font-semibold">{postedby?.name || null}</label>
            <label className="text-gray-500">@{postedby?.username || null}</label>
          </div>

          <pre className='text-sm  whitespace-pre-wrap my-2 font-sans w-full p-2 '>{post?.content}</pre>

          <div className="w-full">
            {post?.img ? <img src={post?.img} onClick={() => {
              setactive('postimage')
            }} className=' max-h-72 sm:max-h-96  w-full aspect-auto border-neutral-500 border-2 rounded-lg' alt={defaultprofileimage} /> : <></>}
          </div>

          <div className="flex text-lg mt-5 w-full  text-gray-400  space-x-2 m-2 justify-between">
            <div className="flex space-x-1 hover:text-sky-900" onClick={() => {
              post?.comments.length > -1 && handelactive('comment')
            }}>
              <label className='text-gray-400' htmlFor="">{post?.comments.length > 0 ? post?.comments.length : ''}</label>
              <i className=''><InsertCommentIcon /></i>
            </div>

            <div className="flex space-x-1 hover:text-green-900" onClick={() => {
              post?.comments.length > -1 && handelactive('repost')
            }}>
              <label className='text-gray-400' htmlFor="">{post?.repost?.length}</label>
              <i className=''><CropIcon /></i>
            </div>

            {post?.likes.includes(userdata?.username) ? <div className="flex space-x-1  hover:text-gray-500" onClick={() => {
              handal_like()
            }}>
              <label className='font-serif text-red-800' htmlFor="">{post?.likes.length > 0 ? post.likes.length : ''}</label>
              <i className=''><FavoriteIcon style={{'color': '#CF000F'}}/></i>
            </div>:<div className="flex space-x-1 hover:text-red-900 " onClick={() => {
              handal_like()
            }}>
              <label className='font-serif ' htmlFor="">{post?.likes.length > 0 ? post.likes.length : ''}</label>
              <i className=''><FavoriteBorderIcon /></i>
            </div>}


            {userdata?.saved.some((savedpost)=>{
              return (savedpost?.postid===post.postid)
            }) ? <i onClick={() => {
              const updatedSaved = userdata?.saved.filter((savedpost) => post?.postid != savedpost.postid );
              console.log(updatedSaved)
              
              console.log('saved post updateed' , updatedSaved , post.postid===userdata.saved[0].postid)

              setuserdata(prev =>
                ({ ...prev, 'saved': updatedSaved })
              )
              toast.success("removed from your Bookmark ")


            }}><BookmarkIcon style={{'color': '#22A7F0'}}/></i> : <i className='hover:text-blue-900 ' onClick={() => {
              setuserdata(prev =>
                ({ ...prev, 'saved': [...prev?.saved, post] })
              )
              toast.success(" Added to your Bookmark ")
            }} ><BookmarkBorderIcon /></i>}


            <div className="flex space-x-1" onClick={() => {
              post.comments.length > -1 && handelactive('more')
            }}>
              <i className=''><MoreHorizIcon /></i>
            </div>
          </div>
        </div>
      </div>



      {popup && <>
        {
          active == 'postimage' && <Popupitem closefunction={() => {
            setactive('')
          }}>
            <img src={post?.img} className='w-96 m-auto mb-10 rounded-2xl h-96 object-fill' />

          </Popupitem>
        }

      </>
      }




      {
        popup && <>
          {active === 'comment' && <>
            <Popupitem closefunction={() => {
              setactive('')
            }}>
              <Post postdata={post} />
              <div className='w-full flex text-center flex-col container m-2'>
                <h2 className='text-2xl my-3 font-mono'>comment</h2>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  handelcomment()

                }} className="flex my-2 border rounded-xl border-neutral-500 p-4 justify-around">

                  <img src={userdata?.profileImageURL} className='w-10 h-10  border-2 bg-gray-400 border-neutral-400  rounded-full' alt="" />
                  <input onChange={(e) => { setcommenttext(e.target.value) }} value={commenttext} type="text" className='w-full mx-2 bg-black capitalize text-white border-2 px-4 border-white rounded-xl text-base' placeholder='write a comment ..' />
                  <button className='bg-blue-500  text-white text-center p-2 sm:px-4 capitalize rounded-md  md:w-40'>comment</button>
                </form >

                <div className="flex space-y-10 flex-col my-5 ">
                  {post?.comments.map((comment, index) => {
                    return <Comment setpost={setpost} comment={comment} key={index}/>
                  })}
                </div>
              </div>

            </Popupitem>
          </>}
        </>

      }
    </div >
  );
} 