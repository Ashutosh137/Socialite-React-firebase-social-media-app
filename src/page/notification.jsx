import React, { Fragment } from "react";
import { useUserdatacontext } from "../service/context/usercontext";
import Notify from "../layout/notification/notify";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Helmet } from "react-helmet";
import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  // const progress = new ProgressBar();
  const { setuserdata, userNotifications } = useUserdatacontext();
  const navigate = useNavigate();

  useEffect(() => {
    userNotifications &&
      setuserdata((prev) => ({
        ...prev,
        notification: userNotifications.length,
      }));
  }, []);

  return (
    <Fragment>
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
        {userNotifications?.map((notification, index) => {
          return <Notify notification={notification} key={index} />;
        })}
        {userNotifications?.length === 0 && (
          <div className="capitalize text-base text-center my-10 text-gray-400">
            no notification yet
          </div>
        )}
      </div>
     
    </Fragment>
  );
}
