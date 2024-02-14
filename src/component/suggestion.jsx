import React, { useEffect, useState } from "react";
import Profileviewbox from "./profileviewbox";
import Search from "./search";
import { getallprofile } from "../service/Auth/database";
import { useuserdatacontext } from "../service/context/usercontext";
export default function Suggestion({ bio = false }) {
  const [alluser, setalluser] = useState([null]);
  const { userdata } = useuserdatacontext();
  useEffect(() => {
    const dataforallusers = async () => {
      const alluser = await getallprofile();
      setalluser(alluser);
    };
    dataforallusers();
  }, []);

  if (alluser == []) {
    return <></>;
  }

  return (
    <section className=" sm:mx-2 w-full">
      <div className="flex flex-col space-y-4">
        <div>
          <Search bio={bio} />
        </div>
        <div className="flex justify-center flex-col">
          <h2 className="text-2xl text-center text-white capitalize my-3 font-semibold">
            who to follow
          </h2>

          <div className="flex justify-center space-y-2 flex-col">

          {alluser.map((proflie, index) => { 
            return (
              proflie?.username !== userdata?.username && (
                <Profileviewbox bio={bio} index={index} profile={proflie} />
              )
            );
          })}
          </div>

        </div>
      </div>
    </section>
  );
}
