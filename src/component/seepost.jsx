import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getpostdata, updatepost } from "../service/Auth/database";
import { Post } from "./post";
import Navbar from "./navbar";
import { auth } from "../service/Auth";
import Suggestion from "./suggestion";
import ProgressBar from "@badrap/bar-of-progress";
import { RotatingLines } from "react-loader-spinner";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Addcomment from "./addcomment";

export default function Seepost() {
  console.log("ashutosh");

  const { username, postid } = useParams();
  const [post, setpost] = useState([]);
  const navigate = useNavigate();
  const [loader, setloader] = useState(true);

  useEffect(() => {
    const progress = new ProgressBar();
    const data = async () => {
      progress.start();
      const data = await getpostdata(username, postid);
      setpost(data);
      setloader(false);
      progress.finish();
    };

    data();

    return () => {
      progress.finish();
    };
  }, []);

  useEffect(() => {
    const data = async () => {
      if (post) {
        await updatepost(post, post?.postedby);
      }
    };
    data();
  }, [post]);

  return (
    <div className="flex w-full justify-around h-screen scroll-hidden ">
      <Navbar />
      {loader && (
        <div className="absolute h-screen flex justify-center align-middle my-auto">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="#1E90FF"
            strokeWidth="4"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      <div className="border-gray-800 p-2 sm:p-4 border-x-2 w-full">
        {post === undefined && (
          <div className="w-full capitalize text-center text-base flex flex-col h-screen ">
            <div className="my-auto ">
              <p>
                Hmm...this page doesn’t exist. Try searching for something else.
              </p>
              <button
                onClick={() => {
                  navigate("/home");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-sm rounded-full my-5  mx-auto text-white text-center p-2 sm:px-4 capitalize  md:w-40"
              >
                search
              </button>
            </div>
          </div>
        )}

        {!loader && post && (
          <div className="w-full flex flex-col">
            <div className="flex  bg-black capitalize space-x-4 ">
              <i
                onClick={() => {
                  navigate("/home");
                }}
              >
                <ArrowBack />
              </i>
              <label className="text-xl sm:text-2xl ">post</label>
            </div>

            {post !== null && (
              <div className="w-full my-3">
                <Post postdata={post} popup={false} />
                <Addcomment cuupost={post} cuusetpost={setpost} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-1/4 hidden md:block">
        <Suggestion />
      </div>
    </div>
  );
}
