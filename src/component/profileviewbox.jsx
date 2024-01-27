import React, { useEffect, useState } from "react";
import { useuserdatacontext } from "../service/context/usercontext";
import { useNavigate } from "react-router-dom";
import { get_userdata, get_userdatabyname } from "../service/Auth/database";
import { Skeleton } from "@mui/material";
import { auth } from "../service/Auth";
export default function Profileviewbox({
  profile,
  bio = false,
  profileusername,
}) {
  const navigate = useNavigate();
  const [profileuserdata, setprofileuserdata] = useState(profile || null);
  const { defaultprofileimage, userdata, setuserdata } = useuserdatacontext();

  useEffect(() => {
    const data = async () => {
      if (profileusername && !profile) {
        const data = await get_userdata(profileusername);
        setprofileuserdata(data);
      }
    };
    data();
  }, []);

  const handelfollow = () => {
    if (auth.currentUser && profileuserdata) {
      profileuserdata?.follower?.includes(userdata?.uid)
        ? setprofileuserdata((prev) => ({
            ...prev,
            follower: profileuserdata?.follower.filter(
              (e) => e !== userdata?.uid
            ),
          }))
        : setprofileuserdata((prev) => ({
            ...prev,
            follower: [...prev?.follower, userdata?.uid],
          }));
      !userdata?.following.includes(profileuserdata?.uid)
        ? setuserdata((prev) => ({
            ...prev,
            following: [...prev.following, profileuserdata?.uid],
          }))
        : setuserdata((prev) => ({
            ...prev,
            following: userdata?.following.filter(
              (e) => e !== profileuserdata?.uid
            ),
          }));
    } else navigate("/login");
  };

  if (profileuserdata?.block?.includes(userdata?.uid)) {
    return <></>;
  }
  return (
    <section className="flex w-full cursor-pointer p-2 align-middle ">
      <img
        src={profileuserdata?.profileImageURL || defaultprofileimage}
        className="rounded-full w-10 h-10 my-auto mx-1"
      />
      <div
        className="flex w-full m-1 flex-col cursor-pointer"
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
      <div className="w-full px-4 my-auto ml-auto">
        <button
          onClick={handelfollow}
          className="bg-white w-24 hover:bg-slate-200 rounded-full text-sm shadow-lg ml-auto font-medium text-black
     capitalize py-1 px-4 "
        >
          {userdata?.following.includes(profileuserdata?.uid)
            ? "following"
            : "follow"}
        </button>
      </div>
    </section>
  );
}
