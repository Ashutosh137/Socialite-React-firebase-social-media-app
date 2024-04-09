import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Post } from "./post";
import EditIcon from "@mui/icons-material/Edit";
import { Popupitem } from "../ui/popup";
import { useUserdatacontext } from "../service/context/usercontext";
import {
  Create_notification,
  get_userdatabyname,
  updateprofileuserdata,
} from "../service/Auth/database";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import { Createpost } from "./createpost";
import Editfuserdata from "./editfuserdata";
import { auth } from "../service/Auth";
import Profileviewbox from "./profileviewbox";
import ProgressBar from "@badrap/bar-of-progress";
import Aboutprofile from "./aboutprofile";

export const Profile = ({ username }) => {
  const progress = new ProgressBar();
  const [profileuserdata, setprofileuserdata] = useState([]);
  const navigate = useNavigate();
  const { userdata, defaultprofileimage, setuserdata } = useUserdatacontext();
  const [active, setactive] = useState("");
  const [mutual, setmutual] = useState([]);

  useEffect(() => {
    const data = async () => {
      if (
        auth.currentUser &&
        userdata?.username !== profileuserdata?.username &&
        profileuserdata !== null
      ) {
        await updateprofileuserdata(profileuserdata, username);
      } else if (userdata?.username === profileuserdata?.username) {
        setuserdata(profileuserdata);
      }
    };
    data();
  }, [profileuserdata, username]);

  useEffect(() => {
    const data = async () => {
      progress.start();
      if (username === userdata?.username) setprofileuserdata(userdata);
      else {
        const profile = await get_userdatabyname(username);
        setprofileuserdata(profile);
      }
      progress.finish();
      setactive("");
    };
    data();
    return () => {
      progress.finish();
    };
  }, [username]);

  useEffect(() => {
    const data = () => {
      setmutual(
        profileuserdata?.follower?.filter((pre) =>
          userdata?.follower?.includes(pre)
        )
      );
    };
    data();
  }, [userdata, profileuserdata]);

  if (profileuserdata?.block?.includes(userdata?.uid)) {
    setprofileuserdata(null);
  }

  const handelfollow = async () => {
    if (auth.currentUser && profileuserdata) {
      profileuserdata?.follower?.includes(userdata?.uid)
        ? setprofileuserdata((prev) => ({
            ...prev,
            follower: profileuserdata?.follower.filter(
              (e) => e !== userdata?.uid
            ),
          }))
        : setprofileuserdata((prev) => ({
            ...prev,
            follower: [...prev?.follower, userdata?.uid],
          }));
      !userdata?.following.includes(profileuserdata?.uid)
        ? setuserdata((prev) => ({
            ...prev,
            following: [...prev.following, profileuserdata?.uid],
          }))
        : setuserdata((prev) => ({
            ...prev,
            following: userdata?.following.filter(
              (e) => e !== profileuserdata?.uid
            ),
          }));
      !profileuserdata?.follower?.includes(userdata?.uid) &&
        (await Create_notification(profileuserdata?.uid, {
          type: "follow",
          likeby: userdata?.uid,
        }));
    } else navigate("/login");
  };

  return (
    <div className=" postanimiate post  w-full p-2 sm:text-2xl text-lg capitalize">
      <div className="flex  relative m-1 sm:m-2 ">
        <i
          onClick={() => {
            navigate("/home");
          }}
        >
          <ArrowBackIcon />
        </i>
        <div className="flex flex-col sm:text-xl text-lg mx-4 capitalize">
          <label>
            {profileuserdata?.name || (
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.900" }}
                variant="text"
                width={150}
              />
            )}
          </label>
          <label className="text-gray-500 text-sm sm:text-base">
            {profileuserdata?.post?.length} Posts
          </label>
        </div>
        <i
          className="ml-auto"
          onClick={() => {
            active === "setting" ? setactive("") : setactive("setting");
          }}
        >
          <MoreVertIcon />
        </i>
        {active === "setting" && profileuserdata && (
          <div className="absolute top-12 right-3  sm:right-8 px-8 sm:px-4 text-sm bg-black z-50 sm:-my-10 -my-2 py-5 p-2  rounded-xl shadow-sm shadow-white flex flex-col space-y-2 sm:space-y-4  ">
            <button
              className="sm:w-40 capitalize  p-1 rounded-full hover:bg-gray-950 "
              onClick={() => {
                navigator.share({
                  title:
                    "Spreading the Vibes: Check Out My Latest Socialite Post! ",
                  text: "Embark on a journey through elegance and excitement! My newest post on Socialite App is here to dazzle your feed. Swipe up to experience the glitz, glamour, and all things fabulous!",
                  url: window.location.href,
                });
                setactive("");
              }}
            >
              share profile{" "}
            </button>
            <button
              className="sm:w-40 capitalize  p-1 rounded-full  hover:bg-gray-950"
              onClick={() => {
                setactive("about");
              }}
            >
              about profile{" "}
            </button>
            {profileuserdata?.username !== userdata?.username ? (
              <>
                <button
                  className="sm:w-40 capitalize  p-1 rounded-full text-red-500 hover:bg-gray-950"
                  onClick={() => {
                    auth.currentUser && setactive("report");
                  }}
                >
                  report{" "}
                </button>
                <button
                  className="sm:w-40 capitalize  p-1 rounded-full hover:bg-gray-950 text-red-500 "
                  onClick={() => {
                    auth.currentUser &&
                      !userdata?.block?.includes(profileuserdata?.uid) &&
                      setactive("block");
                    userdata?.block?.includes(profileuserdata?.uid) &&
                      setuserdata((prev) => ({
                        ...prev,
                        block: prev?.block?.filter(
                          (item) => item !== profileuserdata?.uid
                        ),
                      }));
                  }}
                >
                  {userdata?.block?.includes(profileuserdata?.uid)
                    ? "Unblock"
                    : "block"}{" "}
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-40 capitalize  p-1 rounded-full  hover:bg-gray-950"
                  onClick={() => {
                    navigate("/setting");
                  }}
                >
                  account settings
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex post">
        <div className="sm:my-10 sm:space-y-3 aspect-square space-y-1 flex flex-col text-left sm:m-5 m-3">
          <img
            src={profileuserdata?.profileImageURL || defaultprofileimage}
            onError={(e) => {
              e.target.src = defaultprofileimage;
            }}
            className="sm:w-28 sm:h-28 h-20 w-20  rounded-full  border-2 border-neutral-600"
          />
          <div className="flex flex-col ">
            <label className=" text-xl font-semibold">
              {profileuserdata?.name || (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="text"
                  width={150}
                />
              )}
            </label>
            <label className="flex text-lg  space-x-1 text-gray-400">
              @{profileuserdata?.username || username}
            </label>
          </div>
          {profileuserdata?.bio && (
            <pre className=" text-sm sm:text-base">{profileuserdata?.bio}</pre>
          )}

          <div className="flex space-x-3 sm:text-lg text-base  text-gray-400">
            <label
              onClick={() => {
                ((profileuserdata?.privacy &&
                  profileuserdata?.follower.includes(userdata?.uid)) ||
                  !profileuserdata?.privacy) &&
                  profileuserdata?.follower.length > 0 &&
                  setactive("followers");

                profileuserdata?.username === userdata?.username &&
                  profileuserdata?.follower.length > 0 &&
                  setactive("followers");
              }}
            >
              {profileuserdata?.follower?.length} follower
            </label>
            <label
              onClick={() => {
                ((profileuserdata?.privacy &&
                  profileuserdata?.follower.includes(userdata?.uid)) ||
                  !profileuserdata?.privacy) &&
                  profileuserdata?.following.length > 0 &&
                  setactive("following");

                profileuserdata?.username === userdata?.username &&
                  profileuserdata?.following.length > 0 &&
                  setactive("following");
              }}
            >
              {profileuserdata?.following?.length} following
            </label>
          </div>

          {mutual?.length > 0 &&
            userdata?.username !== profileuserdata?.username && (
              <div
                onClick={() => {
                  setactive("mutual");
                }}
                className="text-neutral-400 cursor-pointer text-xs sm:text-sm text-left "
              >
                {mutual?.length} mutual friends also follow{" "}
                {profileuserdata?.name}
              </div>
            )}
        </div>
        {profileuserdata?.username === userdata?.username ? (
          <div
            className={`${
              userdata?.username ? "block" : "hidden"
            } cursor-pointer mr-5 ml-auto`}
          >
            <button
              title="edit profile"
              onClick={() => {
                active === "edit" ? setactive("") : setactive("edit");
              }}
              className="bg-black border-2 relative top-1/3 sm:mr-10 text-xs sm:text-lg  border-sky-200 sm:px-3 p-2 font-semibold capitalize rounded-3xl ml-auto  "
            >
              <span className="flex justify-center sm:justify-start  ">
                <EditIcon />
                <label className="sm:block hidden mx-2">edit profile</label>
              </span>
            </button>
          </div>
        ) : (
          <div
            className={`${
              userdata?.username ? "block" : "hidden"
            } cursor-pointer mr-5 ml-auto`}
          >
            <button
              title="follow"
              onClick={handelfollow}
              className="bg-black border-2 relative top-1/3 sm:mr-10 text-xs sm:text-lg mr-2  border-sky-200 sm:px-3 p-2 font-semibold capitalize rounded-3xl ml-auto  "
            >
              <label className="mx-2">
                {profileuserdata?.follower?.includes(userdata?.uid) ? (
                  <>following</>
                ) : (
                  <>follow</>
                )}
              </label>
            </button>
          </div>
        )}
      </div>

      <hr className="my-5 border-gray-400" />

      {profileuserdata?.uid === userdata?.uid ? (
        <>
          {profileuserdata?.post?.length === 0 ? (
            <div className="w-full my-20 flex flex-col  justify-center">
              <i className="rounded-full m-auto text-zinc-800 scale-125 border-2 border-stone-700 p-3  my-2 flex justify-center ">
                <CameraEnhanceIcon />
              </i>
              <h1 className="sm:text-3xl text-lg font-bold text-center my-1">
                share your first post
              </h1>
              <button
                onClick={() => {
                  setactive("post");
                }}
                className="rounded-2xl text-lg md:text-xl px-10 border-white my-5 p-2 mr-auto  border-1 capitalize bg-sky-600 hover:scale-105 transition-all m-auto ease"
              >
                post
              </button>
            </div>
          ) : (
            <>
              {profileuserdata?.post?.map((item, index) => {
                return (
                  <div key={index} className="">
                    <Post index={index} postdata={item} popup={true} />
                    <hr className="border-gray-700" />
                  </div>
                );
              })}
            </>
          )}{" "}
        </>
      ) : (
        <>
          {profileuserdata?.privacy ? (
            <>
              {profileuserdata?.follower.includes(userdata?.uid) ? (
                <>
                  {profileuserdata?.post?.length === 0 ? (
                    <div className="w-full my-12 flex flex-col justify-center">
                      <i className="rounded-full m-auto text-zinc-800 border-2 border-stone-700 p-3  flex justify-center ">
                        <CameraEnhanceIcon />
                      </i>
                      <h1 className="text-3xl font-bold text-center my-2">
                        no post yet
                      </h1>
                    </div>
                  ) : (
                    <>
                      {profileuserdata?.post?.map((item, index) => {
                        return (
                          <div key={index} className="">
                            <Post index={index} postdata={item} popup={true} />
                            <hr className="border-gray-700" />
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                <div className="w-full my-12 flex flex-col justify-center">
                  <i className="rounded-full m-auto text-zinc-800 border-2 border-stone-700 p-3  flex justify-center ">
                    <CameraEnhanceIcon />
                  </i>
                  <h1 className="text-3xl font-bold text-center my-2">
                    this profile is private
                  </h1>
                </div>
              )}{" "}
            </>
          ) : (
            <>
              {profileuserdata?.post?.length === 0 ? (
                <div className="w-full my-12 flex flex-col justify-center">
                  <i className="rounded-full m-auto text-zinc-800 border-2 border-stone-700 p-3  flex justify-center ">
                    <CameraEnhanceIcon />
                  </i>
                  <h1 className="text-3xl font-bold text-center my-2">
                    no post yet
                  </h1>
                </div>
              ) : (
                <>
                  {profileuserdata?.post?.map((item, index) => {
                    return (
                      <div key={index} className="">
                        <Post index={index} postdata={item} popup={true} />
                        <hr className="border-gray-700" />
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </>
      )}

      {!profileuserdata && (
        <div className="text-center my-10 font-serif text-2xl border-b border-gray-500 p-5 mx-5  ">
          profile doesnot exist
        </div>
      )}

      {active === "report" && (
        <Popupitem
          closefunction={() => {
            setactive("");
          }}
        >
          {profileuserdata?.report?.includes(userdata.uid) ? (
            <div className="text-xl text-center my-7 capitalize text-red-400 ">
              already reported
            </div>
          ) : (
            <div className="max-w-sm m-auto mb-10">
              <p className="text-xl text-center my-7 capitalize ">
                report this post
              </p>
              <select className="mx-2 w-full my-8 p-3 bg-black capitalize text-white text-base border-2 px-4 border-white rounded-xl ">
                {" "}
                <option value="hateSpeech">Hate Speech</option>
                <option value="spam">Spam</option>
                <option value="harassment">Harassment</option>
                <option value="violence">Violence</option>
                <option value="falseInformation">False Information</option>
                <option value="inappropriateContent">
                  Inappropriate Content
                </option>
                <option value="copyrightViolation">Copyright Violation</option>
                <option value="impersonation">Impersonation</option>
              </select>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setactive("");
                  }}
                  className="px-8 outline outline-neutral-800 capitalize m-auto p-2 text-base rounded-full hover:bg-gray-950 bg-gray-900 text-white"
                >
                  cancel
                </button>
                <button
                  onClick={() => {
                    setactive("");
                    toast.success("Report sucessfully");
                    setprofileuserdata((prev) => ({
                      ...prev,
                      report: [...prev?.report, userdata?.uid],
                    }));
                  }}
                  className="px-8 capitalize m-auto p-2 rounded-full hover:bg-red-600 bg-red-500 text-base font-semibold text-white"
                >
                  report
                </button>
              </div>
            </div>
          )}
        </Popupitem>
      )}
      {active === "block" && (
        <Popupitem
          closefunction={() => {
            setactive("");
          }}
        >
          {!profileuserdata?.block?.includes(userdata.uid) && (
            <div className="max-w-sm m-auto mb-10">
              <p className="text-xl text-center my-7 capitalize ">
                block {profileuserdata?.username}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setactive("");
                  }}
                  className="px-8 outline outline-neutral-800 capitalize m-auto p-2 text-base rounded-full hover:bg-gray-950 bg-gray-900 text-white"
                >
                  cancel
                </button>
                <button
                  onClick={() => {
                    setactive("");
                    toast.success(`blocked ${profileuserdata?.username}`);
                    setuserdata((prev) => ({
                      ...prev,
                      block: [profileuserdata?.uid],
                    }));
                  }}
                  className="px-8 capitalize m-auto p-2 rounded-full hover:bg-red-700 bg-red-600 text-base font-semibold text-white"
                >
                  block
                </button>
              </div>
            </div>
          )}
        </Popupitem>
      )}

      {active === "followers" && (
        <Popupitem
          closefunction={() => {
            setactive("");
          }}
        >
          <div className="flex w-full flex-col justify-center align-middle space-y-3">
            <h2 className="text-center text-xl sm:text-2xl my-5 ">followers</h2>
            <div className="m-auto min-w-max">
              {profileuserdata?.follower.map((profile, index) => {
                return <Profileviewbox key={index} profileusername={profile} />;
              })}
            </div>
          </div>
        </Popupitem>
      )}
      {active === "mutual" && (
        <Popupitem
          closefunction={() => {
            setactive("");
          }}
        >
          <div className="flex w-full flex-col justify-center align-middle space-y-3">
            <h2 className="text-center text-xl sm:text-2xl my-5 ">
              mutual friends
            </h2>
            <div className="m-auto">
              {mutual.map((profile, index) => {
                return <Profileviewbox key={index} profileusername={profile} />;
              })}
            </div>
          </div>
        </Popupitem>
      )}
      {active === "about" && (
        <Aboutprofile
          profiledata={profileuserdata}
          close={() => {
            setactive("");
          }}
        />
      )}

      {active === "following" && (
        <div>
          {
            <Popupitem
              closefunction={() => {
                setactive("");
              }}
            >
              <div className="flex flex-col justify-center align-middle space-y-3">
                <h2 className="text-center text-xl sm:text-2xl my-5 ">
                  following
                </h2>
                <div className="m-auto">
                  {profileuserdata.following.map((profile, index) => {
                    return (
                      <Profileviewbox index={index} profileusername={profile} />
                    );
                  })}
                </div>
              </div>
            </Popupitem>
          }
        </div>
      )}

      {active === "edit" && (
        <Popupitem
          closefunction={() => {
            setactive("");
          }}
        >
          <Editfuserdata
            toggle={() => {
              setactive("");
            }}
          />
        </Popupitem>
      )}

      {active === "post" && (
        <Popupitem
          closefunction={() => {
            setactive("");
          }}
        >
          <div className="my-5">
            <Createpost
              toggle={() => {
                setactive("");
              }}
            />
          </div>
        </Popupitem>
      )}
    </div>
  );
};
