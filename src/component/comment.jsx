import { useState, useEffect } from "react";
import { useUserdatacontext } from "../service/context/usercontext";
import { Create_notification, get_userdata } from "../service/Auth/database";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Time from "../service/utiles/time";
import { Skeleton } from "@mui/material";
import { auth } from "../service/Auth";
import ReplyIcon from "@mui/icons-material/Reply";
import { toast } from "react-toastify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Popupitem } from "../ui/popup";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import Reply from "./reply";
import Report from "../layout/profile/report";

export default Comment = ({ currentcomment, setpost, post, setactivation }) => {
  const { userdata, defaultprofileimage } = useUserdatacontext();
  const [commentby, setcommentby] = useState(null);

  const [loadingimg, setloadingimg] = useState(true);
  const navigate = useNavigate();
  const [active, setactive] = useState("");
  const [comment, setcomment] = useState(currentcomment || null);

  useEffect(() => {
    setcomment(currentcomment);
  }, [currentcomment]);

  useEffect(() => {
    const data = async () => {
      const commentby = await get_userdata(comment?.postedby);
      setcommentby(commentby);
    };
    data();
  }, [comment?.postedby]);

  useEffect(() => {
    const data = async () => {
      if (comment && auth.currentUser) {
        setpost((prev) => ({
          ...prev,
          comments: prev?.comments.map((currcomment) => {
            if (comment.commentid === currcomment?.commentid) {
              return comment;
            } else return currcomment;
          }),
        }));
      }
    };
    data();
  }, [comment]);

  const handellike = async () => {
    auth.currentUser && comment?.likes.includes(userdata?.uid)
      ? setcomment((prev) => ({
          ...prev,
          likes: prev.likes.filter((e) => e !== userdata?.uid),
        }))
      : setcomment((prev) => ({
          ...prev,
          likes: [...prev.likes, userdata?.uid],
        }));

    !comment?.likes.includes(userdata?.uid) &&
      auth?.currentUser &&
      commentby?.username !== userdata?.username &&
      (await Create_notification(commentby?.uid, {
        likeby: userdata?.uid,
        type: "commentlike",
        postid: post?.postid,
      }));

    !auth.currentUser && toast.error("Login requird");
  };

  const delcomment = () => {
    setpost((pre) => ({
      ...pre,
      comments: pre?.comments.filter(
        (curr) => curr.commentid !== comment?.commentid
      ),
    }));
  };
  if (commentby?.block?.includes(userdata?.uid)) {
    return <></>;
  }

  return (
    <div className=" border border-gray-500 p-5 rounded-xl w-full post">
      <div className="capitalize flex w-full space-x-2 ">
        <img
          className="rounded-full bg-gray-400 outline outline-neutral-800 w-7 aspect-square  sm:w-9 h-7 "
          src={commentby?.profileImageURL || defaultprofileimage}
          alt={defaultprofileimage}
          onError={(e) => {
            e.target.src = defaultprofileimage;
          }}
        />
        <div className="flex w-full space-y-1 sm:mx-3 flex-col">
          <div className="flex relative text-sm sm:text-base">
            <label className="font-semibold overflow ">
              {commentby?.name || (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="text"
                  width={window.innerWidth >= 500 ? 200 : 100}
                />
              )}
            </label>
            <label
              className="text-gray-500 mx-2 overflow flex space-x-3 text-sm sm:text-base"
              onClick={() => {
                navigate(`/profile/${commentby?.username} `);
              }}
            >
              @
              {commentby?.username || (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="text"
                  width={window.innerWidth >= 500 ? 200 : 100}
                />
              )}
            </label>
            <label className="text-gray-500 text-xs my-auto sm:text-sm ">
              {Time(comment.postedat?.toJSON().seconds) || (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="text"
                  width={window.innerWidth >= 400 ? 100 : 50}
                />
              )}
            </label>
            {commentby?.uid === post?.postedby && (
              <label className="text-gray-500 mx-4 text-xs my-auto sm:text-sm ">
                author
              </label>
            )}
            <label
              className="ml-auto mx-2"
              onClick={(e) => {
                e.stopPropagation();
                active === "menu" ? setactive("") : setactive("menu");
              }}
            >
              <MoreVertIcon />
            </label>
            {active === "menu" && (
              <div className="absolute top-5 z-50 right-7 sm:right-8 px-4 text-sm bg-black -my-5 py-2 sm:py-5 sm:p-3 rounded-xl shadow-sm shadow-white flex flex-col space-y-1 sm:space-y-2  ">
                <button
                  className="sm:w-40 w-28 p-1  rounded-full text-white hover:bg-gray-950 "
                  onClick={() => {
                    navigate(`/profile/${commentby?.username} `);
                  }}
                >
                  View profile
                </button>
                <button
                  className="sm:w-40 p-1 rounded-full text-red-500 hover:bg-gray-950 "
                  onClick={() => {
                    setactive("report");
                  }}
                >
                  Report
                </button>
                {(userdata?.username === commentby?.username ||
                  post?.postedby === userdata?.uid) && (
                  <button
                    className="sm:w-40 p-1 rounded-full text-red-500 hover:bg-gray-950 "
                    onClick={() => {
                      delcomment();
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col my-2">
            <pre className="capitalize whitespace-pre-wrap my-1 text-sm font-sans text-left w-full ">
              {comment?.content}
            </pre>
            <div className="">
              {loadingimg && comment?.image && (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="rectangular"
                  width={150}
                  height={225}
                />
              )}
              {comment?.image && (
                <img
                  onDoubleClick={handellike}
                  onLoadCapture={() => {
                    setloadingimg(false);
                  }}
                  src={comment?.image}
                  className={`w-40 rounded-xl aspect-auto my-2 ${
                    loadingimg ? "hidden" : "block"
                  }  `}
                />
              )}
            </div>

            <div className="flex mr-auto my-2 text-gray-400 space-x-1  ">
              <label className=" text-sm my-auto">{comment.likes.length}</label>
              <div className="flex space-x-3">
                <i onClick={handellike} className="hover:text-red-900">
                  {comment?.likes.includes(userdata?.uid) ? (
                    <FavoriteIcon style={{ color: "rgb(249, 24, 128)" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </i>
                <div className="flex">
                  <label className=" text-sm my-auto">
                    {comment?.reply?.length}
                  </label>
                  <i
                    onClick={() => {
                      setactivation({
                        to: commentby?.username,
                        commentid: comment?.commentid,
                      });
                      setactive("reply");
                    }}
                    className="hover:text-green-700 text-xl"
                  >
                    <ReplyIcon />
                  </i>
                </div>
              </div>
            </div>
          </div>
          {active === "reply" && (
            <div className=" w-11/12 my-2 ml-auto ">
              {comment?.reply?.map((reply, index) => {
                return (
                  <Reply
                    key={index}
                    cuutcomment={comment}
                    reply={reply}
                    setcommentpost={setcomment}
                  />
                );
              })}
            </div>
          )}
          {active === "report" && <Report setactive={setactive} />}
        </div>
      </div>
    </div>
  );
};
