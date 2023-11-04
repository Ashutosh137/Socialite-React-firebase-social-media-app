import React, { useState } from 'react';
import {signinwithemail,signInWithGoogle,auth} from '../service/Auth/index'
import { NavLink } from 'react-router-dom';

const Signup = () => {
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const handelsubmit = async () => {
        await signinwithemail(email, pass);
    }

    const handelgooglesignup = async () => {
        await signInWithGoogle();
    }

    return (
        <div className='container text-xl text-center justify-center capitalize flex p-5 my-16 align-middle'>
            <div className="m-auto border-2 p-5  border-black">
                <h1 className='m-auto my-10  font-semibold  text-2xl'>Log In</h1>
                <div className='flex justify-center flex-col gap-2'>
                    <label onClick={handelgooglesignup} htmlFor="" className='text-xl text-black px-5 p-3 border-4 rounded-2xl border-blue-300 m-auto
                    '><i className="bi px-2 bi-google"></i> Continue With Google</label>
                    <label className='my-3'>or</label>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        handelsubmit();
                    }} className='flex flex-col py-3 m-auto gap-6'>
                        <input type="email" value={email} onChange={(e) => {
                            setemail(e.target.value)
                        }} className='text-xl p-2 px-3 placeholder:text-gray-400 rounded-xl capitalize bg-white border-2 border-black text-black' placeholder='email address ...' />
                        <input type="password" value={pass} onChange={(e) => {
                            setpass(e.target.value)
                        }} className='text-xl p-2 px-3 placeholder:text-gray-400 rounded-xl capitalize bg-white border-2 border-black text-black' placeholder='password...' />
                        <button className='bg-sky-300 text-xl m-auto px-5 py-2 rounded-xl capitalize '>submit</button>
                    </form>
                </div>
                <div className='my-2'>
                    <label onClick={()=>{
                        resetpassward(auth.currentUser.email)
                    }} htmlFor="">forget passward ? </label>
                    <NavLink to='/' htmlFor="">already registred ! <a className='text-blue-400 mx-3 my-2 hover:border-b-2 p-1 border-black' >sign in</a></NavLink>
                </div>
            </div>
        </div>

    )
}

export default Signup;
