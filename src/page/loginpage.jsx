import React from "react";
import Login from "../component/login";
import { signinwithemail } from "../service/Auth";
import { useNavigate } from "react-router-dom";
export const Loginpage = () => {
  const navigate = useNavigate();
  const handelsubmit = async (email, pass) => {
    await signinwithemail(email, pass);
    navigate("/home");
  };
  return (
    <div className="w-full mx-5 flex flex-wrap capitalize">
      <div className=" m-auto outline xl:block hidden p-1  outline-gray-900">
        <img
          className="w-80"
          src="https://cdn.dribbble.com/users/4329662/screenshots/15802739/socialite_v3_final-08_copy.png"
          alt=""
        />
      </div>
      <div className="xl:w-1/2 ">
        <div className=" my-4">
          <h1 className="text-6xl text-left font-sans font-bold ">login </h1>
        </div>
        <Login
          onenter={() => {
            handelsubmit();
          }}
          role="login"
        />
      </div>
    </div>
  );
};
