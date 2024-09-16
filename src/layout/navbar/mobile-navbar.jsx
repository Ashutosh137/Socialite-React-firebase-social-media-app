import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useUserdatacontext } from "../../service/context/usercontext";
import Button from "../../ui/button";
import PersonIcon from "@mui/icons-material/Person";
import CottageIcon from "@mui/icons-material/Cottage";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
function Mobilenavbar({ navbar, setpost }) {
  const { userdata, defaultprofileimage } = useUserdatacontext();
  return (
    <Fragment>
      <nav
        className={`md:hidden z-40 post fixed top-0 left-0 transition-opacity  duration-100  bg-black w-full ${
          navbar ? "" : "hidden"
        }`}
      >
        <header className="flex px-3 my-4  align-middle justify-between">
          <Link
            to={`${
              userdata?.username ? `/profile/${userdata?.username}` : "/login"
            }`}
            className="mx-2"
          >
            <img
              className="w-10 h-10 aspect-square rounded-full hover:border-gray-100 = "
              src={userdata?.profileImageURL || defaultprofileimage}
              alt={defaultprofileimage}
              onError={(e) => {
                e.target.src = defaultprofileimage;
              }}
            />
          </Link>

          <h1 className="text-3xl m-auto capitalize title">socialite</h1>

          <Link
            className="border-gray-600 aspect-square hover:border-gray-100 border-2 rounded-3xl p-1  "
            to={`${userdata?.username ? `/setting` : "/login"}`}
          >
            <SettingsIcon />
          </Link>
        </header>
        <hr className="border-gray-500 rounded-md" />
      </nav>

      <div
        className={`md:hidden z-40 post left-0 fixed bottom-0 w-full ${
          navbar ? "" : "hidden"
        }`}
      >
        <hr className="border-gray-500" />
        <div className="flex py-1 rounded-sm bg-black">
          <Link
            to="/home"
            className=" border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto"
          >
            <span>
              <CottageIcon />
            </span>
          </Link>
          <Link
            className=" border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto"
            to="/search"
          >
            <span>
              <SearchIcon />
            </span>
          </Link>
          <Button className="rounded-full ">
            <span
              onClick={() => {
                setpost(true);
              }}
              className="flex justify-center space-x-1 "
            >
              <AddIcon />
            </span>
          </Button>

          <Link
            to={`${userdata?.username ? `/notification` : "/login"}`}
            className=" border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto"
          >
            <NotificationsIcon />
          </Link>
          <Link
            to={`${
              userdata?.username ? `/profile/${userdata?.username}` : "/login"
            }`}
            className=" border-gray-700 hover:border-gray-100 border-2 rounded-3xl p-2  m-auto"
          >
            <PersonIcon />
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Mobilenavbar;
