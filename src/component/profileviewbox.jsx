import React, { useEffect, useState } from "react";
import { useuserdatacontext } from "../service/context/usercontext";
import { useNavigate } from "react-router-dom";
import { get_userdata, get_userdatabyname } from "../service/Auth/database";
import { Skeleton } from "@mui/material";
export default function Profileviewbox({
  profile,
  bio = false,
  profileusername,
}) {
  const navigate = useNavigate();
  const [profileuserdata, setprofileuserdata] = useState(profile || null);
  const { defaultprofileimage, userdata } = useuserdatacontext();

  useEffect(() => {
    const data = async () => {
      if (profileusername && !profile) {
        const data = await get_userdata(profileusername);
        setprofileuserdata(data);
      }
    };
    data();
  }, []);

  if (profileuserdata?.block?.includes(userdata?.uid)) {
    return <></>;
  }
  return (
    <div
      onClick={() => {
        navigate(`/profile/${profileuserdata?.username}`);
      }}
      className="flex m-auto  cursor-pointer p-2 justify-between align-middle "
    >
      <img
        src={profileuserdata?.profileImageURL || defaultprofileimage}
        className="rounded-full w-10 h-10 my-auto mx-1"
      />
      <div
        className="flex m-1 flex-col cursor-pointer"
        onClick={() => {
          navigate(`/profile/${profileuserdata?.username}`);
        }}
      >
        <label className="text-base w-full">
          {profileuserdata?.name || (
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey.900" }}
              variant="text"
              width={100}
            />
          )}
        </label>
        <label className="text-sm text-gray-400 flex">
          @
          {profileuserdata?.username || (
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey.900" }}
              variant="text"
              width={100}
            />
          )}
        </label>
        {bio && (
          <pre className="font-sans w-full text-start top-3 text-sm relative text-white">
            {profileuserdata?.bio}
          </pre>
        )}
      </div>
      <div className=" px-4 my-auto ml-auto">
        <button
          className="bg-white w-24 hover:bg-slate-200 rounded-full text-sm shadow-lg ml-auto font-medium text-black
     capitalize py-1 px-4 "
        >
          {userdata?.following.includes(profileuserdata?.uid)
            ? "following"
            : "follow"}
        </button>
      </div>
    </div>
  );
}
