import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPost() {
  const navigate = useNavigate();
  return (
    <div className="w-full capitalize text-center text-base flex flex-col h-screen ">
      <div className="my-auto ">
        <p>Hmm...this page doesn’t exist. Try searching for something else.</p>
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
  );
}

export default NotFoundPost;
