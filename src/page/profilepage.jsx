import React from "react";
import { Profile } from "../component/profile";
import Navbar from "../component/navbar";
import {  useParams } from "react-router-dom";
import Suggestion from "../component/suggestion";
export const Profilepage = () => {
  const { username } = useParams();
  return (
    <div className="flex w-full">
      <Navbar />
      <div className="border-x-2 w-full border-zinc-700">
        <Profile username={username} />
      </div>
      <div className="w-1/3 hidden sm:block">
        <Suggestion />
      </div>
    </div>
  );
};
