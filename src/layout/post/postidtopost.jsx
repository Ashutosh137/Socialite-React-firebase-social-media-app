import React, { useEffect, useState } from "react";
import { getpostdatabyuid } from "../../service/Auth/database";
import { Post } from "../../component/post";
import ProgressBar from "@badrap/bar-of-progress";
import NotFoundPost from "./not-found";

export default function Postidtopost({ postid, postedby }) {
  const [post, setpost] = useState(null);
  const progress = new ProgressBar();

  useEffect(() => {
    const data = async () => {
      progress.start();
      setpost(await getpostdatabyuid(postedby, postid));
      progress.finish();
    };
    data();
    return () => {
      progress.finish();
    };
  }, [postedby, postid]);

  return (
    <section className=" w-full ">
      {post && <Post postdata={post} popup={true} />}
      {post === undefined && <NotFoundPost />}
    </section>
  );
}
