import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Profileviewbox from "./profileviewbox";

export default function Search({ bio = false }) {
  const [searchtext, setsearchtext] = useState("");

  const [relaventusers, setrelaventusers] = useState([]);

  useEffect(() => {
    const data = async () => {
      // const rerlaventuser=await getusersbyusername
    };
    data();
  }, [searchtext]);
  return (
    <div className="my-2 w-full relative">
      <div className="w-full">
        <div className="inline-flex focus:border-blue-800 px-4 align-middle  p-1 rounded-full border-gray-800 border-2 w-full justify-between">
          <i className="m-auto">
            <SearchIcon />
          </i>
          <input
            type="search"
            value={searchtext}
            onChange={(e) => {
              setsearchtext(e.target.value);
            }}
            className="p-3 w-full bg-black text-white rounded-full m-auto outline-none "
            placeholder="Search.."
          />
        </div>
      </div>

      {searchtext !== "" && (
        <div className="bg-black  my-3 shadow-zinc-500 shadow-inner w-full rounded-xl py-5 px-2  max-h-96 flex flex-col  space-y-1 z-50 ">
          <label className="text-gray-500 capitalize text-center">
            Try searching for people keywords{" "}
          </label>
          <div className="">
            {relaventusers.map((profile) => {
              return <Profileviewbox profile={profile} bio={bio} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
