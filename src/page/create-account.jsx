import React, { useState } from "react";
import { auth } from "../service/Auth";
import { check_data_is_exist, Create_Account } from '../service/Auth/database'
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const navigate=useNavigate()

    const [formdata, setformdata] = useState({
        name: "",
        username: "",
        bio: "",
        age: '',
    })

    const checkdata = async () => {
        const dataisexist = await check_data_is_exist(auth.currentUser.uid);
        if (!dataisexist) {
            await Create_Account({ email: auth.currentUser.email, uid: auth.currentUser.uid, bio: formdata.bio, name: formdata.name, age: formdata.age, username: formdata.username });
        }
        navigate('/home')


    }

    const handelchange = (e) => {
        const { name, value } = e.target;
        setformdata(prevData => ({ ...prevData, [name]: value }))
    }


    return (
        <div className='capitalize px-5'>
            <h1 className='text-4xl sm:text-6xl my-12 font-serif font-bold '>
            create an account with us </h1>
            <form className='flex flex-col  ' onSubmit={(e) => {
                e.preventDefault()
                checkdata()
            }}>
                <div className="flex-col flex my-2">
                <label className="sm:text-xl text-base font-mono p-1 mx-3 " htmlFor=""> username...</label>
                <input type="text" name='username' placeholder="enter your unique uername..." value={formdata.username} className='px-5 placeholder:capitalize placeholder:font-serif placeholder:text-neutral-500 w-80 sm:w-1/3 sm:text-lg text-sm p-2 border-1 border-black  rounded-2xl my-2 border text-black  ' onChange={handelchange} required></input>

                </div>
                <div className="flex-col flex my-2">
                <label className="sm:text-xl text-base  font-mono p-1 mx-3 " htmlFor=""> full name...</label>

                <input type="text" name='name' placeholder="full name..." value={formdata.name} className='px-5 placeholder:capitalize placeholder:font-serif placeholder:text-neutral-500  w-80 sm:w-1/3 sm:text-lg text-sm p-2 border-1 border-black  rounded-2xl my-2 border text-black  ' onChange={handelchange} required></input>

                </div>
                <div className="flex-col flex my-2">
                <label className="sm:text-xl text-base  font-mono p-1 mx-3 " htmlFor=""> date of birth...</label>

                <input type="date" name='age'  value={formdata.age} className='px-5 placeholder:capitalize placeholder:font-serif placeholder:text-neutral-500  w-80 sm:w-1/3   sm:text-lg text-sm p-2 border-1 border-black  rounded-2xl my-2 border text-black  ' onChange={handelchange} required></input>

                </div>
                <div className="flex-col flex my-2">
                <label className="sm:text-xl text-base  font-mono p-1 mx-3 " htmlFor="">about yourself...</label>
                
                <textarea type="text" name='bio' placeholder="write about your exprience , your favirate topics and many more about you " value={formdata.bio} className='px-5 placeholder:capitalize placeholder:font-serif placeholder:text-neutral-500  w-80 sm:w-1/3   sm:text-lg text-sm p-2 border-1 border-black  rounded-2xl my-2 border text-black  ' onChange={handelchange} ></textarea>

                </div>
                <button type="submit" className='rounded-2xl text-lg sm:text-xl border-white my-6 p-2 mr-auto sm:w-80 px-7 border-1 capitalize bg-sky-600 hover:scale-105 transition-all ease'>create account</button>
            </form> </div>
    )
}

export default CreateAccount;