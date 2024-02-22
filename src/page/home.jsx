import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import { getallpost } from "../service/Auth/database";
import { Createpost } from "../component/createpost";
import { Post } from "../component/post";
import { auth } from "../service/Auth";
import Suggestion from "../component/suggestion";
import { useuserdatacontext } from "../service/context/usercontext";
import { toast } from "react-toastify";
export const Home = () => {
  const [allpostdata, setallpostdata] = useState([]);
  const [active, setactive] = useState("");

  const [post, setpost] = useState([]);

  const { userdata } = useuserdatacontext();

  if (allpostdata == [null]) {
    return <></>;
  }

  useEffect(() => {
    const dataforallpost = async () => {
      const allpost = await getallpost();
      const sortedPosts = allpost.flat().sort(() => Math.random() - 0.5);
      setallpostdata(sortedPosts);
      setpost(sortedPosts);
    };
    dataforallpost();
  }, []);

  useEffect(() => {
    setpost(allpostdata);
  }, [allpostdata]);

  return (
    <div className="flex w-full justify-around  ">
      <Navbar />
      <div className="flex border-gray-800   border-x-2  w-full sm:mx-3 flex-col ">
        <div className=" sticky bg-[rgb(0,0,0,0.6)] text-neutral-200 capitalize text-base sm:text-lg my-2 top-0 ">
          <div className="flex justify-evenly my-2 bg-transparent">
            <label
              onClick={async () => {
                setactive("");
                setpost(allpostdata.sort(() => Math.random() - 0.5));
              }}
              className={`${
                active === "" ? "border-sky-500 border-b-2" : ""
              }  p-1`}
            >
              for you
            </label>
            <label
              onClick={async () => {
                setactive("follow");
                setpost(() =>
                  allpostdata.filter((i) => {
                    return userdata?.following?.includes(i?.postedby);
                  })
                );
                auth.currentuser && toast.error("login requird");
              }}
              className={`${
                active === "follow" ? "border-sky-500 border-b-2" : ""
              }  p-1`}
            >
              following
            </label>
          </div>
        </div>
        <Createpost />
        <hr className="border-gray-700 w-full" />

        <div className="sm:mx-3 mx-2">
          {post?.map((postarray, index) => {
            return <Post postdata={postarray} index={index} popup={true} />;
          })}
        </div>
      </div>
      <div className="w-1/4 hidden md:block">
        <Suggestion />
      </div>
    </div>
  );
};
