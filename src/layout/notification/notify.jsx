import React, { useState, useEffect } from "react";
import { get_userdata } from "../../service/Auth/database";
import { useUserdatacontext } from "../../service/context/usercontext";
import { useNavigate } from "react-router-dom";
import Time from "../../service/utiles/time";
import { Skeleton } from "@mui/material";

export default function Notify({ notification }) {
  const { userdata, defaultprofileimage } = useUserdatacontext();
  const navigate = useNavigate();
  const [likeby, setlikeby] = useState(null);

  useEffect(() => {
    const data = async () => {
      notification?.intent?.likeby &&
        setlikeby(await get_userdata(notification?.intent?.likeby));
    };

    data();
  }, [notification?.intent?.likeby]);

  return (
    <div className="w-full post ">
      {notification.intent.type === "postlike" && (
        <div
          className="p-2 my-2 border-2 rounded-xl border-gray-700 cursor-pointer w-full flex mx-auto justify-left "
          onClick={() => {
            navigate(
              `/profile/${userdata?.username}/${notification?.intent?.postid}`,
            );
          }}
        >
          <img
            className="w-10 aspect-square m-2 mx-1 rounded-full my-auto"
            src={likeby?.profileImageURL || defaultprofileimage}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${likeby?.username}`);
            }}
          />
          <span className=" text-base capitalize my-auto px-1 ">
            <label
              className="px-1 font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${likeby?.username}`);
              }}
            >
              {likeby?.username || (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="text"
                  width={window.innerWidth >= 400 ? 200 : 100}
                />
              )}
            </label>
            like your post
          </span>
          <label className="ml-auto my-auto text-xs sm:text-sm overflow text-gray-300 ">
            {Time(notification?.time?.toJSON().seconds)}
          </label>
        </div>
      )}
      {notification.intent.type === "commentlike" && (
        <div
          className="p-2 my-2 border-2 rounded-xl border-gray-700 cursor-pointer w-full flex mx-auto justify-left "
          onClick={() => {
            navigate(
              `/profile/${userdata?.username}/${notification?.intent?.postid}`,
            );
          }}
        >
          <img
            className="w-10 aspect-square m-2 mx-1 rounded-full my-auto"
            src={likeby?.profileImageURL || defaultprofileimage}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${likeby?.username}`);
            }}
          />
          <span className=" text-base capitalize my-auto px-1 ">
            <label
              className="px-1  font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${likeby?.username}`);
              }}
            >
              {likeby?.username || (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="text"
                  width={window.innerWidth >= 400 ? 200 : 100}
                />
              )}
            </label>
            like your comment
          </span>
          <label className="ml-auto my-auto text-xs sm:text-sm overflow text-gray-300 ">
            {Time(notification?.time?.toJSON().seconds)}
          </label>
        </div>
      )}

      {notification.intent.type === "addcomment" && (
        <div
          className="p-2 my-2 border-2 rounded-xl border-gray-700 cursor-pointer w-full flex mx-auto justify-left "
          onClick={() => {
            navigate(
              `/profile/${userdata?.username}/${notification?.intent?.postid}`,
            );
          }}
        >
          <img
            className="w-10 aspect-square m-2 rounded-full my-auto"
            src={likeby?.profileImageURL || defaultprofileimage}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${likeby?.username}`);
            }}
          />
          <span className=" text-base capitalize my-auto px-2 ">
            <label
              className="px-1  font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${likeby?.username}`);
              }}
            >
              {likeby?.username || (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="text"
                  width={window.innerWidth >= 400 ? 200 : 100}
                />
              )}
            </label>
            added comment on your post
          </span>
          <label className="ml-auto my-auto text-xs sm:text-sm overflow text-gray-300 ">
            {Time(notification?.time?.toJSON().seconds)}
          </label>
        </div>
      )}
      {notification.intent.type === "replylike" && (
        <div
          className="p-2 my-2 border-2 rounded-xl border-gray-700 cursor-pointer w-full flex mx-auto justify-left "
          onClick={() => {
            navigate(
              `/profile/${userdata?.username}/${notification?.intent?.postid}`,
            );
          }}
        >
          <img
            className="w-10 aspect-square m-2 rounded-full my-auto"
            src={likeby?.profileImageURL || defaultprofileimage}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${likeby?.username}`);
            }}
          />
          <span className=" text-base capitalize my-auto px-2 ">
            <label
              className="px-1  font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${likeby?.username}`);
              }}
            >
              {likeby?.username || (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="text"
                  width={window.innerWidth >= 400 ? 200 : 100}
                />
              )}
            </label>
            like your reply
          </span>
          <label className="ml-auto my-auto text-xs overflow sm:text-sm text-gray-300 ">
            {Time(notification?.time?.toJSON().seconds)}
          </label>
        </div>
      )}
      {notification.intent.type === "follow" && (
        <div
          className="p-2 my-2 border-2 rounded-xl border-gray-700 cursor-pointer w-full flex mx-auto justify-left "
          onClick={() => {
            navigate(`/profile/${likeby?.username}`);
          }}
        >
          <img
            className="w-10 aspect-square m-2 mx-1 rounded-full my-auto"
            src={likeby?.profileImageURL || defaultprofileimage}
          />
          <span className=" text-base capitalize my-auto px-1 ">
            <label className="px-1  font-semibold">
              {" "}
              {likeby?.username || (
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                  variant="text"
                  width={window.innerWidth >= 400 ? 200 : 100}
                />
              )}
            </label>
            started following you
          </span>
          <label className="ml-auto my-auto text-xs sm:text-sm overflow text-gray-300 ">
            {Time(notification?.time?.toJSON().seconds)}
          </label>
        </div>
      )}
    </div>
  );
}
