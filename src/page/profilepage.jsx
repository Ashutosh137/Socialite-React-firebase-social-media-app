import React from "react";
import { Profile } from "../component/profile";
import Navbar from "../layout/navbar/navbar";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Suggestion from "../component/suggestion";
export const Profilepage = () => {
  const { username } = useParams();
  return (
    <div className="flex  pt-10 sm:pt-0 w-full">
      <Navbar />
      <Helmet>
        <title>Profile | {username} | socilaite</title>
        <meta name="description" content="Profile" />
        <link rel="canonical" href="/Profile" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Profile" />
        <meta name="author" content="Profile" />
        <meta name="language" content="EN" />
      </Helmet>
      <div className="border-x-2 w-full border-zinc-700">
        <Profile username={username} />
      </div>
      <div className="w-1/4 hidden xl:block">
        <Suggestion />
      </div>
    </div>
  );
};
