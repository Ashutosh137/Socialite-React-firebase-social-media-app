import { useCallback, useEffect, useState } from "react";
import { auth } from "../service/Auth";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Profileviewbox from "./profileviewbox";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Skeleton } from "@mui/material";
import { Popupitem } from "../ui/popup";
import ShareIcon from "@mui/icons-material/Share";
import { useUserdatacontext } from "../service/context/usercontext";
import {
  Create_notification,
  get_userdata,
  updatepost,
  updateprofileuserdata,
} from "../service/Auth/database";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressBar from "@badrap/bar-of-progress";
import Time, { formatNumber } from "../service/other/time";
import Addcomment from "./addcomment";

export const Post = ({ postdata, popup = true }) => {
  const { userdata, handlesave, delete_post, defaultprofileimage } =
    useUserdatacontext();
  const [active, setactive] = useState("");
  const [post, setpost] = useState(postdata || null);
  const [hide, sethide] = useState(false);

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
    return () => {
      progress.finish();
    };
  }, [post?.postedby]);

  useEffect(() => {
    const data = async () => {
      await updateprofileuserdata(postedby, postedby?.username);
    };
    data();
  }, [postedby]);

  useEffect(() => {
    const data = async () => {
      if (post) {
        await updatepost(post, postedby?.uid);
      }
    };
    data();
  }, [post]);

  const handleLike = useCallback(async () => {
    if (!auth?.currentUser) {
      toast.error("Login required");
      return;
    }

    if (post?.likes.includes(userdata?.uid)) {
      setpost((prev) => ({
        ...prev,
        likes: prev.likes.filter((e) => e !== userdata?.uid),
      }));
    } else {
      setpost((prev) => ({
        ...prev,
        likes: [...prev.likes, userdata?.uid],
      }));
    }

    if (
      !post?.likes.includes(userdata?.uid) &&
      postedby?.username !== userdata?.username
    ) {
      await Create_notification(post?.postedby, {
        likeby: userdata?.uid,
        type: "postlike",
        postid: post?.postid,
      });
    }
  }, [auth, post, userdata, postedby]);

  function handelactive(act) {
    active === act ? setactive("") : setactive(act);
  }

  useEffect(() => {
    setpost((prev) => ({ ...prev, views: prev.views + 1 }));
  }, []);

  if (postedby?.block?.includes(userdata?.uid)) {
    return <></>;
  }

  return (
    <section className="md:my-4 border-b-2 border-gray-700 w-full  post my-2 pb-3 p-1 text-lg flex flex-col">
      {!hide && (
        <div className="flex w-full align-middle space-x-3 ">
          <img
            className="rounded-full border border-neutral-500 w-8 aspect-square sm:w-10 h-8 sm:h-10"
            src={postedby?.profileImageURL || defaultprofileimage}
            onError={(e) => {
              e.target.src = defaultprofileimage;
            }}
          />
          <div className="flex w-full m-1 sm:mx-3 flex-col">
            <div className="flex relative text-sm sm:text-base  align-middle">
              <div
                onClick={() => {
                  navigate(`/profile/${postedby?.username}`);
                }}
                className="flex text-sm sm:text-base justify-start w-full capitalize space-x-2 sm:space-x-3"
              >
                <label className="font-semibold overflow my-auto">
                  {postedby?.name || (
                    <Skeleton
                      animation="wave"
                      sx={{ bgcolor: "grey.900" }}
                      variant="text"
                      width={window.innerWidth >= 400 ? 200 : 100}
                    />
                  )}
                </label>
                <label className="text-gray-500 flex my-auto overflow space-x-3">
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
                onClick={() => {
                  active === "menu" ? setactive("") : setactive("menu");
                }}
                className="ml-auto"
              >
                <i>
                  <MoreVertIcon />
                </i>
              </div>
              {active === "menu" && (
                <div className="absolute top-12 z-50 right-3 =sm:right-8 px-4 text-sm bg-black sm:-my-10 -my-2 py-5 sm:p-3 rounded-xl shadow-sm shadow-white flex flex-col space-y-2 sm:space-y-4  ">
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
                    onClick={() => {
                      handlesave(post);
                    }}
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

            {post?.content && (
              <pre
                onClick={() => {
                  navigate(`/profile/${postedby?.username}/${post?.postid}`);
                }}
                className="text-sm w-full my-2 "
              >
                {post?.content}
              </pre>
            )}

            {loadingimg && post?.img && (
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width={window.innerWidth >= 500 ? 500 : 300}
                height={window.innerWidth >= 500 ? 550 : 350}
              />
            )}
            {post?.img && (
              <img
                onDoubleClick={handleLike}
                onLoadCapture={() => {
                  setloadingimg(false);
                }}
                src={post?.img}
                onClick={() => {
                  navigate(`/profile/${postedby?.username}/${post?.postid}`);
                }}
                className={`${
                  loadingimg ? "hidden" : "block"
                } w-full h-full h-postimg my-5 border-neutral-500 border rounded-xl sm:rounded-2xl`}
              />
            )}

            <div className="flex text-lg mt-5 text-gray-400 space-x-3 m-2 justify-between px-2 sm:px-5">
              <div className="flex align-middle w-full text-sm sm:text-base justify-between space-x-2">
                <div
                  className="flex space-x-1 hover:text-[#464bf0]"
                  onClick={() => {
                    popup && handelactive("comment");
                  }}
                >
                  <label className="text-gray-500 font-serif">
                    {post?.comments?.length > 0 ? post?.comments?.length : ""}
                  </label>
                  <i className="">
                    <InsertCommentIcon />
                  </i>
                </div>
                <div className="flex text-gray-500 align-middle space-x-1   ">
                  {post?.likes?.length > 0 && (
                    <label
                      onClick={() => {
                        setactive("like");
                      }}
                      className=" my-auto  font-serif"
                    >
                      {post?.likes?.length}
                    </label>
                  )}
                  <i
                    onClick={() => {
                      handleLike();
                    }}
                    className="hover:text-red-900 drop-shadow"
                  >
                    {post?.likes?.includes(userdata?.uid) ? (
                      <FavoriteIcon style={{ color: "rgb(249, 24, 128)" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </i>
                </div>
                <div className="flex text-gray-500 align-middle space-x-1">
                  <label className="my-auto text-sm">
                    {formatNumber(post?.views)}
                  </label>
                  <i className="hover:text-blue-900 drop-shadow">
                    <BarChartIcon />
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

              <i
                onClick={() => {
                  handlesave(post);
                }}
                className="hover:text-[#27cbf0]"
              >
                {userdata?.saved?.some(
                  (savedpost) => post?.postid === savedpost?.postid
                ) ? (
                  <BookmarkIcon style={{ color: "#37cbf0" }} />
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
                <h2 className="text-center text-xl sm:text-2xl capitalize my-3 ">
                  likes
                </h2>
                <div className="m-auto">
                  {post?.likes.map((profile, index) => {
                    return (
                      <Profileviewbox key={index} profileusername={profile} />
                    );
                  })}
                </div>
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
                  delete_post(post.postid);
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
    </section>
  );
};
