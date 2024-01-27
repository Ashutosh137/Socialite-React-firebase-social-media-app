import React, { useEffect, useState } from "react";
import { getpostdatabyuid } from "../service/Auth/database";
import { Post } from "./post";
import ProgressBar from "@badrap/bar-of-progress";
import { useNavigate } from "react-router-dom";

export default function Postidtopost({ postid, postedby }) {
  const [post, setpost] = useState(null);
  const progress = new ProgressBar();
  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      progress.start();
      setpost(await getpostdatabyuid(postedby, postid));
      progress.finish();
    };
    data();
  }, []);

  return (
    <section className=" w-full ">
      {post && <Post postdata={post} popup={true} />}
      {post === undefined && (
        <div className="w-full capitalize text-center shadow-xl text-base flex h-40 border-2 border-gray-700 rounded-3xl my-5 flex-col">
          <div className="my-auto">
            <p>
              Hmm...this post doesn’t exist , Try searching for something else.
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
    </section>
  );
}
