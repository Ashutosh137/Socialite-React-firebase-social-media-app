import React, { useEffect, useState } from 'react'
import { auth } from '../service/Auth'
import LinkIcon from '@mui/icons-material/Link';
import { Getimagedownloadlink, createnewpost } from '../service/Auth/database'
import { toast } from 'react-toastify';
import { useuserdatacontext } from '../service/context/usercontext';
export const Createpost = ({ toggle }) => {
    const { userdata, setuserdata } = useuserdatacontext()
    const [posttext, setposttext] = useState('')
    const [postmedia, setpostmedia] = useState(null)
    const handelpost = async () => {
        if (auth.currentUser && posttext !== '') {
            var url = await Getimagedownloadlink(postmedia)
            console.log('file in handelpost', postmedia)
            var newpost = [{
                content: posttext,
                likes: [],
                comments: [],
                shares: 0,
                postedby:auth?.currentUser?.uid,
                postedat: new Date(),
                img: url
            }, ...userdata.post];
            console.log(newpost)
            setuserdata(pre => ({ ...pre, post: newpost }))
            toggle();
            toast.success("sucessfully posted")
        }
    }

    useEffect(() => {
        console.log('file in useeffect', postmedia)
        setpostmedia(postmedia)
    }, [postmedia])

    return (
        <div className="text-center capitalize">
            <form onSubmit={(e) => {
                e.preventDefault()
                handelpost()
            }}
                className='flex flex-col text-xl space-y-4'>
                <div className="flex my-2 justify-cente align-middle">
                    <img className='rounded-full bg-gray-400 w-10 h-10' src={userdata.profileImageURL} alt="" />

                    <textarea autoFocus value={posttext} rows={2} onChange={(e) => { setposttext(e.target.value) }} type="text" placeholder='What is Happening?!' className='px-5 placeholder:capitalize text-white w-full scroll-smooth overflow-y-scroll bg-black focus:outline-none  placeholder:text-neutral-500 md:text-2xl p-2 ' />
                </div>
                <div className='flex justify-between align-middle'>
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={async (e) => {
                            await setpostmedia(e.target.files[0])
                        }}
                    />
                    <div className="p-3 my-auto">
                        <button type='button' onClick={() => {
                            document.getElementById("fileInput").click();
                        }}>
                            <LinkIcon />
                        </button>
                    </div>
                    <button disabled={posttext === ''} className='bg-blue-500 font-mono  text-white text-center p-2 capitalize  rounded-full my-10 px-12'>post</button>
                </div>
            </form>
        </div>
    )
}
