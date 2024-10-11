import React from "react";
import { useNavigate } from "react-router-dom";
import { Popupcenter } from "../../ui/Popupcenter";
import { useUserdatacontext } from "../../service/context/usercontext";

function Menu({ delcomment, setactive, commentby, post }) {
  const navigate = useNavigate();
  const { userdata } = useUserdatacontext();
  return (
    <Popupcenter
      closefunction={() => {
        setactive("");
      }}
    >
      <div className="flex flex-col space-y-2 divide-y">
        <button
          className="sm:w-40 w-28 p-1 text-white hover:bg-gray-950 "
          onClick={() => {
            navigate(`/profile/${commentby?.username} `);
          }}
        >
          View profile
        </button>
        <button
          className="sm:w-40 p-1  text-red-500 hover:bg-gray-950 "
          onClick={() => {
            setactive("report");
          }}
        >
          Report
        </button>
        {(userdata?.username === commentby?.username ||
          post?.postedby === userdata?.uid) && (
          <button
            className="sm:w-40 p-1  text-red-500 hover:bg-gray-950 "
            onClick={() => {
              delcomment();
            }}
          >
            Delete
          </button>
        )}
      </div>
    </Popupcenter>
  );
}

export default Menu;
