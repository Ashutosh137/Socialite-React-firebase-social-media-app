import React, { useEffect, useState } from "react";
import { useuserdatacontext } from "../service/context/usercontext";
import { Profile } from "../component/profile";
import Navbar from "../component/navbar";
import { auth } from "../service/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { get_userdatabyname } from "../service/Auth/database";
import Suggestion from "../component/suggestion";
export const Profilepage = () => {
  const { username } = useParams();
  return (
    <div className="flex w-full">
      <Navbar />
      <div className="border-x-2 w-full m-auto border-zinc-700">
        <Profile username={username} />
      </div>
      <div className="w-1/3 hidden sm:block">
        <Suggestion />
      </div>
    </div>
  );
};
