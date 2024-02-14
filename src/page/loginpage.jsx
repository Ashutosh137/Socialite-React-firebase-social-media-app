import React from "react";
import Login from "../component/login";
import { signinwithemail } from "../service/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Loginpage = () => {
  const navigate = useNavigate();
  const handelsubmit = async (email, pass) => {
    const data = await signinwithemail(email, pass);
    data && toast.success("login successfully ");
    data && navigate("/home");
    !data && toast.error("user doesnot exist , or failed to login");
  };
  return (
    <div className="w-full post  -mt-16 sm:mt-5 flex p-2 capitalize">
      <div className=" m-auto outline xl:block hidden outline-gray-900">
        <img
          className="w-80"
          src="https://cdn.dribbble.com/users/4329662/screenshots/15802739/socialite_v3_final-08_copy.png"
          alt=""
        />
      </div>
      <div>
        <h1 className="text-6xl text-left my-3  font-bold ">login </h1>
        <Login onenter={handelsubmit} role="login" />
      </div>
    </div>
  );
};
