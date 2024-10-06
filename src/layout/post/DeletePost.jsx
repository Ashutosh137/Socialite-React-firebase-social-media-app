import React from "react";
import { Popupitem } from "../../ui/popup";

function DeletePost({ setactive, delete_post }) {
  return (
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
  );
}

export default DeletePost;
