import React, { useEffect, useState } from "react";
import { useUserdatacontext } from "../../service/context/usercontext";
import { useNavigate } from "react-router-dom";
import {
  get_userdata,
  updateprofileuserdata,
} from "../../service/Auth/database";
import { Skeleton } from "@mui/material";
import { auth } from "../../service/Auth";
export default function Profileviewbox({
  profile=null,
  bio = false,
  profileusername,
}) {
  const navigate = useNavigate();
  const [profileuserdata, setprofileuserdata] = useState(profile || null);
  const { defaultprofileimage, userdata, setuserdata } = useUserdatacontext();

  useEffect(() => {
    const data = async () => {
      if (profileusername && !profile) {
        const data = await get_userdata(profileusername);
        setprofileuserdata(data);
      }
    };
    data();
  }, [profile, profileusername]);

  useEffect(() => {
    const data = async () => {
      if (profileuserdata) {
        await updateprofileuserdata(profileuserdata, profileuserdata?.username);
      }
    };
    data();
  }, [profileuserdata]);

  const handelfollow = () => {
    if (auth.currentUser && profileuserdata) {
      {
        profileuserdata?.follower?.includes(userdata?.uid)
          ? setprofileuserdata((prev) => ({
              ...prev,
              follower: profileuserdata?.follower.filter(
                (e) => e !== userdata?.uid,
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
                (e) => e !== profileuserdata?.uid,
              ),
            }));
      }
    } else navigate("/login");
  };

  if (profileuserdata?.block?.includes(userdata?.uid) || !profileuserdata) {
    return <></>;
  }
  return (
    <section className="flex min-w-80  justify-between  post cursor-pointer p-1 align-middle ">
      <img
        src={profileuserdata?.profileImageURL || defaultprofileimage}
        onError={(e) => {
          e.target.src = defaultprofileimage;
        }}
        alt={defaultprofileimage}
        className="rounded-full w-10 aspect-square h-10 my-auto mx-1"
      />
      <div
        className="flex w-full m-1  flex-col cursor-pointer"
        onClick={() => {
          navigate(`/profile/${profileuserdata?.username}`);
        }}
      >
        <label className="text-base overflow w-full">
          {profileuserdata?.name || (
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey.900" }}
              variant="text"
              width={100}
            />
          )}
        </label>
        <label className="text-sm overflow text-gray-400 flex">
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
          <pre className="font-sans text-start top-3 text-sm relative text-gray-200">
            {profileuserdata?.bio}
          </pre>
        )}
      </div>
      <div className="w-full px-4 my-auto ">
        <button
          onClick={() => {
            profileuserdata?.username !== userdata?.username && handelfollow();
          }}
          className="bg-white w-24 hover:bg-slate-200 rounded-full text-sm shadow-lg ml-auto font-medium text-black
     capitalize py-1 px-4 "
        >
          {userdata?.following?.includes(profileuserdata?.uid)
            ? "following"
            : "follow"}
        </button>
      </div>
    </section>
  );
}
