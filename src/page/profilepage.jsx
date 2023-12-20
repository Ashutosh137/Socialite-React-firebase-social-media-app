import React, { useEffect, useState } from 'react'
import { useuserdatacontext } from '../service/context/usercontext'
import { Profile } from '../component/profile'
import Navbar from '../component/navbar'
import { auth } from '../service/Auth'
import { useNavigate, useParams } from 'react-router-dom'
import { get_userdatabyname } from '../service/Auth/database'
export const Profilepage = () => {


    const { username } = useParams()

    return (
        <div className='flex w-full'>
            <Navbar />
            <Profile username={username} />
        </div>
    )
}
