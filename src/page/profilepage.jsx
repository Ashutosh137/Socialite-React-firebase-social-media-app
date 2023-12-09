import React, { useEffect,useState } from 'react'
import { useuserdatacontext } from '../service/context/usercontext'
import { Profile } from '../component/profile'
import Navbar from '../component/navbar'
import { auth } from '../service/Auth'
import { useNavigate, useParams } from 'react-router-dom'
import { get_userdatabyname } from '../service/Auth/database'
export const Profilepage = () => {


    const [profiledata, setprofiledata] = useState(null)
    const { username } = useParams()

    useEffect(() => {
        const data = async () => {
            const profile = await get_userdatabyname(username)
            setprofiledata(profile);
        }
        data()
    })
    return (
        <div className='flex w-full'>
            <Navbar />
            <Profile profileuserdata={profiledata} />
        </div>
    )
}
