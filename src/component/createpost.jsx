import { useEffect, useState } from "react";
import { auth } from "../service/Auth";
import LinkIcon from "@mui/icons-material/Link";
import { Getimagedownloadlink } from "../service/Auth/database";
import { toast } from "react-toastify";
import { useUserdatacontext } from "../service/context/usercontext";
import CloseIcon from "@mui/icons-material/Close";
import Createid from "../service/utiles/createid";
import ProgressBar from "@badrap/bar-of-progress";
import { TextInput } from "../ui/input";
import Button from "../ui/button";

export const Createpost = ({ toggle = () => {} }) => {
  const { userdata, setuserdata, defaultprofileimage } = useUserdatacontext();
  const [posttext, setposttext] = useState("");
  const [postmedia, setpostmedia] = useState(null);

  const progress = new ProgressBar();

  useEffect(() => {
    return () => {
      progress.finish();
    };
  }, []);

  const handelpost = async () => {
    if (auth.currentUser) {
      progress.start();
      var url = await Getimagedownloadlink(postmedia);
      const id = Createid();
      var newpost = [
        {
          content: posttext,
          likes: [],
          comments: [],
          postedby: auth?.currentUser?.uid,
          postedat: new Date(),
          views: 0,
          postid: id,
          img: url,
        },
        ...userdata.post,
      ];
      setuserdata((pre) => ({ ...pre, post: newpost }));
      setposttext("");
      setpostmedia(null);
      toggle();
      progress.finish();

      toast.success("sucessfully posted");
    } else {
      toast.error("please login first");
    }
  };

  return (
    <section className="text-center post mx-5 capitalize">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          (posttext.trim() !== "" || (postmedia && posttext.trim() === "")) &&
            handelpost();
        }}
        className="flex flex-col text-xl space-y-4"
      >
        <div className="flex  my-2 justify-center align-middle">
          <img
            className="rounded-full aspect-square bg-gray-400 w-10 h-10"
            src={userdata?.profileImageURL || defaultprofileimage}
            alt={defaultprofileimage}
            onError={(e) => {
              e.target.src = defaultprofileimage;
            }}
          />
          <TextInput
            maxLength={100}
            value={posttext}
            rows={(posttext.match(/\n/g) || []).length + 1}
            onChange={(e) => {
              setposttext(e.target.value);
            }}
            type="text"
            placeholder="What is Happening?!"
            className="px-5 mx-2 placeholder:capitalize text-white w-full scroll-smooth overflow-y-scroll bg-black focus:outline-none  placeholder:text-neutral-500 md:text-xl p-2 "
          />
        </div>
        <span
          className={`text-left text-xs py-1 ${
            posttext.length > 100 ? "text-red-300" : "text-green-300"
          } ${posttext.length == 0 && "hidden"}`}
        >
          {posttext.length}
        </span>
        {postmedia && (
          <div className="flex">
            <img
              src={URL.createObjectURL(postmedia)}
              alt={defaultprofileimage}
              className=" w-3/4 sm:w-1/2 rounded-xl sm:rounded-3xl"
            />
            <i
              onClick={() => {
                setpostmedia(null);
              }}
              className="mr-auto cursor-pointer p-3"
            >
              <CloseIcon />
            </i>
          </div>
        )}
        <div className="flex justify-between w-full align-middle">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              setpostmedia(e.target.files[0]);
            }}
          />
          <button
            type="button"
            onClick={() => {
              document.getElementById("fileInput").click();
            }}
          >
            <LinkIcon />
          </button>
          <Button type="submit" className="ml-auto   my-8 ">
            post
          </Button>
        </div>
      </form>
    </section>
  );
};
