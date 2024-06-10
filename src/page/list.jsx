import React from "react";
import Navbar from "../component/navbar";
import { useUserdatacontext } from "../service/context/usercontext";
import { useNavigate } from "react-router-dom";
import Suggestion from "../component/suggestion";
import Postidtopost from "../component/postidtopost";
import BookmarkRemoveSharpIcon from "@mui/icons-material/BookmarkRemoveSharp";
import {Helmet} from "react-helmet";
export const List = () => {
  const { userdata, setuserdata } = useUserdatacontext();
  const navigate = useNavigate();

  return (
    <div className="post  pt-10 sm:pt-0 flex w-full ">
      <Navbar />
      <Helmet>
        <title>Bookmark | socilaite</title>
        <meta name="description" content="Bookmark" />
        <link rel="canonical" href="/Bookmark" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Bookmark" />
        <meta name="author" content="Bookmark" />
        <meta name="language" content="EN" />

      </Helmet>
      <div className="w-full post border-gray-600 border-x-2 sm:px-5 py-5 sm:py-0">
        <div className="flex">
          <h1 className="sm:text-2xl text-xl p-2 sm:py-0  my-5 border-b-2 border-gray-500  text-left capitalize ">
            bookmark collection
          </h1>
          <i
            title="delete all bookmark"
            className="my-auto ml-auto"
            onClick={() => {
              setuserdata((prev) => ({ ...prev, saved: [] }));
            }}
          >
            <BookmarkRemoveSharpIcon />
          </i>
        </div>

        <div className="">
          {userdata?.saved.length > 0 ? (
            <>
              {" "}
              {userdata?.saved.map((item, index) => {
                return (
                  <Postidtopost
                    postedby={item.postedby}
                    postid={item?.postid}
                    key={index}
                  />
                );
              })}
            </>
          ) : (
            <div className=" capitalize text-center py-10 m-auto">
              <div className="flex flex-col space-y-20 justify-center align-middle">
                <label className="text-sm sm:text-base">
                  Nothing to see here yet — pin your favorite Lists to access
                  them quickly.
                </label>
                <button
                  className="bg-blue-500 text-white text-center p-2 md:px-5  m-auto capitalize md:w-40 rounded-full"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Add Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-1/4 hidden xl:block">
        <Suggestion />
      </div>
    </div>
  );
};
