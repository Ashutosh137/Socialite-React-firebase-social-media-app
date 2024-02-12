import React, { useEffect, useState } from "react";
import { auth } from "../service/Auth";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Profileviewbox from "./profileviewbox";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Skeleton } from "@mui/material";
import { Popupitem } from "../ui/popup";
import ShareIcon from "@mui/icons-material/Share";
import { useuserdatacontext } from "../service/context/usercontext";
import {
  get_userdata,
  updatepost,
  updateprofileuserdata,
} from "../service/Auth/database";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressBar from "@badrap/bar-of-progress";
import Time from "../service/other/time";
import Addcomment from "./addcomment";
export const Post = ({ postdata, popup = true }) => {
  const { userdata, setuserdata, defaultprofileimage } = useuserdatacontext();
  
  const [active, setactive] = useState("");
  const [post, setpost] = useState(postdata || null);
  const [hide, sethide] = useState(false);
  const [postdelete, setpostdelete] = useState(false);
  const [postedby, setpostedby] = useState(null);
  const [loadingimg, setloadingimg] = useState(true);
  const navigate = useNavigate();
  const progress = new ProgressBar();

  useEffect(() => {
    const data = async () => {
      const postedby = await get_userdata(post?.postedby);
      setpostedby(postedby);
    };

    data();
  }, []);

  useEffect(() => {
    const data = async () => {
      if (postedby) {
        await updateprofileuserdata(postedby, postedby?.username);
      }
    };
    data();
  }, [postedby]);

  useEffect(() => {
    const data = async () => {
      if (postedby !== null) {
        await updatepost(post, postedby?.uid);
      }
    };
    data();
  }, [post]);

  const deletepost = async () => {
    progress.start();
    if (userdata?.username === postedby?.username) {
      const newposts = await postedby?.post.filter(
        (item) => item.postid !== post?.postid
      );
      setpostedby((prev) => ({ ...prev, post: newposts }));
    }
    progress.finish();
    setpostdelete(true);
  };

  const handal_like = () => {
    auth?.currentUser && !post?.likes.includes(userdata?.uid)
      ? setpost((prev) => ({
            ...prev,
            likes: [...prev.likes, userdata?.uid],
          }))
        
      : setpost((prev) => ({
          ...prev,
          likes: prev.likes.filter((e) => e !== userdata?.uid),
        }));

    !auth?.currentUser && toast.error("Login required");
  };

  function handelactive(act) {
    active === act ? setactive("") : setactive(act);
  }
  function handelsave() {
    if (!auth?.currentUser) {
      toast.error("Login required");
    } else {
      const updatedSaved = userdata?.saved.filter(
        (savedpost) => post?.postid !== savedpost?.postid
      );
      if (
        userdata?.saved.some((savedpost) => post?.postid === savedpost?.postid)
      ) {
        setuserdata((prev) => ({
          ...prev,
          saved: updatedSaved,
        }));
        toast.success("Removed from your Bookmark");
      } else {
        setuserdata((prev) => ({
          ...prev,
          saved: [
            ...prev?.saved,
            {
              postedby: post?.postedby,
              postid: post?.postid,
            },
          ],
        }));
        toast.success("Added to your Bookmark");
      }

      setactive("");
    }
  }

  if (postedby?.block?.includes(userdata?.uid)) {
    return <></>;
  }
  return (
    <section onClick={()=>{setactive('')}} className="md:my-4 my-2 p-1 text-lg flex flex-col">
      {!hide && !postdelete && (
        <div className="flex w-full align-middle space-x-2 ">
          <img
            className="rounded-full border border-neutral-500 w-8 aspect-square sm:w-10 h-8 sm:h-10"
            src={postedby?.profileImageURL || defaultprofileimage}
          />
          <div className="flex w-full m-1 sm:mx-3 flex-col">
            <div className="flex relative text-sm sm:text-base  align-middle">
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/profile/${postedby?.username}`);
                }}
                className="flex text-sm sm:text-base justify-start w-full capitalize space-x-2 sm:space-x-3"
              >
                <label className="font-semibold my-auto">
                  {postedby?.name || (
                    <Skeleton
                      animation="wave"
                      sx={{ bgcolor: "grey.900" }}
                      variant="text"
                      width={window.innerWidth >= 400 ? 200 : 100}
                    />
                  )}
                </label>
                <label className="text-gray-500 flex my-auto space-x-3">
                  @
                  {postedby?.username || (
                    <Skeleton
                      animation="wave"
                      sx={{ bgcolor: "grey.900" }}
                      variant="text"
                      width={window.innerWidth >= 400 ? 200 : 100}
                    />
                  )}
                </label>
                <label className="text-gray-500 text-xs m-auto sm:text-sm ">
                  {Time(post?.postedat?.toJSON().seconds)}
                </label>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  active === "menu" ? setactive("") : setactive("menu");
                }}
                className="ml-auto"
              >
                <i>
                  <MoreVertIcon />
                </i>
              </div>
              {active === "menu" && (
                <div className="absolute top-12 z-40 right-3 =sm:right-8 px-4 text-sm bg-black sm:-my-10 -my-2 py-2 sm:py-5 sm:p-3 rounded-xl shadow-sm shadow-white flex flex-col space-y-2 sm:space-y-4  ">
                  <button
                    className="w-40 p-1 rounded-full hover:bg-gray-950 capitalize"
                    onClick={() => {
                      navigate(`/profile/${postedby?.username} `);
                      setactive("");
                    }}
                  >
                    view profile
                  </button>

                  {popup && (
                    <button
                      className="w-40 p-1 rounded-full capitalize hover:bg-gray-950"
                      onClick={() => {
                        setactive("comment");
                      }}
                    >
                      View comment
                    </button>
                  )}

                  <button
                    className="w-40 capitalize p-1 rounded-full hover:bg-gray-950 text-white"
                    onClick={handelsave}
                  >
                    <i className="flex justify-center space-x-3">
                      <label>
                        {userdata?.saved?.some(
                          (savedpost) => post?.postid === savedpost?.postid
                        )
                          ? "Remove from bookmark"
                          : "Add to bookmark"}
                      </label>
                    </i>
                  </button>

                  <button
                    className="w-40 p-1 rounded-full hover:bg-gray-950 text-red-500 "
                    onClick={() => {
                      setactive("report");
                    }}
                  >
                    Report
                  </button>
                  {popup && userdata?.username !== postedby?.username && (
                    <button
                      className="w-40 p-1 rounded-full hover:bg-gray-950 text-red-500"
                      onClick={() => {
                        sethide(true);
                      }}
                    >
                      Hide post
                    </button>
                  )}

                  {userdata?.username === postedby?.username && (
                    <button
                      className="w-40 p-1 rounded-full text-red-500 hover:bg-gray-950 "
                      onClick={() => {
                        auth.currentUser && setactive("delete");
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>

            <pre
              onClick={() => {
                navigate(`/profile/${postedby?.username}/${post?.postid}`);
              }}
              className="text-sm  whitespace-pre-wrap my-2 w-full sm:p-2 "
            >
              {post?.content}
            </pre>

            <div className="w-full">
              {loadingimg && post?.img && (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="rectangular"
                  width={window.innerWidth >= 400 ? 500 : 300}
                  height={window.innerWidth >= 400 ? 550 : 350}
                />
              )}
              {post?.img && (
                <img
                  onDoubleClick={handal_like}
                  onLoadCapture={() => {
                    setloadingimg(false);
                  }}
                  src={post?.img}
                  onClick={() => {
                    navigate(`/profile/${postedby?.username}/${post?.postid}`);
                  }}
                  className={`${
                    loadingimg ? "hidden" : "block"
                  } w-full h-full h-postimg  border-neutral-500 border-2 rounded-2xl`}
                />
              )}
            </div>

            <div className="flex text-lg mt-5 text-gray-400 space-x-3 m-2 justify-between px-2 sm:px-5">
              <div className="flex align-middle w-full text=sm sm:text-base justify-between space-x-2">
                <div
                  className="flex space-x-1 hover:text-sky-900"
                  onClick={(e) => {
                    e.stopPropagation()
                    popup && handelactive("comment");
                  }}
                >
                  <label className="text-gray-500">
                    {post?.comments?.length > 0 ? post?.comments?.length : ""}
                  </label>
                  <i className="">
                    <InsertCommentIcon />
                  </i>
                </div>
                <div className="flex text-gray-500 space-x-1   ">
                  {post?.likes?.length > 0 && (
                    <label
                      onClick={() => {
                        setactive("like");
                      }}
                      className=" m-auto  "
                    >
                      {post?.likes?.length}
                    </label>
                  )}
                  <i
                    onClick={() => {
                      handal_like();
                    }}
                    className="hover:text-red-900 drop-shadow"
                  >
                    {post?.likes?.includes(userdata?.uid) ? (
                      <FavoriteIcon style={{ color: "#CF000F" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </i>
                </div>
                <i
                  className="hover:text-green-400"
                  onClick={() => {
                    navigator.share({
                      title: `Spreading the Vibes: Check Out My Latest Socialite Post! @${postedby?.username}`,
                      text: "Embark on a journey through elegance and excitement! My newest post on Socialite App is here to dazzle your feed. Swipe up to experience the glitz, glamour, and all things fabulous!",
                      url: `${window.location.origin}/profile/${postedby?.username}/${post?.postid}`,
                    });
                  }}
                >
                  <ShareIcon />
                </i>
              </div>

              <i onClick={handelsave}>
                {userdata?.saved?.some(
                  (savedpost) => post?.postid === savedpost?.postid
                ) ? (
                  <BookmarkIcon />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </i>
            </div>
          </div>
        </div>
      )}

      {hide && (
        <div className="flex w-full sm:px-5 border-y-2 border-gray-950 rounded-3xl p-2 justify-around align-middle ">
          <div className="flex mx-5 w-full sm:space-x-5 space-x-2">
            <i className="text-gray-500 my-auto px-3 ">
              <VisibilityOffIcon />
            </i>
            <label className="font-semibold text-gray-400  m-auto text-base ">
              Post hidden
            </label>
          </div>

          <button
            onClick={() => {
              sethide(false);
              setactive("");
            }}
            className="px-8 capitalize mr-auto sm:mx-5 p-2 rounded-full text-sm sm:text-base text-gray-400 hover:bg-gray-950 bg-gray-900"
          >
            undo
          </button>
        </div>
      )}
      {active === "like" && (
        <div>
          {
            <Popupitem
              closefunction={() => {
                setactive("");
              }}
            >
              <div className="flex flex-col justify-center align-middle space-y-3">
                <h2 className="text-center text-3xl ">likes</h2>
                {post?.likes.map((profile) => {
                  return <Profileviewbox profileusername={profile} />;
                })}
              </div>
            </Popupitem>
          }
        </div>
      )}

      {active === "delete" && (
        <Popupitem
          closefunction={() => {
            setactive("");
          }}
        >
          <div className="max-w-sm m-auto mb-10">
            <p className="text-xl text-center my-7 capitalize ">
              would you like to delete this post
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setactive("");
                }}
                className="px-8 outline outline-neutral-800 capitalize m-auto p-2 rounded-full hover:bg-gray-950 bg-gray-900 text-white"
              >
                cancel
              </button>
              <button
                onClick={() => {
                  deletepost();
                  setactive("");
                }}
                className="px-8 capitalize m-auto p-2 rounded-full hover:bg-red-700 bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </Popupitem>
      )}

      {active === "report" && (
        <Popupitem
          closefunction={() => {
            setactive("");
          }}
        >
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
                className="px-8 outline outline-neutral-800 capitalize m-auto p-2 rounded-full hover:bg-gray-950 bg-gray-900 text-white"
              >
                cancel
              </button>
              <button
                onClick={() => {
                  setactive("");
                  auth.currentUser && toast.success("Report sucessfully");
                }}
                className="px-8 capitalize m-auto p-2 rounded-full hover:bg-red-700 bg-red-600 text-white"
              >
                report
              </button>
            </div>
          </div>
        </Popupitem>
      )}

      {popup && (
        <>
          {active === "comment" && (
            <Popupitem
              closefunction={() => {
                setactive("");
              }}
            >
              <Post postdata={post} popup={false} />
              <Addcomment cuupost={post} cuusetpost={setpost} />
            </Popupitem>
          )}
        </>
      )}
      {postdelete && (
        <p className="text-center text-xl capitalize text-zinc-600 ">
          post deleted
        </p>
      )}
    </section>
  );
};
