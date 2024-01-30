import React, { useEffect, useState } from "react";
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp";
import CloseIcon from "@mui/icons-material/Close";
import Comment from "./comment";
import ProgressBar from "@badrap/bar-of-progress";
import Createid from "../service/other/createid";
import { useuserdatacontext } from "../service/context/usercontext";
import { auth } from "../service/Auth";
import { Getimagedownloadlink } from "../service/Auth/database";
import { toast } from "react-toastify";

export default function Addcomment({ cuupost, cuusetpost }) {
  const { userdata, defaultprofileimage } = useuserdatacontext();
  const progress = new ProgressBar();
  const [post, setpost] = useState(cuupost || null);
  const [commentfile, setcommentfile] = useState(null);
  const [active, setactive] = useState("comment");

  const [commenttext, setcommenttext] = useState("");
  useEffect(() => {
    const data = () => {
      cuusetpost(post);
    };
    data();
  }, [post]);
  const handelcomment = async () => {
    progress.start();
    const url = await Getimagedownloadlink(commentfile, userdata?.uid);
    if (active === "comment") {
      setpost((prev) => ({
        ...prev,
        comments: [
          ...prev?.comments,
          {
            content: commenttext,
            postedby: userdata?.uid,
            postedat: new Date(),
            commentid: Createid(),
            image: url,
            reply: [],
            likes: [],
          },
        ],
      }));
    } else {
      const newreply = {
        content: commenttext,
        postedby: userdata?.uid,
        postedat: new Date(),
        replyid: Createid(),
        image: url,
        likes: [],
      };
      const newcomment = post?.comments?.map((cuucomment) => {
        if (active?.commentid !== cuucomment?.commentid) {
          return cuucomment;
        } else {
          return {
            ...cuucomment,
            reply: [...cuucomment.reply, newreply],
          };
        }
      });
      setpost((prev) => ({ ...prev, comments: newcomment }));
      setactive("comment");
    }

    setcommentfile(null);
    setcommenttext("");

    progress.finish();
  };
  return (
    <div className="flex flex-col ">
      {active !== "comment" && (
        <div className="flex space-x-3 m-1 justify-start align-middle w-full">
          <label className="text-sm capitalize my-auto text-left ">
            repling to {active?.to}
          </label>
          <i
            onClick={() => {
              setactive("comment");
            }}
            className="text-gray-400"
          >
            {" "}
            <CloseIcon />
          </i>
        </div>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          auth?.currentUser &&
            commenttext.trim() !== "" &&
            auth?.currentUser &&
            (await handelcomment());
          !auth?.currentUser && toast.error("Login required");
        }}
        className="flex w-full my-2 sm:p-4 p-2 border rounded-xl border-gray-500 justify-around"
      >
        <img
          src={userdata?.profileImageURL || defaultprofileimage}
          className="w-10 h-10 bg-gray-400  rounded-full"
        />
        <div className="flex w-full mx-2 space-x-1">
          <input
            onChange={(e) => {
              setcommenttext(e.target.value);
            }}
            value={commenttext}
            maxLength={50}
            type="text"
            className=" w-full bg-black capitalize text-white text-sm sm:text-base border px-4 border-white rounded-xl "
            placeholder="write a comment .."
          />
          <button
            type="button"
            onClick={() => document.getElementById("commentfile").click()}
          >
            <AttachFileSharpIcon />
          </button>
          <button className="bg-blue-500 text-sm  text-white text-center p-2 sm:px-4 capitalize rounded-md  md:w-40">
            comment
          </button>
          <input
            type="file"
            name=""
            accept="image/*"
            onChange={(e) => setcommentfile(e.target.files[0])}
            className="hidden"
            id="commentfile"
          />
        </div>
      </form>
      {commentfile && (
        <div className="flex">
          <img
            src={URL.createObjectURL(commentfile)}
            className="w-60  mx-5 m-3 aspect-auto rounded-3xl"
          />
          <i
            onClick={() => {
              setcommentfile(null);
            }}
            className="mr-auto cursor-pointer p-3"
          >
            <CloseIcon />
          </i>
        </div>
      )}

      <h2 className="sm:text-xl text-base sm:my-3 text-center p-2 capitalize text-gray-200">
        {post?.comments?.length > 0
          ? "comments"
          : "Don't be shy! , Your opinion is valuable , share it with us in the comments."}
      </h2>
      <div className="flex space-y-5 flex-col my-5 ">
        {post?.comments?.map((comm, index) => {
          return (
            <div key={index} className="flex flex-col space-y-1 ">
              <Comment
                setpost={setpost}
                setactivation={setactive}
                currentcomment={comm}
                post={post}
              />
              <hr className="w-full border-gray-700" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
