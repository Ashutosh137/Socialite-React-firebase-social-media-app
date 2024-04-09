import React from "react";
import Navbar from "../component/navbar";
import Suggestion from "../component/suggestion";
import { useUserdatacontext } from "../service/context/usercontext";
import Notify from "../component/notify";
import { Get_notification } from "../service/Auth/database";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {Helmet} from "react-helmet";
import ProgressBar from "@badrap/bar-of-progress";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const progress = new ProgressBar();
  const [allnotification, setallnotification] = useState([]);
  const { userdata } = useUserdatacontext();
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
      <Helmet>
        <title>Notification | socilaite</title>
        <meta name="description" content="Notification" />
        <link rel="canonical" href="/Notification" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Notification" />
        <meta name="author" content="Notification" />
        <meta name="language" content="EN" />
      </Helmet>
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
          return <Notify notification={notification} key={index} />;
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
