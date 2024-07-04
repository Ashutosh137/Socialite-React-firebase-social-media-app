import { useState, useEffect, Fragment } from "react";
import CottageIcon from "@mui/icons-material/Cottage";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { useUserdatacontext } from "../../service/context/usercontext";
import { auth } from "../../service/Auth";
import { useNavigate } from "react-router-dom";
import { Popupitem } from "../../ui/popup";
import { Createpost } from "../../component/createpost";
import Button from "../../ui/button";
import Mobilenavbar from "./mobile-navbar";
const Navbar = () => {
  const navigate = useNavigate();
  const { userdata, userNotifications } = useUserdatacontext();
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
    <Fragment>
      <header className="p-2 hidden md:block w-40 xl:w-96">
        <nav className="fixed flex flex-col h-screen  md:p-1 ">
          <h1 className="text-3xl title py-5 text-center xl:text-left first-letter:text-5xl font-bold ">
            Socialite
          </h1>
          <nav className="flex align-middle my-auto text-xl justify-center capitalize flex-col">
            <Link to="/home">
              <span className="flex hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center xl:justify-start">
                <CottageIcon />
                <label className=" mx-2 xl:block hidden">home</label>
              </span>
            </Link>
            <Link to={`${userdata?.username ? `/search` : "/login"}`}>
              <span className="flex hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center xl:justify-start">
                <SearchIcon />
                <label className="xl:block hidden mx-2">explore</label>
              </span>
            </Link>
            <Link to={`${userdata?.username ? `/notification` : "/login"}`}>
              <span className="flex relative  hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center xl:justify-start">
                <NotificationsIcon />
                {userNotifications?.length > userdata?.notification && (
                  <div className="my-3">
                    <span className="absolute rounded-full py-1  text-xs font-medium content-[''] leading-none grid place-items-center top-[2%] right-[30%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[24px] min-h-[24px]">
                      {userNotifications?.length - userdata?.notification}
                    </span>
                  </div>
                )}
                <label className="xl:block hidden mx-2">Notifications</label>
              </span>
            </Link>
            <Link to={`${userdata?.username ? `/lists` : "/login"}`}>
              <span className="flex hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center xl:justify-start">
                <BookmarksIcon />
                <label className="xl:block mx-2 hidden">lists</label>
              </span>
            </Link>
            <Link
              to={`${
                userdata?.username ? `/profile/${userdata?.username}` : "/login"
              }`}
            >
              <span className="flex hover:bg-gray-700  p-3 px-5 m-auto rounded-full justify-center xl:justify-start">
                <PersonIcon />
                <label className="xl:block mx-2 hidden">proflie</label>
              </span>
            </Link>
            <Link to={`${userdata?.username ? `/setting` : "/login"}`}>
              <span className="flex hover:bg-gray-700  p-3 md:px-5 m-auto rounded-full justify-center xl:justify-start">
                <SettingsIcon />
                <label className="xl:block hidden mx-2">settings </label>
              </span>
            </Link>
            <Button className=" m-auto my-3 xl:w-40">
              <span
                onClick={() => {
                  setpost(true);
                }}
                className="flex justify-center space-x-2 "
              >
                <AddIcon />
                <label className="xl:block hidden">post</label>
              </span>
            </Button>
          </nav>

          <Button className="mb-10">
            {auth.currentUser ? (
              <span
                className="flex space-x-2  justify-center"
                onClick={async () => {
                  await auth.signOut();
                  navigate("/");
                }}
              >
                <LogoutIcon />
                <label className="xl:block hidden">sign out</label>
              </span>
            ) : (
              <span
                className="flex space-x-2 justify-center"
                onClick={async () => {
                  navigate("/login");
                }}
              >
                <LoginIcon />
                <label className="xl:block hidden">sign in</label>
              </span>
            )}
          </Button>
        </nav>
      </header>

      {post && (
        <Popupitem
          closefunction={() => {
            setpost(false);
          }}
        >
          <div className="my-5 post popup">
            <Createpost
              toggle={() => {
                setpost(false);
              }}
            />
          </div>
        </Popupitem>
      )}

      {/* mobile  */}

      <Mobilenavbar setpost={setpost} navbar={navbar} />
    </Fragment>
  );
};
export default Navbar;
