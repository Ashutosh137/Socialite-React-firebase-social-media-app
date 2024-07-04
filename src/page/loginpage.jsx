import React from "react";
import Login from "../layout/login/login";
import { Helmet } from "react-helmet";
import { signinwithemail } from "../service/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Loginpage = () => {
  const navigate = useNavigate();
  const handelsubmit = async (email, pass) => {
    const data = await signinwithemail(email, pass);
    data && toast.success("login successfully ");
    data && navigate("/home");
    !data && toast.error("Email adrress and password may be incorrect");
  };
  return (
    <div className="w-full post sm:mt-5 flex p-2 capitalize">
      <Helmet>
        <title>login | socilaite</title>
        <meta name="description" content="login" />
        <link rel="canonical" href="/login" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="login" />
        <meta name="author" content="login" />
        <meta name="language" content="EN" />
      </Helmet>

      <div className=" m-auto outline xl:block hidden outline-gray-900">
        <img
          className="w-80"
          src="https://cdn.dribbble.com/users/4329662/screenshots/15802739/socialite_v3_final-08_copy.png"
          alt=""
        />
      </div>
      <div>
        <h1 className="text-5xl text-left my-3  font-bold ">login</h1>
        <div className="my-auto">
          <Login onenter={handelsubmit} role="login" />
        </div>
      </div>
    </div>
  );
};
