import React, { useState } from "react";
import Navbar from "../component/navbar";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Editfuserdata from "../component/editfuserdata";
import { auth } from "../service/Auth";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Resetpassword from "../component/resetpassword";
import {Helmet} from "react-helmet";
import { toast } from "react-toastify";
import Block from "../component/block";

export default function Setting() {
  const [active, setactive] = useState(
    `${window.innerWidth < 480 ? "" : "account"}`
  );
  const [reportitle, setreportitle] = useState("");
  const [report, setreport] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex  pt-10 sm:pt-0 w-full justify-around  scroll-hidden my-5 ">
      <Navbar />
      <Helmet>
        <title>setting | socilaite</title>
        <meta name="description" content="setting" />
        <link rel="canonical" href="/setting" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="setting" />
        <meta name="author" content="setting" />
        <meta name="language" content="EN" />

      </Helmet>
      <section className="flex post border-gray-800  text-center capitalize text-base border-x-2  w-full">
        <div
          className={`px-3 flex-col w-full sm:w-auto ${
            active === "" ? "flex" : "hidden"
          } md:flex`}
        >
          <div className="flex my-5 w-full ">
            <i className=" ml-2 my-auto" onClick={() => navigate("/home")}>
              <ArrowBackIcon />
            </i>
            <h1 className="text-2xl font-semibold m-auto">settings</h1>
          </div>
          <div className=" mt-5 flex flex-col p-2">
            <div
              onClick={() => {
                active === "account" ? setactive("") : setactive("account");
              }}
              className="p-3 justify-center hover:bg-gray-950 w-full sm:w-72 border-gray-700 border-2 m-3 rounded-3xl flex"
            >
              <h1 className="m-auto w-full">account</h1>
              <i className="ml-auto">
                <KeyboardArrowRightIcon />
              </i>
            </div>

            <div
              onClick={() => {
                active === "password" ? setactive("") : setactive("password");
              }}
              className="p-3 justify-center hover:bg-gray-950 border-gray-700 w-full border-2 m-3 rounded-3xl sm:w-72 flex"
            >
              <h1 className="m-auto w-full">password and protection</h1>
              <i className="ml-auto">
                <KeyboardArrowRightIcon />
              </i>
            </div>

            <div
              onClick={() => {
                navigate("/lists");
              }}
              className="p-3 justify-center hover:bg-gray-950 border-gray-700 w-full border-2 m-3 rounded-3xl sm:w-72 flex"
            >
              <h1 className="m-auto w-full">bookmark collection</h1>
              <i className="ml-auto">
                <KeyboardArrowRightIcon />
              </i>
            </div>
            <div
              onClick={() => {
                active === "block" ? setactive("") : setactive("block");
              }}
              className="p-3 justify-center hover:bg-gray-950 border-gray-700 w-full border-2 m-3 rounded-3xl sm:w-72 flex"
            >
              <h1 className="m-auto w-full">who can see your posts</h1>
              <i className="ml-auto">
                <KeyboardArrowRightIcon />
              </i>
            </div>
            <div
              onClick={() => {
                active === "report" ? setactive("") : setactive("report");
              }}
              className="p-3 justify-center hover:bg-gray-950 border-gray-700 w-full border-2 m-3 rounded-3xl sm:w-72 flex"
            >
              <h1 className="m-auto w-full">report a problem</h1>
              <i className="ml-auto ">
                <KeyboardArrowRightIcon />
              </i>
            </div>
            <div
              onClick={() => {
                navigate("/login");
                auth.signOut();
              }}
              className="p-3 justify-center border-gray-700 border-2 text-red-400 hover:text-white transition-colors ease-in-out duration-400 font-semibold m-3 rounded-3xl w-72 flex"
            >
              logout
            </div>
          </div>
        </div>

        <div
          className={`${
            active !== "" ? "block" : "hidden"
          } sm:bolck my-5 w-full`}
        >
          <div className="relative">
            <i
              onClick={() => setactive("")}
              className="ml-auto my-auto text-gray-300 absolute top-2 left-3"
            >
              <KeyboardArrowLeftIcon />
            </i>
            {active === "account" && <Editfuserdata />}
            {active === "password" && (
              <Resetpassword toggle={() => setactive("")} />
            )}
            {active === "block" && <Block />}

            {active === "report" && (
              <section className="w-full  p-2 text-sm sm:text-base text-left capitalize">
                <h1 className="text-center text-xl">report a problem</h1>
                <div className="my-5 flex flex-col justify-center space-y-3">
                  <div className="flex-col flex space-y-1">
                    <label className=" p-2 mx-3 "> report title</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Report Title"
                      value={reportitle}
                      className="px-5 placeholder:capitalize bg-black placeholder:text-neutral-500  sm:text-lg text-sm p-2 rounded-xl   "
                      onChange={(e) => setreportitle(e.target.value)}
                      autoFocus
                    ></input>
                  </div>
                  <div className="flex-col flex space-y-1">
                    <label className="p-2 mx-3 "> discribe your problem</label>

                    <textarea
                      type="text"
                      rows={3}
                      placeholder="discribe your problem in brirf "
                      value={report}
                      className="px-5 placeholder:capitalize bg-black   placeholder:text-neutral-500  sm:text-lg text-sm p-2  rounded-xl   "
                      onChange={(e) => setreport(e.target.value)}
                    ></textarea>
                  </div>
                  <div className=" m-auto">
                    <button
                      onClick={() => {
                        reportitle !== "" &&
                          toast.success(
                            `Reported sucessfully on  ${reportitle}`
                          );
                        setreport("");
                        setreportitle("");
                      }}
                      className="bg-blue-500 hover:bg-blue-600 rounded-full m-auto  shadow-lg capitalize p-3 px-5 w-60 my-3 font-semibold "
                    >
                      report
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
