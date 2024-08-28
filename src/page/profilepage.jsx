import React, { Fragment, useEffect } from "react";
import { Profile } from "../component/profile";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useTop from "../service/utiles/useTop";
export const Profilepage = () => {
  const { username } = useParams();

  useTop();
  return (
    <Fragment>
      <Helmet>
        <title>Profile | {username} | socilaite</title>
        <meta name="description" content="Profile" />
        <link rel="canonical" href="/Profile" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Profile" />
        <meta name="author" content="Profile" />
        <meta name="language" content="EN" />
      </Helmet>
      <div className="border-x-2 w-full border-zinc-700">
        <Profile username={username} />
      </div>
    </Fragment>
  );
};
