import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import { getallpost } from "../service/Auth/database";
import { Createpost } from "../component/createpost";
import { Post } from "../component/post";
import Suggestion from "../component/suggestion";
export const Home = () => {
  const [allpostdata, setallpostdata] = useState([]);

  if (allpostdata == [null]) {
    return <></>;
  }

  useEffect(() => {
    const dataforallpost = async () => {
      const allpost = await getallpost();
      setallpostdata(allpost.flat());
    };
    dataforallpost();
  }, []);

  return (
    <div className="flex w-full justify-around h-screen ">
      <Navbar />
      <div className="flex border-gray-800   border-x-2  w-full sm:mx-3 flex-col ">
        <div className="">
          <Createpost />
        </div>
        <hr className="border-gray-700 w-full" />
        <div className="sm:mx-3 mx-2">
          {allpostdata.map((postarray, index) => {
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
