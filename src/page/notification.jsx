import React from "react";
import Navbar from "../component/navbar";
import Suggestion from "../component/suggestion";
import { useuserdatacontext } from "../service/context/usercontext";
import Notify from "../component/notify";
import { Get_notification } from "../service/Auth/database";
import ArrowBack from "@mui/icons-material/ArrowBack";

import ProgressBar from "@badrap/bar-of-progress";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const progress = new ProgressBar();
  const [allnotification, setallnotification] = useState([]);
  const { userdata } = useuserdatacontext();
  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      progress.start();
      setallnotification(await Get_notification(userdata?.uid));
      progress.finish();
    };
    data();
    return () => {
      progress.finish();
    };
  }, [userdata]);

  return (
    <div className="flex w-full">
      <Navbar />
      <div className="w-full sm:px-10 pb-20">
        <div className="flex border-b-2 border-gray-700 py-2">
          <i
            onClick={() => {
              navigate("/home");
            }}
            className="my-auto px-2"
          >
            <ArrowBack />
          </i>
          <h1 className="text-xl my-auto py-2">Notification</h1>
        </div>
        {allnotification?.map((notification, index) => {
          return <Notify notification={notification} index={index} />;
        })}
        {allnotification?.length === 0 && (
          <div className="capitalize text-base text-center my-10 text-gray-400">
            no notification yet
          </div>
        )}
      </div>
      <div className="w-1/4 hidden xl:block">
        <Suggestion />
      </div>
    </div>
  );
}
