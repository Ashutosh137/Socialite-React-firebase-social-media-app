import React from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
export const Popupitem = ({ children, closefunction }) => {
  return (
    <div className="backdrop-blur-sm z-50 fixed left-0 top-0 w-screen h-screen ">
      <div className=" fixed shadow-gray-700 shadow-2xl rounded-3xl flex  border-2 border-gray-700 animinate left-1/4 top-16 bg-black text-white">
        <div className="text-4xl p-4 z-40">
          <button onClick={closefunction}>
            <CloseFullscreenIcon />
          </button>
        </div>
        <div className=" max-h-popup my-8 w-full p-1 mr-4 overflow-scroll scroll-hidden ">
          {children}
        </div>
      </div>
      {/* mobile */}
      <div className="p-5 absolute sm:hidden overflow-y-scroll scroll-hidden h-screen w-screen left-0 top-0 bg-black text-white">
        <div className="text-4xl m-3 z-50">
          <button onClick={closefunction}>x</button>
        </div>
        <div className="m-3">{children}</div>
      </div>
    </div>
  );
};
