import React, { useEffect, useState } from 'react'
import Profileviewbox from './profileviewbox'
import Search from './search'
import { getallprofile } from '../service/Auth/database'
import { useuserdatacontext } from '../service/context/usercontext'
export default function Suggestion() {
    const [alluser, setalluser] = useState([null])
    const { userdata } = useuserdatacontext()
    useEffect(() => {
        const dataforallusers = async () => {
            const alluser = await getallprofile();
            setalluser(alluser)
            console.log(alluser)
        }
        dataforallusers()
    }, [])

    if (alluser == []) {
        return <></>
    }


    return (
        <div className=" mx-2 w-full hidden md:block">
            <div className="flex flex-col space-y-4">
                <div>
                    <Search />
                </div>
                <div className="">
                    <h2 className="text-2xl text-center text-white capitalize my-3 font-semibold">who to follow</h2>

                    {alluser.map((proflie, index) => {
                        return proflie?.username !== userdata?.username && <Profileviewbox index={index} profile={proflie} />
                    })
                    }
                </div>

            </div>
        </div>
    )
}
