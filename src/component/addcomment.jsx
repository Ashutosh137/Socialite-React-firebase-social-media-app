import { useEffect, useState } from "react";
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp";
import CloseIcon from "@mui/icons-material/Close";
import Comment from "./comment";
import ProgressBar from "@badrap/bar-of-progress";
import Createid from "../service/utiles/createid";
import { useUserdatacontext } from "../service/context/usercontext";
import { auth } from "../service/Auth";
import {
  Create_notification,
  Getimagedownloadlink,
} from "../service/Auth/database";
import { toast } from "react-toastify";
import Button from "../ui/button";

export default function Addcomment({ cuupost, cuusetpost }) {
  const { userdata, defaultprofileimage } = useUserdatacontext();
  const progress = new ProgressBar();
  const [post, setpost] = useState(cuupost || null);
  const [commentfile, setcommentfile] = useState(null);
  const [active, setactive] = useState("comment");
  const [commenttext, setcommenttext] = useState("");

  useEffect(() => {
    cuusetpost(post);
    return () => {
      progress.finish();
    };
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
      userdata?.uid !== post.postedby &&
        (await Create_notification(post?.postedby, {
          likeby: userdata?.uid,
          type: "addcomment",
          postid: post?.postid,
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
      let comment;
      const newcomment = post?.comments?.map((cuucomment) => {
        if (active?.commentid !== cuucomment?.commentid) {
          return cuucomment;
        } else {
          comment = cuucomment;
          return {
            ...cuucomment,
            reply: [...cuucomment.reply, newreply],
          };
        }
      });
      console.log(newcomment);
      setpost((prev) => ({ ...prev, comments: newcomment }));
      userdata?.uid !== post.postedby &&
        (await Create_notification(comment?.postedby, {
          likeby: userdata?.uid,
          type: "addreply",
          postid: post?.postid,
        }));
    }
    setcommentfile(null);
    setcommenttext("");
    progress.finish();
  };

  return (
    <div className="flex flex-col space-y-4 pt-4  border border-gray-700 rounded-lg">
      {active !== "comment" && (
        <div className="flex items-center  space-x-3 mb-3 w-full">
          <label className="text-sm font-medium text-gray-300">
            Replying to {active?.to}
          </label>
          <CloseIcon
            onClick={() => setactive("comment")}
            className="cursor-pointer text-gray-400"
          />
        </div>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          auth?.currentUser && commenttext.trim() && (await handelcomment());
          !auth?.currentUser && toast.error("Login required");
        }}
        className="flex flex-col w-full  rounded-xl p-4"
      >
        <div className="flex items-start space-x-3 mb-3">
          <img
            src={userdata?.profileImageURL || defaultprofileimage}
            className="w-12 h-12 rounded-full bg-gray-500 object-cover"
            onError={(e) => (e.target.src = defaultprofileimage)}
          />
          <div className="flex flex-col w-full space-y-2">
            <div className="flex justify-between">
              <input
                onChange={(e) => setcommenttext(e.target.value)}
                value={commenttext}
                maxLength={50}
                type="text"
                className="w-full p-2 text-sm sm:text-base bg-black text-gray-200 border border-gray-700 rounded-md"
                placeholder="Write a comment..."
              />
              <button
                type="button"
                onClick={() => document.getElementById("commentfile").click()}
                className="p-2 text-gray-400 hover:text-gray-200 transition"
              >
                <AttachFileSharpIcon />
              </button>
            </div>
            <input
              type="file"
              name="commentfile"
              accept="image/*"
              onChange={(e) => setcommentfile(e.target.files[0])}
              className="hidden"
              id="commentfile"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mt-4 py-2 px-6 w-full max-w-60 md:text-sm mx-auto bg-blue-500 text-white font-semibold text-sm rounded-md hover:bg-blue-600 transition"
        >
          add Comment
        </Button>
      </form>

      {commentfile && (
        <div className="flex items-center space-x-3 mt-3">
          <img
            src={URL.createObjectURL(commentfile)}
            className="w-60 h-auto rounded-lg"
          />
          <CloseIcon
            onClick={() => setcommentfile(null)}
            className="cursor-pointer text-gray-500 hover:text-gray-300 transition"
          />
        </div>
      )}

      <h2 className="text-lg font-semibold text-center text-gray-300 mt-4">
        {post?.comments?.length > 0 ? "Comments" : "No Comments Yet"}
      </h2>
      <div className="flex flex-col space-y-4">
        {post?.comments?.map((comm, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Comment
              setpost={setpost}
              setactivation={setactive}
              currentcomment={comm}
              post={post}
            />
            <hr className="w-full border-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
