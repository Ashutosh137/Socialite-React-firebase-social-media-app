import React, { useState, useEffect } from 'react'
import { useuserdatacontext } from '../service/context/usercontext'
import { get_userdata } from '../service/Auth/database';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import CropIcon from '@mui/icons-material/Crop';
import { Skeleton } from '@mui/material';
import { auth } from '../service/Auth';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';

export default function Comment({ currentcomment, toggle, setpost, post }) {
    const { userdata, defaultprofileimage } = useuserdatacontext()
    const [commentby, setcommentby] = useState(null)
    const navigate = useNavigate()
    const [active, setactive] = useState('')

    const [comment, setcomment] = useState(currentcomment || null)

    useEffect(() => {
        const data = async () => {
            const commentby = await get_userdata(comment?.postedby)
            setcommentby(commentby);
        }
        data();
    }, [])


    useEffect(()=>{
          const data = async () => {
            if(comment){
                setpost(prev=>({...prev,'comments': prev?.comments.map((currcomment)=>{
                    if(comment.id===currcomment?.id){
                        return comment;
                    }
                    else return currcomment;
                })}))
            }
        }
        data();

    },[comment])



    return <div className="flex w-full capitalize align-middle sm:space-x-2 ">
        <img className='rounded-full mx-2 bg-gray-400 outline outline-neutral-800 w-5 sm:w-7 h-5 sm:h-7' src={commentby?.profileImageURL || defaultprofileimage} alt={defaultprofileimage} />
        <div className="flex w-full space-y-1 sm:mx-3 flex-col">
            <div className='flex relative text-sm'>
                <label className="font-semibold ">{commentby?.name || <Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} variant="text" width={150} />}</label>
                <label className="text-gray-500 mx-2 flex space-x-3 text-sm" onClick={() => {
                    navigate(`/profile/${commentby?.username} `)
                }}>@{commentby?.username || <Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} variant="text" width={150} />}</label>
                <label className='ml-auto mx-2' onClick={() => { active === 'menu' ? setactive('') : setactive('menu') }}><MoreVertIcon /></label>
                {active === 'menu' && <div className='absolute  right-8 text-sm bg-gray-950 sm:-my-10 -my-2 py-5 p-3  rounded-3xl flex flex-col space-y-4   '>
                    <button className='w-40 p-1 rounded-full bg-gray-800 text-white capitalize' onClick={() => {
                        navigate(`/profile/${commentby?.username} `)
                        toggle()
                    }}>view profile</button>
                    <button className='w-40 p-1 rounded-full bg-gray-800 text-white' onClick={() => {

                    }}>Report</button>
                    {(userdata?.username === commentby?.username || post?.postedby===userdata?.uid) && <button className='w-40 p-1 rounded-full hover:bg-red-800 bg-red-700 text-white' onClick={() => {

                    }}>Delete</button>}
                </div>}
            </div>


            <div className="flex my-2">
                <pre className='capitalize whitespace-pre-wrap my-1  text-sm font-sans text-left w-full '>{comment?.content}</pre>
                <div className="flex ml-auto mr-6 space-x-3 ">
                    <div className="flex text-gray-400 space-x-1 hover:text-red-900 " onClick={() => {
                        { comment?.likes.includes(userdata?.username) ? setcomment(prev => ({ ...prev, 'likes': prev.likes.filter((e) => e !== userdata?.username) })) : setcomment(prev => ({ ...prev, 'likes': [...prev.likes, userdata?.username] })) }

                        // handal_like()
                    }}>
                        {comment?.likes.length > 0 && <label className='font-serif m-auto text-xs'  >{comment.likes.length}</label>}
                        <i className=''>{comment?.likes.includes(userdata?.username) ? <FavoriteIcon style={{ 'color': '#CF000F' }} /> : <FavoriteBorderIcon />}</i>
                    </div>
                   
                </div>
            </div>


        </div>
    </div>
}
