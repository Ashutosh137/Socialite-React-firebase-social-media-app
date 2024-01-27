import React, { useState, useEffect } from "react";
import CottageIcon from "@mui/icons-material/Cottage";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AddIcon from "@mui/icons-material/Add";
import IosShareIcon from "@mui/icons-material/IosShare";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

import { useuserdatacontext } from "../service/context/usercontext";
import { auth } from "../service/Auth";
import { useNavigate } from "react-router-dom";
import { Popupitem } from "../ui/popup";
import { Createpost } from "./createpost";
const Navbar = () => {
  const navigate = useNavigate();
  const { userdata, defaultprofileimage } = useuserdatacontext();
  const [post, setpost] = useState(false);
  const [navbar, setnavbar] = useState(true);

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setnavbar(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <header className="p-2 hidden sm:block w-20 md:w-96">
        <nav className="fixed flex flex-col h-screen md:p-4 ">
          <h1 className="text-3xl title pt-16 py-5 first-letter:text-5xl font-bold ">
            Socialite
          </h1>
          <nav className="flex my-auto align-middle text-xl justify-center capitalize flex-col">
            <Link to="/home">
              <span className="flex hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center md:justify-start">
                <CottageIcon />
                <label className=" mx-2 md:block hidden">home</label>
              </span>
            </Link>
            <Link to={`${userdata?.username ? `/search` : "/login"}`}>
              <span className="flex hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center md:justify-start">
                <SearchIcon />
                <label className="md:block hidden mx-2">explore</label>
              </span>
            </Link>
            <Link to={`${userdata?.username ? `/lists` : "/login"}`}>
              <span className="flex hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center md:justify-start">
                <NotificationsIcon />
                <label className="md:block hidden mx-2">Notifications</label>
              </span>
            </Link>
            <Link to={`${userdata?.username ? `/lists` : "/login"}`}>
              <span className="flex hover:bg-gray-700  p-2 px-5 m-auto rounded-full justify-center md:justify-start">
                <MessageIcon />
                <label className="md:block hidden mx-2">Message</label>
              </span>
            </Link>
            <Link to={`${userdata?.username ? `/lists` : "/login"}`}>
              <span className="flex hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center md:justify-start">
                <PeopleIcon />
                <label className="md:block hidden mx-2">community</label>
              </span>
            </Link>
            <Link to={`${userdata?.username ? `/lists` : "/login"}`}>
              <span className="flex hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center md:justify-start">
                <BookmarksIcon />
                <label className="md:block mx-2 hidden">lists</label>
              </span>
            </Link>
            <Link
              to={`${
                userdata?.username ? `/profile/${userdata?.username}` : "/login"
              }`}
            >
              <span className="flex hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center md:justify-start">
                <PersonIcon />
                <label className="md:block mx-2 hidden">proflie</label>
              </span>
            </Link>
            <Link to={`${userdata?.username ? `/setting` : "/login"}`}>
              <span className="flex hover:bg-gray-700  p-3 md:px-5 m-auto rounded-full justify-center md:justify-start">
                <SettingsIcon />
                <label className="md:block hidden mx-2">settings </label>
              </span>
            </Link>
            <button
              onClick={() => {
                setpost(true);
              }}
              className="bg-blue-500 mr-auto my-5 text-white text-center md:px-5 p-2 capitalize rounded-full m-auto  md:w-40"
            >
              <span className="flex justify-center space-x-2 ">
                <AddIcon />
                <label className="md:block hidden">post</label>
              </span>
            </button>
          </nav>

          <button className="bg-blue-500 text-white text-xl text-center p-2 md:px-5 my-5  capitalize md:w-40 m-auto rounded-full">
            {auth.currentUser ? (
              <span
                className="flex space-x-2  justify-center"
                onClick={async () => {
                  await auth.signOut();
                  navigate("/");
                }}
              >
                <LogoutIcon />
                <label className="md:block hidden">sign out</label>
              </span>
            ) : (
              <span
                className="flex space-x-2 justify-center"
                onClick={async () => {
                  navigate("/login");
                }}
              >
                <LoginIcon />
                <label className="md:block hidden">sign in</label>
              </span>
            )}
          </button>
        </nav>
      </header>

      {post && (
        <Popupitem
          closefunction={() => {
            setpost(false);
          }}
        >
          <div className="my-5">
            <Createpost
              toggle={() => {
                setpost(false);
              }}
            />
          </div>
        </Popupitem>
      )}

      {/* mobile  */}

      <div>
        <nav
          className={`sm:hidden z-40 fixed top-0 left-0 transition-opacity opacity-95 duration-100  bg-neutral-900 w-full ${
            navbar ? "" : "hidden"
          }`}
        >
          <header className="flex px-3 my-3  align-middle justify-between">
            <Link to={`/profile/${userdata?.username}`} className="mx-2">
              <img
                className="w-10 h-10 aspect-square rounded-full border-gray-700 hover:border-gray-100 border-2 hover:p-1 "
                src={userdata?.profileImageURL || defaultprofileimage}
                alt={defaultprofileimage}
              />
            </Link>

            <h1 className="text-3xl m-auto capitalize title">socialite</h1>

            <Link
              className="border-gray-600 aspect-square hover:border-gray-100 border-2 rounded-3xl p-1  "
              to="/setting"
            >
              <SettingsIcon />
            </Link>
          </header>
          <hr className="border-gray-500 rounded-md" />
        </nav>

        <div
          className={`sm:hidden z-50 left-0 fixed bottom-0 w-full ${
            navbar ? "" : "hidden"
          }`}
        >
          <hr className="border-gray-500" />
          <div className="flex py-3 rounded-sm bg-neutral-900">
            <Link
              to="/home"
              className="mx-5 border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto"
            >
              <span>
                <CottageIcon />
              </span>
            </Link>
            <Link
              className="mx-5 border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto"
              to="/search"
            >
              <span>
                <SearchIcon />
              </span>
            </Link>
            <button
              onClick={() => {
                setpost(true);
              }}
              className="bg-blue-500 m-auto text-white text-center md:px-5 p-2 capitalize rounded-full  md:w-40"
            >
              <span className="flex justify-center space-x-2 ">
                <AddIcon />
              </span>
            </button>

            <Link
              to="/home"
              className="mx-5 border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto"
            >
              <NotificationsIcon />
            </Link>
            <Link
              to={`/profile/${userdata?.username}`}
              className="mx-5 border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto"
            >
              <PersonIcon />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
