import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserdatacontext } from "../../service/context/usercontext";
import { auth } from "../../service/Auth";

function PostMenu({ setactive, popup, handlesave, postedby, sethide, post }) {
  const navigate = useNavigate();
  const { userdata } = useUserdatacontext();
  return (
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
  );
}

export default PostMenu;
