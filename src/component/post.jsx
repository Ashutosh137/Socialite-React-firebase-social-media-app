import { useCallback, useEffect, useState } from "react";
import { auth } from "../service/Auth";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Skeleton } from "@mui/material";
import { Popupitem } from "../ui/popup";
import Linkify from "linkify-react";
import ShareIcon from "@mui/icons-material/Share";
import { useUserdatacontext } from "../service/context/usercontext";
import {
  Create_notification,
  get_userdata,
  updatepost,
} from "../service/Auth/database";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Time, { formatNumber } from "../service/utiles/time";
import Addcomment from "./addcomment";
import PostMenu from "../layout/post/PostMenu";
import HidePost from "../layout/post/HidePost";
import LikePost from "../layout/post/likePost";
import DeletePost from "../layout/post/DeletePost";
import Report from "../layout/post/Report";

export const Post = ({ postdata, popup = true }) => {
  const { userdata, handlesave, delete_post, defaultprofileimage } =
    useUserdatacontext();
  const [active, setactive] = useState("");
  const [post, setpost] = useState(postdata || null);
  const [hide, sethide] = useState(false);

  const [postedby, setpostedby] = useState(null);

  const [loadingimg, setloadingimg] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      const postedby = await get_userdata(post?.postedby);
      setpostedby(postedby);
    };

    data();
  }, [post]);

  useEffect(() => {
    const data = async () => {
      if (post) {
        await updatepost(post, postedby?.uid);
      }
    };
    data();
  }, [post]);

  const handleLike = useCallback(async () => {
    if (!auth?.currentUser) {
      toast.error("Login required");
      return;
    }

    if (post?.likes.includes(userdata?.uid)) {
      setpost((prev) => ({
        ...prev,
        likes: prev.likes.filter((e) => e !== userdata?.uid),
      }));
    } else {
      setpost((prev) => ({
        ...prev,
        likes: [...prev.likes, userdata?.uid],
      }));
    }

    if (
      !post?.likes.includes(userdata?.uid) &&
      postedby?.username !== userdata?.username
    ) {
      await Create_notification(post?.postedby, {
        likeby: userdata?.uid,
        type: "postlike",
        postid: post?.postid,
      });
    }
  }, [auth, post, userdata, postedby]);

  function handelactive(act) {
    active === act ? setactive("") : setactive(act);
  }

  useEffect(() => {
    setpost((prev) => ({ ...prev, views: prev.views + 1 }));
  }, []);

  if (postedby?.block?.includes(userdata?.uid)) {
    return <></>;
  }

  return (
    <section className="md:my-4  snap-center border-b-2 border-gray-700 w-full  post my-2 pb-3 p-1 text-lg flex flex-col">
      {!hide && (
        <div className="flex space-x-2 w-11/12   ">
          <img
            className="rounded-full border border-neutral-500 w-8 aspect-square sm:w-10 h-8 sm:h-10"
            src={postedby?.profileImageURL || defaultprofileimage}
            onError={(e) => {
              e.target.src = defaultprofileimage;
            }}
          />
          <div className="flex w-full m-1 sm:mx-3 flex-col ">
            <div className="flex relative text-sm sm:text-base align-middle">
              <div
                onClick={() => {
                  navigate(`/profile/${postedby?.username}`);
                }}
                className="flex text-sm sm:text-base justify-start w-full capitalize space-x-2 sm:space-x-3"
              >
                <label className="font-semibold overflow my-auto">
                  {postedby?.name || (
                    <Skeleton
                      animation="wave"
                      sx={{ bgcolor: "grey.900" }}
                      variant="text"
                      width={window.innerWidth >= 400 ? 200 : 100}
                    />
                  )}
                </label>
                <label className="text-gray-500 flex my-auto overflow space-x-3">
                  @
                  {postedby?.username || (
                    <Skeleton
                      animation="wave"
                      sx={{ bgcolor: "grey.900" }}
                      variant="text"
                      width={window.innerWidth >= 400 ? 200 : 100}
                    />
                  )}
                </label>
                <label className="text-gray-500 text-xs m-auto sm:text-sm ">
                  {Time(post?.postedat?.toJSON().seconds)}
                </label>
              </div>
              <div
                onClick={() => {
                  active === "menu" ? setactive("") : setactive("menu");
                }}
                className="ml-auto"
              >
                <i>
                  <MoreVertIcon />
                </i>
              </div>
              {active === "menu" && (
                <PostMenu
                  post={post}
                  setactive={setactive}
                  popup={popup}
                  handlesave={handlesave}
                  postedby={postedby}
                  sethide={sethide}
                />
              )}
            </div>

            {post?.content && (
              <p
                className="text-sm text-clip w-full text-justify break-words block whitespace-pre-wrap pt-3 sm:pt-6 cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => {
                  navigate(`/profile/${postedby?.username}/${post?.postid}`);
                }}
              >
                <Linkify>{post?.content}</Linkify>
              </p>
            )}

            {loadingimg && post?.img && (
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.900", borderRadius: "1rem", my: 3 }}
                variant="rectangular"
                width={window.innerWidth >= 500 ? 500 : 300}
                height={window.innerWidth >= 500 ? 550 : 350}
              />
            )}
            {post?.img && (
              <img
                onDoubleClick={handleLike}
                onLoadCapture={() => {
                  setloadingimg(false);
                }}
                src={post?.img}
                onClick={() => {
                  navigate(`/profile/${postedby?.username}/${post?.postid}`);
                }}
                className={`${
                  loadingimg ? "hidden" : "block"
                } w-full h-full max-w-[30rem] max-h-[35rem] object-cover my-2 border-neutral-500 border rounded-xl sm:rounded-2xl`}
              />
            )}

            <div className="flex text-lg mt-5 text-gray-400 space-x-3 m-2 justify-between px-2 sm:px-5">
              <div className="flex align-middle w-full text-sm sm:text-base justify-between space-x-2">
                <div
                  className="flex space-x-1 hover:text-[#464bf0]"
                  onClick={() => {
                    popup && handelactive("comment");
                  }}
                >
                  <label className="text-gray-500 font-serif">
                    {post?.comments?.length > 0 ? post?.comments?.length : ""}
                  </label>
                  <i className="">
                    <InsertCommentIcon />
                  </i>
                </div>
                <div className="flex text-gray-500 align-middle space-x-1   ">
                  {post?.likes?.length > 0 && (
                    <label
                      onClick={() => {
                        setactive("like");
                      }}
                      className=" my-auto font-serif"
                    >
                      {post?.likes?.length}
                    </label>
                  )}
                  <i
                    onClick={() => {
                      handleLike();
                    }}
                    className="hover:text-red-900 drop-shadow"
                  >
                    {post?.likes?.includes(userdata?.uid) ? (
                      <FavoriteIcon style={{ color: "rgb(249, 24, 128)" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </i>
                </div>
                <div className="flex text-gray-500 align-middle space-x-1">
                  <label className="my-auto text-sm">
                    {formatNumber(post?.views)}
                  </label>
                  <i className="hover:text-blue-900 drop-shadow">
                    <BarChartIcon />
                  </i>
                </div>
                <i
                  className="hover:text-green-400"
                  onClick={() => {
                    navigator.share({
                      title: `Spreading the Vibes: Check Out My Latest Socialite Post! @${postedby?.username}`,
                      text: "Embark on a journey through elegance and excitement! My newest post on Socialite App is here to dazzle your feed. Swipe up to experience the glitz, glamour, and all things fabulous!",
                      url: `${window.location.origin}/profile/${postedby?.username}/${post?.postid}`,
                    });
                  }}
                >
                  <ShareIcon />
                </i>
              </div>

              <i
                onClick={() => {
                  handlesave(post);
                }}
                className="hover:text-[#27cbf0]"
              >
                {userdata?.saved?.some(
                  (savedpost) => post?.postid === savedpost?.postid
                ) ? (
                  <BookmarkIcon style={{ color: "#37cbf0" }} />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </i>
            </div>
          </div>
        </div>
      )}

      {hide && <HidePost setactive={setactive} sethide={sethide} />}
      {active === "like" && <LikePost post={post} setactive={setactive} />}

      {active === "delete" && (
        <DeletePost delete_post={delete_post} setactive={setactive} />
      )}

      {active === "report" && <Report setactive={setactive} />}

      {popup && (
        <>
          {active === "comment" && (
            <Popupitem
              closefunction={() => {
                setactive("");
              }}
            >
              <Post postdata={post} popup={false} />
              <Addcomment cuupost={post} cuusetpost={setpost} />
            </Popupitem>
          )}
        </>
      )}
    </section>
  );
};
