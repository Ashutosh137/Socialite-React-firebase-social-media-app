import React, { useState, useEffect } from 'react'
import { useuserdatacontext } from '../service/context/usercontext'
import { get_userdata } from '../service/Auth/database';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import CropIcon from '@mui/icons-material/Crop';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function Comment({ comment }) {
    const { userdata, defaultprofileimage } = useuserdatacontext()
    const [commentby, setcommentby] = useState(null)

    useEffect(() => {
        const data = async () => {
            const commentby = await get_userdata(comment?.postedby)
            setcommentby(commentby);
            console.log(commentby)
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
    


    return <div className="flex w-full align-middle sm:space-x-2 ">
        <img className='rounded-full mx-2 bg-gray-400 outline outline-neutral-500 w-8 sm:w-10 h-8 sm:h-10' src={commentby?.profileImageURL || defaultprofileimage} alt="user" />
        <div className="flex  w-full m-1 sm:mx-3 flex-col">
            <div onClick={() => {
                navigate(`/profile/${commentby?.username}`)
            }} className='flex text-base sm:text-lg  w-full capitalize space-x-2'>
                <label className="font-semibold">{commentby?.name || null}</label>
                <label className="text-gray-500">@{commentby?.username || null}</label>
            </div>

            <pre className='capitalize whitespace-pre-wrap my-2 text-xl font-sans text-left w-full p-2 '>{comment?.content}</pre>

            <div className="flex text-base mt-5 w-full  text-gray-400  space-x-5 m-2 ">
                {comment?.likes.includes(userdata?.username) ? <div className="flex space-x-1 hover:text-red-900 " onClick={() => {
                    handal_like()
                }}>
                    <label className='font-serif ' htmlFor="">{post?.likes.length > 0 ? post.likes.length : ''}</label>
                    <i className=''><FavoriteIcon /></i>
                </div> : <div className="flex space-x-1 hover:text-red-900 " onClick={() => {
                    handal_like()
                }}>
                    <label className='font-serif ' htmlFor="">{post?.likes.length > 0 ? post.likes.length : ''}</label>
                    <i className=''><FavoriteBorderIcon /></i>
                </div>}
                <div className="flex space-x-1 hover:text-sky-900" onClick={() => {
                    post?.comments.length > -1 && handelactive('comment')
                }}>
                    <label className='text-gray-400' htmlFor="">{comment?.replyes.length > 0 ? comment?.replyes.length : ''}</label>
                    <i className=''><InsertCommentIcon /></i>
                </div>
            </div>
        </div>
    </div>
}
