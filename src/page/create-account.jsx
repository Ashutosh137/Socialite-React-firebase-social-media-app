import React, { useEffect, useState } from "react";
import { auth } from "../service/Auth";
import { check_data_is_exist, check_username_is_exist, Create_Account,get_userdata } from '../service/Auth/database'
import { useNavigate } from "react-router-dom";
import { useuserdatacontext } from "../service/context/usercontext";

const CreateAccount = () => {
    const navigate = useNavigate()
    const {setuserdata}=useuserdatacontext()
    console.log(auth.currentUser)
    const [isusernameexist, setisusernameexist] = useState(false)

    useEffect(() => {
        const data = async () => {
            if (await check_data_is_exist(auth?.currentUser?.uid)) {
                navigate('/home')
                console.log('data already exist')
            }
        }
        data()
    }, [])

    const [formdata, setformdata] = useState({
        name: "",
        username: "",
        bio: "",
        age: '',
    })

    const checkdata = async () => {
        await Create_Account({ email: auth.currentUser.email, uid: auth.currentUser.uid, bio: formdata.bio, name: formdata.name, age: formdata.age, username: formdata.username, profileimg: auth.currentUser.photoURL || null });
        setuserdata(await get_userdata(auth?.currentUser?.uid))
        navigate('/home');


    }

    const handelchange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setformdata(prevData => ({ ...prevData, [name]: value }))
    }


    return (
        <div className='capitalize px-5'>
            <h1 className='text-4xl md:text-6xl my-12 font-serif font-bold '>
                create an account with us </h1>
            <form className='flex flex-col  ' onSubmit={(e) => {
                e.preventDefault()
                !isusernameexist && checkdata()
            }}>
                <div className="flex-col flex my-2">
                    <label className="md:text-xl text-base font-sans p-1 mx-3 " min={4} max={10} > username</label>
                    <input type="text" name='username' placeholder="enter your unique uername..." value={formdata.username} className='px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500 w-80 md:w-2/5 md:text-lg text-sm p-2 border-3 border-black  rounded-2xl my-2 border text-black  ' onChange={async (e) => {
                        handelchange(e)
                        const data = await check_username_is_exist(e.target.value.trim())
                        const isValidInput = /^[a-zA-Z0-9_]+$/.test(e.target.value.trim());
                        if (data[0] || !isValidInput) {
                            setisusernameexist(true)
                            e.target.style.borderColor = 'red'
                        }
                        else {
                            setisusernameexist(false)
                            e.target.style.borderColor = 'black'
                        }
                    }} required></input>

                    <label className="text-gray-500 text-sm mx-3 m-1">username should not includes any special charcter</label>

                </div>

                {isusernameexist && <label className="text-red-400 mx-3 capitalize">invalid username or already exist</label>}
                <div className="flex-col flex my-2">
                    <label className="md:text-xl text-base font-sans p-1 mx-3 " > full name </label>

                    <input min={4} max={10} type="text" name='name' placeholder="full name..." value={formdata.name} className='px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500  w-80 md:w-2/5 md:text-lg text-sm p-2 border-1 border-black  rounded-2xl my-2 border text-black  ' onChange={handelchange} required></input>

                </div>

                <div className="flex-col flex my-2">
                    <label className="md:text-xl text-base  font-sans p-1 mx-3 "> date of birth</label>
                    <input type="date" name='age' aria-invalid={!(formdata.age> new Date() || formdata?.age < new Date('1970-1-1'))} value={formdata.age} className='px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500  w-80 md:w-2/5   md:text-lg text-sm p-2 border-1 border-black  rounded-2xl my-2 border text-black  ' onChange={handelchange} required></input>

                </div>
                <div className="flex-col flex my-2">
                    <label className="md:text-xl text-base  font-sans p-1 mx-3 " >about yourself </label>

                    <textarea type="text" min={4} max={50} name='bio' placeholder="write about your exprience , your favirate topics and many more about you " value={formdata.bio} className='px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500  w-80 md:w-2/5   md:text-lg text-sm p-2 border-1 border-black  rounded-2xl my-2 border text-black  ' onChange={handelchange} ></textarea>

                </div>
                <button type="submit" className='rounded-2xl text-lg md:text-xl border-white my-6 p-2 mr-auto md:w-80 px-7 border-1 capitalize bg-sky-600 hover:scale-105 transition-all ease'>create account</button>
            </form> </div>
    )
}

export default CreateAccount;