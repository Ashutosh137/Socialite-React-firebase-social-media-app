import React, { useEffect, useState } from 'react'
import { get_userdatabyname, getpostdata, getpostdatabyuid } from '../service/Auth/database';
import { Post } from './post';
import ProgressBar from '@badrap/bar-of-progress';

export default function Postidtopost({ postid, postedby }) {
    const [post, setpost] = useState(null)
    const progress=new ProgressBar()


    useEffect(() => {
        const data = async () => {
            progress.start()
            setpost(await getpostdatabyuid(postedby, postid))
            progress.finish()
        }
        data()
    }, [])


    return (
        <div className=' w-full '>
            {post !== null && <Post postdata={post} popup={true} />}
        </div>
    )
}
