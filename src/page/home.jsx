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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await getallpost();
        const sortedPosts = allPosts.flat().sort(() => Math.random() - 0.5);
        setallpostdata(sortedPosts);
        setpost(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (active === "follow" && userdata?.following) {
      const filteredPosts = allpostdata.filter((post) =>
        userdata.following.includes(post.postedby)
      );
      setpost(filteredPosts);
    } else {
      setpost(allpostdata);
    }
  }, [allpostdata, active, userdata]);

  const handleTabChange = (tab) => {
    setpost();
    setactive(tab);
  };

  return (
    <div className="flex w-full justify-around  ">
      <Navbar />
      <div className="flex border-gray-800   border-x-2  w-full sm:mx-3 flex-col ">
        <div className="sticky bg-[rgb(0,0,0,0.6)] text-neutral-200 capitalize text-base sm:text-lg my-2 top-0 ">
          <div className="flex justify-evenly my-2 bg-transparent">
            <label
              onClick={() => handleTabChange("")}
              className={`${
                active === "" ? "border-sky-500 border-b-2" : ""
              }  p-1`}
            >
              For You
            </label>
            <label
              onClick={() => auth?.currentUser && handleTabChange("follow")}
              className={`${
                active === "follow" ? "border-sky-500 border-b-2" : ""
              }  p-1`}
            >
              Following
            </label>
          </div>
        </div>
        <Createpost />
        <hr className="border-gray-700 w-full" />
        <div className="sm:mx-3 mx-2">
          {post?.map((postarray) => (
            <Post key={postarray.id} postdata={postarray} popup={true} />
          ))}
        </div>
      </div>
      <div className="w-1/4 hidden xl:block">
        <Suggestion />
      </div>
    </div>
  );
};
