import React, { useState } from "react";
import Navbar from "../component/navbar";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Editfuserdata from "../component/editfuserdata";
import { auth } from "../service/Auth";
import { useNavigate } from "react-router-dom";

export default function Setting() {
  const [active, setactive] = useState("account");
  const navigate = useNavigate();
  return (
    <div className="flex w-full justify-around ">
      <Navbar />

      <section className="flex border-gray-800 max-h-screen  overflow-y-scroll scroll-hidden text-center capitalize text-base  border-x-2  w-full mx-3 my-5 ">
        <div className="flex border-x-2 px-3  flex-col ">
          <div className="flex my-5 w-full ">
            <i className=" ml-2 my-auto" onClick={() => navigate("/home")}>
              <ArrowBackIcon />
            </i>
            <h1 className="text-2xl font-semibold m-auto">settings</h1>
          </div>
          <div
            onClick={() => {
              active === "account" ? setactive("") : setactive("account");
            }}
            className="p-3 justify-center hover:bg-gray-950 sm:w-72 border-gray-700 border-2 m-3 rounded-3xl flex"
          >
            <h1 className="m-auto w-full">account</h1>
            <i className="ml-auto">
              <KeyboardArrowRightIcon />
            </i>
          </div>

          <div
            onClick={() => {
              active === "account" ? setactive("") : setactive("account");
            }}
            className="p-3 justify-center hover:bg-gray-950 border-gray-700 border-2 m-3 rounded-3xl sm:w-72 flex"
          >
            <h1 className="m-auto w-full">password and protection</h1>
            <i className="ml-auto">
              <KeyboardArrowRightIcon />
            </i>
          </div>

          <div
            onClick={() => {
              active === "account" ? setactive("") : setactive("account");
            }}
            className="p-3 justify-center hover:bg-gray-950 border-gray-700 border-2 m-3 rounded-3xl sm:w-72 flex"
          >
            <h1 className="m-auto w-full">display and color</h1>
            <i className="ml-auto">
              <KeyboardArrowRightIcon />
            </i>
          </div>

          <div
            onClick={() => {
              active === "account" ? setactive("") : setactive("account");
            }}
            className="p-3 justify-center hover:bg-gray-950 border-gray-700 border-2 m-3 rounded-3xl sm:w-72 flex"
          >
            <h1 className="m-auto w-full">who can see your posts</h1>
            <i className="ml-auto">
              <KeyboardArrowRightIcon />
            </i>
          </div>
          <div
            onClick={() => {
              active === "account" ? setactive("") : setactive("account");
            }}
            className="p-3 justify-center hover:bg-gray-950 border-gray-700 border-2 m-3 rounded-3xl sm:w-72 flex"
          >
            <h1 className="m-auto w-full">report a problem</h1>
            <i className="ml-auto ">
              <KeyboardArrowRightIcon />
            </i>
          </div>
          <div
            onClick={() => {
              auth.signOut();
              navigate("/login");
            }}
            className="p-3 justify-center  border-gray-700 border-2 text-red-400 hover:bg-gray-300 hover:text-black transition-colors ease-in-out duration-400 font-semibold m-3 rounded-3xl sm:w-72 flex"
          >
            logout
          </div>
        </div>

        <div className="w-full">
          {active === "account" && (
            <div>
              <Editfuserdata />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
