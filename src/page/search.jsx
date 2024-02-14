import React from "react";
import Suggestion from "./../component/suggestion";
import Navbar from "./../component/navbar";

export default function Search() {
  return (
    <div className="flex w-full">
      <Navbar />
      <div className="w-full sm:px-10 pb-20">
        <Suggestion bio={true} />
      </div>
      <div className="hidden md:block">
        <Suggestion />
      </div>
    </div>
  );
}
