import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getpostdata, updatepost } from "../service/Auth/database";
import { Post } from "../component/post";
import ProgressBar from "@badrap/bar-of-progress";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Addcomment from "../component/addcomment";
import NotFoundPost from "../layout/post/not-found";
import { Helmet } from "react-helmet";

export default function Seepost() {
  const { username, postid } = useParams();
  const [post, setpost] = useState([]);
  const navigate = useNavigate();
  const [loader, setloader] = useState(true);

  useEffect(() => {
    const progress = new ProgressBar();
    const data = async () => {
      progress.start();
      const data = await getpostdata(username, postid);
      setpost(data);
      setloader(false);
      progress.finish();
    };

    data();

    return () => {
      progress.finish();
    };
  }, [username, postid]);

  useEffect(() => {
    const data = async () => {
      if (post) {
        await updatepost(post, post?.postedby);
      }
    };
    data();
  }, [post]);

  return (
    <Fragment>
      <Helmet>
        <title>Post || {username}</title>
      </Helmet>
      <div className="border-gray-800 postanimiate p-2 sm:p-4 border-x-2 w-full">
        {post === undefined && <NotFoundPost />}

        {!loader && post && (
          <div className="w-full flex flex-col">
            <div className="flex  bg-black capitalize space-x-4 ">
              <i
                onClick={() => {
                  navigate("/home");
                }}
              >
                <ArrowBack />
              </i>
              <label className="text-xl sm:text-2xl ">post</label>
            </div>

            {post !== null && (
              <div className="w-full my-3">
                <Post postdata={post} popup={false} />
                <Addcomment cuupost={post} cuusetpost={setpost} />
              </div>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
}
