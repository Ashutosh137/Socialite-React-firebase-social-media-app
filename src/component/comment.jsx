import React, { useState, useEffect } from "react";
import { useuserdatacontext } from "../service/context/usercontext";
import { get_userdata } from "../service/Auth/database";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Time from "../service/other/time";
import { Skeleton } from "@mui/material";
import { auth } from "../service/Auth";
import { toast } from "react-toastify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Popupitem } from "../ui/popup";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

export default function Comment({
  currentcomment,
  toggle = () => {},
  setpost,
}) {
  const { userdata, defaultprofileimage } = useuserdatacontext();
  const [commentby, setcommentby] = useState(null);
  const navigate = useNavigate();
  const [active, setactive] = useState("");
  const [delet, setdelet] = useState(false);
  const [comment, setcomment] = useState(currentcomment || null);

  useEffect(() => {
    const data = async () => {
      const commentby = await get_userdata(comment?.postedby);
      setcommentby(commentby);
    };
    data();
  }, []);

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
    <div className=" w-full ">
      {!delet && (
        <div className="capitalize flex w-full  sm:space-x-2 ">
          <img
            className="rounded-full mx-2 bg-gray-400 outline outline-neutral-800 w-5 sm:w-7 h-5 sm:h-7"
            src={commentby?.profileImageURL || defaultprofileimage}
            alt={defaultprofileimage}
          />
          <div className="flex w-full space-y-1 sm:mx-3 flex-col">
            <div className="flex relative text-sm">
              <label className="font-semibold ">
                {commentby?.name || (
                  <Skeleton
                    animation="wave"
                    sx={{ bgcolor: "grey.900" }}
                    variant="text"
                    width={150}
                  />
                )}
              </label>
              <label
                className="text-gray-500 mx-2 flex space-x-3 text-sm"
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
                    width={150}
                  />
                )}
              </label>
              <label className="text-gray-500 text-xs  sm:text-sm ">
                {Time(comment.postedat?.toJSON().seconds) || (
                  <Skeleton
                    animation="wave"
                    sx={{ bgcolor: "grey.900" }}
                    variant="text"
                    width={200}
                  />
                )}
              </label>
              <label
                className="ml-auto mx-2"
                onClick={() => {
                  active === "menu" ? setactive("") : setactive("menu");
                }}
              >
                <MoreVertIcon />
              </label>
              {active === "menu" && (
                <div className="absolute top-5 right-3 sm:right-8 px-4 text-sm bg-black sm:-my-16 -my-5 py-5 p-3 rounded-xl shadow-sm shadow-white flex flex-col space-y-2  ">
                  <button
                    className="w-40 p-1 rounded-full text-white hover:bg-gray-950 "
                    onClick={() => {
                      navigate(`/profile/${commentby?.username} `);
                      toggle();
                    }}
                  >
                    View profile
                  </button>
                  <button
                    className="w-40 p-1 rounded-full text-red-500 hover:bg-gray-950 "
                    onClick={() => {
                      setactive("report");
                    }}
                  >
                    Report
                  </button>
                  {(userdata?.username === commentby?.username ||
                    post?.postedby === userdata?.uid) && (
                    <button
                      className="w-40 p-1 rounded-full text-red-500 hover:bg-gray-950 "
                      onClick={() => {
                        setdelet(true);
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
              <div
                className="flex mr-auto my-2 text-gray-400 space-x-1  "
                onClick={() => {
                  auth.currentUser && comment?.likes.includes(userdata?.uid)
                    ? setcomment((prev) => ({
                        ...prev,
                        likes: prev.likes.filter((e) => e !== userdata?.uid),
                      }))
                    : setcomment((prev) => ({
                        ...prev,
                        likes: [...prev.likes, userdata?.uid],
                      }));
                }}
              >
                <label className=" text-sm my-auto">
                  {comment.likes.length}
                </label>
                <i className="hover:text-red-900">
                  {comment?.likes.includes(userdata?.uid) ? (
                    <FavoriteIcon style={{ color: "#CF000F" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </i>
              </div>
            </div>
            {active === "report" && (
              <Popupitem
                closefunction={() => {
                  setactive("");
                }}
              >
                <div className="max-w-sm m-auto mb-10">
                  <p className="text-xl text-center my-7 capitalize ">
                    report this comment
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
                    <option value="copyrightViolation">
                      Copyright Violation
                    </option>
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
                        toast.success("Report sucessfully");
                      }}
                      className="px-8 capitalize m-auto p-2 rounded-full hover:bg-red-700 bg-red-600 text-white"
                    >
                      report
                    </button>
                  </div>
                </div>
              </Popupitem>
            )}
          </div>
        </div>
      )}
      {delet && (
        <p className="text-center text-sm capitalize text-zinc-600 ">
          comment deleted
        </p>
      )}
    </div>
  );
}
