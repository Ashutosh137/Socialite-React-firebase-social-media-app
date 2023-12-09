import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../ui/post';
import EditIcon from '@mui/icons-material/Edit';
import { Popupitem } from '../ui/popup';
import { useuserdatacontext } from '../service/context/usercontext';
import { check_username_is_exist } from '../service/Auth/database';
import { toast } from 'react-toastify';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import { Getimagedownloadlink } from '../service/Auth/database'
import { auth } from '../service/Auth';

export const Profile = ({ profileuserdata }) => {
    const navigate = useNavigate()
    const { userdata,defaultprofileimage, setuserdata } = useuserdatacontext()
    const [active, setactive] = useState('')
    const [isusernameexist, setisusernameexist] = useState(false)

    const [editformdata, seteditformdata] = useState(userdata)
    const [profileimg, setprofileimg] = useState(profileuserdata?.profileImageURL)
    const handelchange = (e) => {
        const { name, value } = e.target;
        seteditformdata(prevData => ({ ...prevData, [name]: value }))
    }

    return (
        <div className='overflow-y-scroll scroll-hidden h-screen w-full p-2 text-2xl capitalize'>
            <div className="flex m-2 justify-start">
                <i onClick={() => {
                    navigate('/home')
                }}><ArrowBackIcon /></i>
                <label className="text-2xl mx-4  capitalize ">{profileuserdata?.name}</label>
            </div>
            <div className='flex'>
                <div className="my-10 space-y-1 flex flex-col text-left m-5">
                    <img src={profileuserdata?.profileImageURL || defaultprofileimage} alt="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png" className="sm:w-28 w-20 bg-gray-300 rounded-full  border-4 border-neutral-600" />
                    <label className='my-1 font-semibold' htmlFor="">{profileuserdata?.name}</label>
                    <label className='text-xl text-gray-400' htmlFor="">@{profileuserdata?.username}</label>
                    <br />
                    <div className="flex space-x-3 text-lg text-gray-400">
                        <label htmlFor="">{profileuserdata?.follower.length} follower</label>
                        <label htmlFor="">{profileuserdata?.following.length} following</label>
                    </div>
                </div>
                {profileuserdata?.username === userdata.username && <div className='ml-auto '>
                    <button title='edit profile' onClick={() => { active === 'edit' ? setactive('') : setactive("edit") }} className='bg-black border-2 text-xs sm:text-lg  border-sky-200 sm:px-3 p-2 font-semibold capitalize rounded-3xl ml-auto text-white '><span className='flex justify-center sm:justify-start  '><EditIcon /><label className='sm:block hidden mx-2' >edit profile</label></span></button>
                </div>}

            </div>
            <hr />
            <div className="">
                {profileuserdata?.post.map((item, index) => {
                    return <div key={index} className="">
                        <Post post={item} popup={true} />
                    </div>

                })}
            </div>


            {active === 'edit' && <div>
                <Popupitem closefunction={() => {
                    setactive('')
                    seteditformdata(userdata)
                    setisusernameexist(false)

                }}>
                    <div className="text-center m-auto w-1/4 sm:w-40 font-semibold font-serif capitalize my-2 border-b-2 pb-4 border-white">
                        <h2>edit profile</h2>
                    </div>
                    <form className='flex flex-col  ' onSubmit={(e) => {
                        e.preventDefault()
                        !isusernameexist && userdata !== editformdata && setuserdata(editformdata)
                        setactive('')
                        toast.success("updated sucessfully")
                    }}>
                        <div className='my-5 flex flex-col m-auto'>
                            <img title='click to change the profile photo' className='w-20 border-2 bg-gray-400 opacity-90 p-2 m-auto rounded-full' src={editformdata.profileImageURL} alt="" />
                            <i onClick={() => {
                                document.getElementById('file').click()
                            }} className='m-7 -mt-14 z-10 text-black  sticky'><LinkedCameraIcon /></i>
                            <input type="file" onChange={async (e) => {
                                // const files = e.target.files[0]
                                // console.log(files)
                                // const file = await Getimagedownloadlink(files, auth.currentUser.uid)
                                // setprofileimg(file)
                                // setuserdata(prev=>({...prev,profileImageURL:file|| auth.currentUser.photoURL})
                                // )
                                // console.log(profileimg)
                            }} name="file" id="file" className='hidden' />
                        </div>
                        <div className="flex-col flex my-2">
                            <label autoFocus className="md:text-xl text-base font-sans p-2 mx-3 border-b-2 border-gray-800" > username</label>
                            <input type="text" name='username' placeholder="enter your unique uername..."
                                minLength={6}
                                value={editformdata.username} className='px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500   md:text-lg text-sm p-2 border-1   rounded-2xl my-2 ' onChange={async (e) => {
                                    handelchange(e)
                                    const data = await check_username_is_exist(e.target.value.trim())
                                    const isValidInput = /^[a-z0-9]+$/.test(e.target.value.trim())

                                    if (data[1] || !isValidInput) {
                                        setisusernameexist(true)
                                        e.target.style.borderColor = 'red'
                                    }
                                    else {
                                        setisusernameexist(false)
                                        e.target.style.borderColor = 'white'
                                    }
                                }} required></input>

                        </div>

                        {isusernameexist && <label className="text-red-400 mx-3 text-base capitalize">invalid username or already exist</label>}

                        <div className="flex-col flex my-2">
                            <label className="md:text-xl border-b-2 border-gray-800  text-base font-sans p-2 mx-3 " > full name </label>

                            <input type="text" name='name' placeholder="full name..." value={editformdata.name} className='px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500   md:text-lg text-sm p-2 border-1   rounded-2xl my-2  ' onChange={handelchange} required></input>

                        </div>

                        <div className="flex-col flex my-2">
                            <label className="md:text-xl text-base  font-sans p-2 mx-3 border-b-2 border-gray-800  " > date of birth</label>

                            <input type="date" name='age' value={editformdata.dateofbirth} className='px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif w-full placeholder:text-neutral-500     md:text-lg text-sm p-2 border-1   rounded-2xl my-2   ' onChange={handelchange} required></input>

                        </div>
                        <div className="flex-col  flex my-2">
                            <label className="md:text-xl text-base  font-sans p-2 mx-3 border-b-2 border-gray-800  " >bio</label>

                            <textarea type="text" name='bio' placeholder="write about your exprience , your favirate topics and many more about you " value={editformdata.bio} className='px-5 placeholder:capitalize bg-black -white  border-2 border-gray-300  capitalize placeholder:font-serif placeholder:text-neutral-500  md:text-lg text-sm p-2 border-1   rounded-2xl my-2  ' onChange={handelchange} ></textarea>

                        </div>
                        <button type="submit" className='rounded-2xl text-lg md:text-xl border-white my-6 p-2 mr-auto md: px-7 border-1 capitalize bg-sky-600 hover:scale-105 transition-all m-auto ease'>edit profile</button>
                    </form>


                </Popupitem>
            </div>}
        </div>
    )
}
