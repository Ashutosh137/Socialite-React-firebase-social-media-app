import React from "react";
import { signupwithemail, auth } from "../service/Auth/index";
import { useNavigate } from "react-router-dom";
import Login from "../component/login";
import { toast } from "react-toastify";

const Signuppage = () => {
  const navigate = useNavigate();

  const handelsubmit = async (email, pass) => {
    const sigup = await signupwithemail(email, pass);
    sigup && toast.success('signup successfully ')
    sigup && navigate("/create-account");

  };

  return (
    <div className="w-full flex  p-2 capitalize">
      <div className=" m-auto outline xl:block hidden  outline-gray-900">
        <img
          className="w-80"
          src="https://cdn.dribbble.com/users/4329662/screenshots/15802739/socialite_v3_final-08_copy.png"
          alt=""
        />
      </div>
      <div>
        <h1 className="text-6xl text-left font-bold ">happening now </h1>
        <Login onenter={handelsubmit} role="signup" />
      </div>
    </div>
  );
};

export default Signuppage;
