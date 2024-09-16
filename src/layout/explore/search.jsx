import React, { useEffect, useState, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Profileviewbox from "../profile/profileviewbox";
import { getallprofile } from "../../service/Auth/database";
import { Link } from "react-router-dom";

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default function Search({ bio = false }) {
  const [searchtext, setsearchtext] = useState("");
  const [relaventusers, setrelaventusers] = useState([]);

  const fetchRelevantUsers = async (query) => {
    try {
      const allusers = await getallprofile();
      const filteredUsers = allusers.filter((user) => {
        return (
          new RegExp(query, "i").test(user?.username) ||
          new RegExp(query, "i").test(user?.name)
        );
      });
      setrelaventusers([...filteredUsers]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const debouncedFetchRelevantUsers = useCallback(
    debounce(fetchRelevantUsers, 500),
    [],
  );

  useEffect(() => {
    if (searchtext) {
      debouncedFetchRelevantUsers(searchtext);
    } else {
      setrelaventusers([]);
    }
  }, [searchtext, debouncedFetchRelevantUsers]);

  return (
    <section className="p-2 w-full">
      <div className="w-full">
        <div className="inline-flex focus:border-blue-800 sm:px-4 align-middle p-1 rounded-full border-gray-800 border-2 w-full justify-between">
          <i className="m-auto p-2">
            <SearchIcon />
          </i>
          <input
            type="search"
            value={searchtext}
            name="search"
            onChange={(e) => setsearchtext(e.target.value)}
            className="p-3 w-full bg-black text-white rounded-full outline-none"
            placeholder="Search.."
          />
        </div>
      </div>

      {searchtext !== "" && (
        <div className="bg-black overflow-y-scroll scroll-hidden shadow-zinc-300 shadow-md w-full rounded-xl py-5 max-h-72 flex flex-col space-y-1 z-50">
          <label className="text-gray-500 p-2 capitalize text-center">
            Try searching for people using their names or username
          </label>
          {relaventusers?.length === 0 && searchtext !== "" && (
            <Link
              to={`/profile/${searchtext}`}
              className="capitalize text-sm sm:text-base text-left mx-3"
            >
              try search for{" "}
              <b className="font-semibold border-b-2"> {searchtext}</b>
            </Link>
          )}
          <div className="flex flex-col w-96 m-auto justify-center space-y-5">
            {relaventusers?.map((profile, index) => {
              return <Profileviewbox key={index} profile={profile} bio={bio} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
}
