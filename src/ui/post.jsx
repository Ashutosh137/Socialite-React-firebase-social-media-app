import React, { useEffect, useState } from 'react'
import { auth } from '../service/Auth'
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import CropIcon from '@mui/icons-material/Crop';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Skeleton } from '@mui/material';
import Createid from '../service/other/createid';
import { Popupitem } from './popup';
import { useuserdatacontext } from '../service/context/usercontext';
import { get_userdata, updateprofileuserdata, updatepost } from '../service/Auth/database';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Comment from './comment';

export const Post = ({ postdata, popup }) => {
  const [active, setactive] = useState('')
  const { userdata, setuserdata, defaultprofileimage } = useuserdatacontext()

  const [post, setpost] = useState(postdata || null)
  const [hide, sethide] = useState(false)

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

  useEffect(() => {
    const data = async () => {
      if (postedby !== null) {
        await updatepost(post, postedby?.uid)
      }
    }
    data()

  }, [post])


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
          commentid: Createid(),
          replies: [],
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
    <div className='md:my-4 my-2 p-2 text-lg flex flex-col'>
      {!hide &&
        <div className="flex w-full align-middle sm:space-x-2 ">
          <img className='rounded-full mx-2 bg-gray-400 outline outline-neutral-500 w-8 sm:w-10 h-8 sm:h-10' src={postedby?.profileImageURL || defaultprofileimage} alt={defaultprofileimage} />
          <div className="flex w-full m-1 sm:mx-3 flex-col">
            <div className="flex relative align-middle">

              <div onClick={() => {
                navigate(`/profile/${postedby?.username}`)
              }} className='flex text-base sm:text-lg justify-start w-full capitalize space-x-2'>
                <label className="font-semibold">{postedby?.name || <Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} variant="text" width={200} />}</label>
                <label className="text-gray-500 text-sm sm:text-base flex space-x-3">@{postedby?.username || <Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} variant="text" width={150} />}</label>
              </div>
              <div onClick={() => { active === 'menu' ? setactive('') : setactive('menu') }} className='ml-auto'>
                <i><MoreVertIcon /></i>
              </div>
              {active === 'menu' && <div className='absolute top-12 right-3  sm:right-8 px-4 text-sm bg-black sm:-my-10 -my-2 py-5 p-3  rounded-xl shadow-sm shadow-white flex flex-col space-y-4  '>
                <button className='w-40 p-1 rounded-full hover:bg-gray-950   capitalize' onClick={() => {
                  navigate(`/profile/${postedby?.username} `)
                  setactive('')
                }}>view profile</button>
                <button className='w-40 capitalize  p-1 rounded-full hover:bg-gray-950  text-white' onClick={() => {

                }}>{userdata?.saved.some((savedpost) => {
                  return (savedpost?.postid === post.postid)
                }) ? <i onClick={() => {
                  const updatedSaved = userdata?.saved.filter((savedpost) => post?.postid != savedpost.postid);
                  setuserdata(prev =>
                    ({ ...prev, 'saved': updatedSaved })
                  )
                  toast.success("removed from your Bookmark ")
                  setactive('')


                }} className='flex justify-center space-x-3'><BookmarkIcon /><label htmlFor="">unsave</label></i> : <i className=' justify-center flex space-x-3' onClick={() => {
                  setuserdata(prev =>
                    ({ ...prev, 'saved': [...prev?.saved, post] })
                  )
                  toast.success(" Added to your Bookmark ")
                  setactive("")
                }} ><BookmarkBorderIcon /><label htmlFor="">save</label></i>}</button>

                <button className='w-40 p-1 rounded-full capitalize hover:bg-gray-950  text-white' onClick={() => {
                  setactive('comment')

                }}>View comment</button>
                <button className='w-40 p-1 rounded-full hover:bg-gray-950   text-white' onClick={() => {

                }}>Report</button>
                {popup && <button className='w-40 p-1 rounded-full hover:bg-gray-950     text-white' onClick={() => {
                  sethide(true)

                }}>Hide post</button>}

                {userdata?.username === postedby?.username &&  <button className='w-40 p-1 rounded-full hover:bg-gray-950         text-white' onClick={() => {

                }}>Delete</button>}

              </div>}
            </div>

            <pre className='text-sm  whitespace-pre-wrap my-2 font-sans w-full p-2 '>{post?.content}</pre>

            <div className="w-full">
              {post?.img ? <img src={post?.img} onClick={() => {
                setactive('postimage')
              }} className=' w-full  h-full h-postimg  border-neutral-500 border-2 rounded-2xl' alt={defaultprofileimage} /> : <></>}
            </div>

            <div className="flex text-lg mt-5   text-gray-400  space-x-2 m-2 justify-between px-5">

              <div className="flex space-x-1 hover:text-sky-900" onClick={() => {
                post?.comments.length > -1 && handelactive('comment')
              }}>
                <label className='text-gray-400' >{post?.comments.length > 0 ? post?.comments.length : ''}</label>
                <i className=''><InsertCommentIcon /></i>
              </div>
              {/* 
            <div className="flex space-x-1 hover:text-green-900" onClick={() => {
              post?.comments.length > -1 && handelactive('repost')
            }}>
              <label className='text-gray-400' >{post?.repost?.length}</label>
              <i className=''><CropIcon /></i>
            </div> */}

              <div className="flex text-gray-500 space-x-1 text-base  hover:text-red-900 " onClick={() => { handal_like() }}>
                {post?.likes.length > 0 && <label className='font-serif m-auto  '  >{post.likes.length}</label>}
                <i className=''>{post?.likes.includes(userdata?.username) ? <FavoriteIcon style={{ 'color': '#CF000F' }} /> : <FavoriteBorderIcon />}</i>
              </div>

              {userdata?.saved.some((savedpost) => {
                return (savedpost?.postid === post.postid)
              }) ? <i onClick={() => {
                const updatedSaved = userdata?.saved.filter((savedpost) => post?.postid != savedpost.postid);
                console.log(updatedSaved)

                console.log('saved post updateed', updatedSaved, post.postid === userdata.saved[0].postid)

                setuserdata(prev =>
                  ({ ...prev, 'saved': updatedSaved })
                )
                toast.success("removed from your Bookmark ")


              }}><BookmarkIcon style={{ 'color': '#22A7F0' }} /></i> : <i className='hover:text-blue-900 ' onClick={() => {
                setuserdata(prev =>
                  ({ ...prev, 'saved': [...prev?.saved, post] })
                )
                toast.success(" Added to your Bookmark ")
              }} ><BookmarkBorderIcon /></i>}
            </div>
          </div>
        </div>}

      {hide && <div className='flex w-full sm:px-5 shadow-md  align-middle shadow-black space-x-2'>
        <i className='text-gray-500 my-auto w-20 mr-auto'><VisibilityOffIcon /></i>
        <div className="flex align-middle w-full mr-auto ">
          <div className="flex capitalize w-full text-sm space-y-2 flex-col">
            <div className='my-2'>
              <label className='font-semibold text-base my-1'>Post hidden</label>
              <p>you'ill see less from this page </p>
            </div>

            <button className='w-40 px-4 p-2 capitalize rounded-full text-base  hover:bg-gray-950 bg-gray-900 text-white'>report this post</button>
          </div>

          <button onClick={() => {
            sethide(false)
            setactive('')
          }} className='px-8 capitalize m-auto p-2 rounded-full hover:bg-gray-950 bg-gray-900 text-white'>undo</button>
        </div>


      </div>
      }



      {
        popup && <>
          {
            active == 'postimage' && <Popupitem closefunction={() => {
              setactive('')
            }}>
              <img src={post?.img} className='w-96 m-auto mb-10 rounded-2xl h-96 object-fill' />

            </Popupitem>
          }

        </>
      }




      {popup && <>
        {active === 'comment' && <>
          <Popupitem closefunction={() => {
            setactive('')
          }}>
            <Post postdata={post} />
            <div className='flex text-center flex-col container '>
              <form onSubmit={(e) => {
                e.preventDefault()
                handelcomment()
                setcommenttext('')

              }} className="flex w-full my-2 border  rounded-xl border-neutral-500 p-4 justify-around">

                <img src={userdata?.profileImageURL || defaultprofileimage} className='w-10 h-10  border-2 bg-gray-400 border-neutral-400  rounded-full' alt="" />
                <input onChange={(e) => { setcommenttext(e.target.value) }} value={commenttext} maxLength={50} type="text" className='mx-2 w-full bg-black capitalize text-white text-base border-2 px-4 border-white rounded-xl ' placeholder='write a comment ..' />
                <button className='bg-blue-500 text-sm  text-white text-center p-2 sm:px-4 capitalize rounded-md  md:w-40'>comment</button>
              </form >

              <h2 className='text-2xl my-3 font-mono'>  {post?.comments.length > 0 ? 'comments' : 'no comments yet...'}</h2>
              <div className="flex space-y-5 flex-col my-5 ">
                {post?.comments.map((comm, index) => {
                  return <div className="flex flex-col space-y-5 ">
                    <Comment setpost={setpost} toggle={() => { setactive('') }} key={index} currentcomment={comm} post={post} />
                    <hr className='w-full border-gray-700' />
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