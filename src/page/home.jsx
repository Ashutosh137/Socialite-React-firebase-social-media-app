import { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import { getallpost } from "../service/Auth/database";
import { Createpost } from "../component/createpost";
import { Post } from "../component/post";
import { auth } from "../service/Auth";
import { Helmet } from "react-helmet";
import Suggestion from "../component/suggestion";
import { useUserdatacontext } from "../service/context/usercontext";

export const Home = () => {
  const [allpostdata, setallpostdata] = useState(null);
  const [active, setactive] = useState("");
  const [post, setpost] = useState([]);
  const { userdata } = useUserdatacontext();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const allPosts = await getallpost();
        const sortedPosts = allPosts.flat().sort(() => Math.random() - 0.5);
        setallpostdata(sortedPosts);
        setpost(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setloading(false);
    };

    fetchData();
  }, [20000]);

  useEffect(() => {
    if (active === "follow" && userdata?.following) {
      const filteredPosts = allpostdata.filter((post) =>
        userdata.following.includes(post.postedby)
      );
      setpost(filteredPosts);
    } else {
      setpost(allpostdata);
    }
  }, [allpostdata, active, userdata]);

  const handleTabChange = (tab) => {
    setpost();
    setactive(tab);
  };

  return (
    <div className="flex w-full justify-around  ">
      <Navbar />
      <Helmet>
        <title>Home | socilaite</title>
        <meta name="description" content="Home" />
        <link rel="canonical" href="/Home" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Home" />
        <meta name="author" content="Home" />
        <meta name="language" content="EN" />
      </Helmet>
      <div className="flex border-gray-800   border-x-2 mt-5  w-full sm:mx-3 flex-col ">
        <div className="sticky bg-[rgb(0,0,0,0.6)] z-30 text-neutral-200 capitalize text-base sm:text-lg my-2 top-0 ">
          <div className="flex justify-evenly my-2 bg-transparent">
            <label
              onClick={() => handleTabChange("")}
              className={`${
                active === "" ? "border-sky-500 border-b-2" : ""
              }  p-1`}
            >
              For You
            </label>
            <label
              onClick={() => auth?.currentUser && handleTabChange("follow")}
              className={`${
                active === "follow" ? "border-sky-500 border-b-2" : ""
              }  p-1`}
            >
              Following
            </label>
          </div>
        </div>
        <Createpost />
        <hr className="border-gray-700 w-full" />
        <div className="sm:mx-3 mx-2">
          {loading && (
            <div className="flex items-center w-full h-96 justify-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          )}
          {post?.length === 0 && !loading && (
            <div className="flex capitalize items-center w-full h-80 justify-center">
              no posts yet
            </div>
          )}
          {post?.map((postarray, index) => (
            <Post key={index} postdata={postarray} popup={true} />
          ))}
        </div>
      </div>
      <div className="w-1/4 hidden xl:block">
        <Suggestion />
      </div>
    </div>
  );
};
