import React, { Fragment, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Editfuserdata from "../layout/profile/editfuserdata";
import { auth } from "../service/Auth";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Helmet } from "react-helmet";
import Block from "../layout/setting/block";
import Resetpassword from "../layout/setting/resetpassword";
import Report from "../layout/setting/Report";
export default function Setting() {
  const [active, setactive] = useState(
    `${window.innerWidth < 480 ? "" : "account"}`
  );

  const navigate = useNavigate();
  return (
    <Fragment>
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
          className={`px-3 flex-col  w-full sm:w-auto ${
            active === "" ? "flex" : "hidden"
          } md:flex`}
        >
          <div className="flex my-5 w-full ">
            <i className=" ml-2 my-auto" onClick={() => navigate("/home")}>
              <ArrowBackIcon />
            </i>
            <h1 className="text-2xl font-semibold m-auto">settings</h1>
          </div>
          <div className=" mt-5 flex flex-col space-y-3 md:space-y-5 p-2">
            <div
              onClick={() => {
                active === "account" ? setactive("") : setactive("account");
              }}
              className="p-3 justify-center hover:bg-gray-950 w-full sm:w-72 border-gray-700 border-2  rounded-3xl flex"
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
              className="p-3 justify-center hover:bg-gray-950 border-gray-700 w-full border-2  rounded-3xl sm:w-72 flex"
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
              className="p-3 justify-center hover:bg-gray-950 border-gray-700 w-full border-2  rounded-3xl sm:w-72 flex"
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
              className="p-3 justify-center hover:bg-gray-950 border-gray-700 w-full border-2  rounded-3xl sm:w-72 flex"
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
              className="p-3 justify-center hover:bg-gray-950 border-gray-700 w-full border-2  rounded-3xl sm:w-72 flex"
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
              className="p-3 justify-center border-gray-700 border-2 text-red-400 hover:text-white transition-colors ease-in-out duration-400 font-semibold  rounded-3xl w-72 flex"
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

            {active === "report" && <Report />}
          </div>
        </div>
      </section>
    </Fragment>
  );
}
