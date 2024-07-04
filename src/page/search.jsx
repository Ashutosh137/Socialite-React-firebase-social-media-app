import React from "react";
import Suggestion from "./../component/suggestion";
import Navbar from "./../layout/navbar/navbar";
import { Helmet } from "react-helmet";
export default function Search() {
  return (
    <div className="flex  pt-10 sm:pt-0 w-full">
      <Navbar />
      <Helmet>
        <title>Explore | socilaite</title>
        <meta name="description" content="Explore" />
        <link rel="canonical" href="/Explore" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Explore" />
        <meta name="author" content="Explore" />
        <meta name="language" content="EN" />
      </Helmet>
      <div className="w-full sm:px-10 pb-20">
        <Suggestion bio={true} />
      </div>
      <div className="w-1/4 hidden xl:block">
        <Suggestion />
      </div>
    </div>
  );
}
