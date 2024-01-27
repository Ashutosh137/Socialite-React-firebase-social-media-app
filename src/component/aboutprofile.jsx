import React from "react";
import { Popupitem } from "../ui/popup";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useuserdatacontext } from "../service/context/usercontext";

export default function Aboutprofile({ profiledata, close }) {
  const { defaultprofileimage } = useuserdatacontext();

  return (
    <Popupitem closefunction={close}>
      <section className="sm:m-auto sm:w-96 w-full ">
        <h1 className="text-xl text-center w-full capitalize">
          about this profile
        </h1>
        <div className="m-2 w-full text-center text-base capitalize flex justify-center flex-col space-y-4 my-12">
          <img
            className="rounded-full hover:scale-125 transition-all ease-in-out duration-300 m-auto w-20 h-20 "
            src={profiledata.profileImageURL || defaultprofileimage}
          />
          <h1 className="text-xl">{profiledata?.name}</h1>
          <h1 className="text-gray-300 text-sm  border-b-2 w-40 m-auto border-black pb-1 rounded-full hover:border-gray-400">
            @ {profiledata?.username}
          </h1>
        </div>
        <div className="flex text-base capitalize justify-between">
          <i className="mr-auto my-auto ml-5 ">
            <DateRangeIcon />
          </i>
          <div className="w-64 sm:w-80">
            <h1>date joined :</h1>
            <h1 className="text-gray-300">
              {profiledata?.createdAt.toDate().toString()}
            </h1>
          </div>
        </div>
        <div className="w-full  flex justify-center my-10">
          <button
            onClick={close}
            className="px-8 capitalize rounded-full hover:bg-gray-800  bg-gray-700 text-base p-1 text-white"
          >
            close
          </button>
        </div>
      </section>
    </Popupitem>
  );
}
