import React from "react";
import { auth } from "../service/Auth";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

export default function Resetpassword({ toggle }) {
  const handelvarify = () => {
    !auth.currentUser.emailVerified &&
      sendEmailVerification(auth.currentUser) &&
      toast.success(
        "sended a varification link to  your email address , please check your email "
      );
  };

  return (
    <div className="text-base sm:p-5 w-full capitalize flex flex-col space-y-4 text-left">
      <h1 className="text-2xl text-center p-2">reset your passward</h1>
      <div className="flex mx-2  justify-around">
        <label htmlFor="email">email address </label>
        <div className="flex flex-col">
          <input
            type="email"
            name="email"
            className={`px-5 bg-black w-80 border-2   text-gray-300 sm:text-base text-sm p-1 border-1 rounded-xl ${
              auth.currentUser.emailVerified
                ? "border-green-400"
                : "border-gray-500"
            }`}
            contentEditable={false}
            value={auth?.currentUser.email}
          />
          {!auth.currentUser.emailVerified && (
            <button
              onClick={handelvarify}
              className={` rounded-full w-40 p-1 text-gray-300 shadow-lg
          capitalize px-5 my-3bg-gray-600`}
            >
              verify now
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-around">
        <h1 className="my-auto w-40">change your socilite password</h1>
        <button
          className="rounded-full bg-blue-500 text-gray-200 p-1 shadow-lg
          capitalize px-5 my-3"
          onClick={async () => {
            await sendPasswordResetEmail(auth, auth.currentUser.email);
            toast.success(
              "sended a reset password link to  your email address , please check your email "
            );
          }}
        >
          change your profile passward
        </button>
      </div>
      <div className="flex  justify-around">
        <label htmlFor="email" className="w-40 ">
          last sign-in time
        </label>
        <label className="text-gray-400">
          {auth.currentUser.metadata.lastSignInTime.toString()}
        </label>
      </div>
      <div className="flex  justify-around">
        <label htmlFor="email" className="w-40">
          Created at{" "}
        </label>
        <label className="text-gray-400">
          {auth.currentUser.metadata.creationTime.toString()}
        </label>
      </div>

      <div className="w-full flex">
        <button
          onClick={toggle}
          className="rounded-full bg-blue-500 text-gray-200 p-1 shadow-lg
          capitalize px-5 my-5 m-auto w-40"
        >
          back
        </button>
      </div>
    </div>
  );
}
